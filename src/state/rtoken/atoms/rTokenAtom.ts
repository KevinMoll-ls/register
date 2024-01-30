import FacadeRead from 'abis/FacadeRead'
import RToken from 'abis/RToken'
import { Atom, atom } from 'jotai'
import { chainIdAtom, rTokenListAtom } from 'state/chain/atoms/chainAtoms'
import { ReserveToken, Token } from 'types'
import { getTokenReadCalls, isAddress } from 'utils'
import { FACADE_ADDRESS } from 'utils/addresses'
import { atomWithLoadable } from 'utils/atoms/utils'
import RSV from 'utils/rsv'
import { Address } from 'wagmi'
import { readContracts } from 'wagmi/actions'

// Current selected rToken address
export const selectedRTokenAtom = atom(
  isAddress(
    new URL(window.location.href.replace('/#/', '/')).searchParams.get(
      'token'
    ) ?? ''
  )
)

const rTokenAtom: Atom<ReserveToken | null> = atomWithLoadable(
  async (get): Promise<ReserveToken | null> => {
    const rTokenAddress = get(selectedRTokenAtom)
    const chainId = get(chainIdAtom)
    const rtokens = get(rTokenListAtom)

    if (!rTokenAddress) {
      return null
    }

    if (rTokenAddress === RSV.address) {
      return RSV
    }

    const facadeCallParams = {
      abi: FacadeRead,
      address: FACADE_ADDRESS[chainId] as Address,
      args: [rTokenAddress],
    }
    const rTokenCallParams = {
      abi: RToken,
      address: rTokenAddress,
      args: [],
    }

    const logo = rtokens[rTokenAddress]?.logo
      ? `/svgs/${rtokens[rTokenAddress].logo?.toLowerCase()}`
      : '/svgs/defaultLogo.svg'

    const rTokenMetaCalls = [
      ...getTokenReadCalls(rTokenAddress),
      { ...rTokenCallParams, functionName: 'main' },
      { ...rTokenCallParams, functionName: 'mandate' },
      {
        ...facadeCallParams,
        functionName: 'basketTokens',
      },
      {
        ...facadeCallParams,
        functionName: 'stToken',
      },
    ].map((call) => ({ ...call, chainId }))

    const [
      name,
      symbol,
      decimals,
      mainAddress,
      mandate,
      basket,
      stTokenAddress,
    ] = await (<
      Promise<[string, string, number, Address, string, Address[], Address]>
      >readContracts({
        contracts: rTokenMetaCalls,
        allowFailure: false,
      }))

    const tokensMetaCall = [
      ...getTokenReadCalls(stTokenAddress),
      ...basket.reduce(
        (calls, collateral) => [...calls, ...getTokenReadCalls(collateral)],
        [] as any[]
      ),
    ].map((call) => ({ ...call, chainId }))

    const tokensMeta = await (<Promise<string[]>>readContracts({
      contracts: tokensMetaCall,
      allowFailure: false,
    }))

    const tokens: Token[] = [stTokenAddress, ...basket].reduce(
      (tokens, address) => {
        const [name, symbol, decimals] = tokensMeta.splice(0, 3)

        tokens.push({
          address,
          name,
          symbol,
          decimals: Number(decimals),
        })

        return tokens
      },
      [] as Token[]
    )

    return {
      address: rTokenAddress,
      name,
      symbol,
      decimals,
      logo,
      main: mainAddress,
      mandate,
      stToken: tokens.shift() as Token,
      collaterals: tokens,
      listed: !!rtokens[rTokenAddress],
      chainId,
    }
  }
)

export default rTokenAtom
