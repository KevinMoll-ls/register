import { Token } from '@reserve-protocol/token-zapper'
import { useChainlinkPrice } from 'hooks/useChainlinkPrice'
import useDebounce from 'hooks/useDebounce'
import { useAtomValue } from 'jotai'
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  TokenBalanceMap,
  balancesAtom,
  chainIdAtom,
  ethPriceAtom,
  gasFeeAtom,
  rTokenAtom,
  rTokenBalanceAtom,
  rTokenPriceAtom,
  walletAtom,
} from 'state/atoms'
import useSWR from 'swr'
import { Address, formatEther, parseUnits, zeroAddress } from 'viem'
import { zappableTokens } from '../../zap/state/zapper'
import zapper, { ZapResponse, ZapResult, fetcher } from '../api'

export type IssuanceOperation = 'mint' | 'redeem'

type ZapContextType = {
  operation: IssuanceOperation
  setOperation: (operation: IssuanceOperation) => void
  openSettings: boolean
  setOpenSettings: (open: boolean) => void
  openTokenSelector: boolean
  setOpenTokenSelector: (open: boolean) => void
  openSubmitModal: boolean
  setOpenSubmitModal: (open: boolean) => void
  collectDust: boolean
  setCollectDust: (collect: boolean) => void
  slippage: bigint
  setSlippage: (slippage: bigint) => void
  amountIn: string
  setAmountIn: (amount: string) => void
  selectedToken?: Token
  setSelectedToken: (token: Token) => void
  maxAmountIn: string
  loadingZap: boolean
  chainId: number
  tokens: Token[]
  balances: TokenBalanceMap
  amountOut?: string
  zapDustUSD?: string
  rTokenSymbol?: string
  rTokenBalance?: string
  rTokenPrice?: number
  gasCost?: number
  tokenInPrice?: number
  priceImpact?: number
  spender?: Address
  zapResult?: ZapResult
}

export const SLIPPAGE_OPTIONS = [100000n, 250000n, 500000n]

const ZapContext = createContext<ZapContextType>({
  operation: 'mint',
  setOperation: () => {},
  openSettings: false,
  setOpenSettings: () => {},
  openTokenSelector: false,
  setOpenTokenSelector: () => {},
  openSubmitModal: false,
  setOpenSubmitModal: () => {},
  collectDust: true,
  setCollectDust: () => {},
  slippage: SLIPPAGE_OPTIONS[0],
  setSlippage: () => {},
  amountIn: '',
  setAmountIn: () => {},
  setSelectedToken: () => {},
  maxAmountIn: '0',
  loadingZap: false,
  chainId: 0,
  tokens: [],
  balances: {},
})

export const useZap = () => {
  return useContext(ZapContext)
}

export const ZapProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [operation, setOperation] = useState<IssuanceOperation>('mint')
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [openTokenSelector, setOpenTokenSelector] = useState<boolean>(false)
  const [openSubmitModal, setOpenSubmitModal] = useState<boolean>(false)
  const [collectDust, setCollectDust] = useState<boolean>(true)
  const [slippage, setSlippage] = useState<bigint>(SLIPPAGE_OPTIONS[0])
  const [amountIn, setAmountIn] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<Token>()

  const chainId = useAtomValue(chainIdAtom)
  const rToken = useAtomValue(rTokenAtom)
  const rTokenPrice = useAtomValue(rTokenPriceAtom)
  const rTokenBalance = useAtomValue(rTokenBalanceAtom)
  const balances = useAtomValue(balancesAtom)
  const tokens = useAtomValue(zappableTokens)
  const wallet = useAtomValue(walletAtom)
  const fee = useAtomValue(gasFeeAtom)
  const ethPrice = useAtomValue(ethPriceAtom)

  const tokenInPrice = useChainlinkPrice(
    selectedToken?.address as Address | undefined
  )

  useEffect(() => {
    if (!selectedToken) setSelectedToken(tokens[0])
  }, [tokens])

  const endpoint = useDebounce(
    useMemo(() => {
      if (
        openSubmitModal ||
        !wallet ||
        !selectedToken?.address?.address ||
        !rToken?.address ||
        isNaN(Number(amountIn)) ||
        amountIn === '' ||
        Number(amountIn) === 0
      ) {
        return null
      }

      return zapper.zap(
        chainId,
        wallet as Address,
        selectedToken?.symbol === 'ETH'
          ? zeroAddress
          : (selectedToken?.address.address as Address),
        parseUnits(amountIn, selectedToken?.decimals).toString(),
        rToken?.address as Address,
        Number(slippage)
      )
    }, [chainId, wallet, selectedToken, amountIn, rToken, slippage]),
    1000
  )

  const { data, isLoading, error } = useSWR<ZapResponse>(endpoint, fetcher)

  const maxAmountIn = useMemo(() => {
    const tokenAddress = selectedToken?.address?.toString()
    if (!selectedToken || !tokenAddress) {
      return '0'
    }
    const fr = balances[tokenAddress as any]?.balance ?? '0'
    return selectedToken.from(fr).format()
  }, [selectedToken, balances])

  const [amountOut, zapDustUSD, gasCost, priceImpact, spender] = useMemo(() => {
    if (!data || !data.result) {
      return ['0', '0', 0, 0, undefined]
    }
    const amountOut = formatEther(BigInt(data.result.amountOut))
    const estimatedGasCost = fee
      ? Number(formatEther(BigInt(data.result.gas) * fee)) * ethPrice
      : 0
    return [
      amountOut,
      undefined,
      estimatedGasCost,
      data.result.priceImpact,
      data.result.tx.to,
    ]
  }, [data])

  return (
    <ZapContext.Provider
      value={{
        operation,
        setOperation,
        openSettings,
        setOpenSettings,
        openTokenSelector,
        setOpenTokenSelector,
        openSubmitModal,
        setOpenSubmitModal,
        collectDust,
        setCollectDust,
        slippage,
        setSlippage,
        amountIn,
        setAmountIn,
        selectedToken,
        setSelectedToken,
        maxAmountIn,
        loadingZap: isLoading,
        chainId,
        tokens,
        balances,
        amountOut,
        zapDustUSD,
        rTokenSymbol: rToken?.symbol,
        rTokenBalance: rTokenBalance?.balance,
        rTokenPrice,
        gasCost,
        tokenInPrice,
        priceImpact,
        spender,
        zapResult: data?.result,
      }}
    >
      {children}
    </ZapContext.Provider>
  )
}
