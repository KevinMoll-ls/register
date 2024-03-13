import dayjs from 'dayjs'
import { gql } from 'graphql-request'
import useDebounce from 'hooks/useDebounce'
import useQuery from 'hooks/useQuery'
import useRToken from 'hooks/useRToken'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import {
  blockTimestampAtom,
  chainIdAtom,
  rTokenAssetsAtom,
  rTokenContractsAtom,
} from 'state/atoms'
import { tradesAtom } from '../atoms'
import { atomWithLoadable } from 'utils/atoms/utils'
import { Address } from 'viem'
import BackingManager from 'abis/BackingManager'
import { readContracts } from '@wagmi/core'

const tradesQuery = gql`
  query Trades($id: String!, $time: Int!) {
    current: trades(
      where: { endAt_gt: $time, rToken: $id, kind: 1 }
      orderBy: startedAt
      orderDirection: desc
    ) {
      id
      amount
      auctionId
      buying
      buyingTokenSymbol
      sellingTokenSymbol
      endAt
      selling
      startedAt
      worstCasePrice
      kind
    }
    ended: trades(
      where: { endAt_lte: $time, rToken: $id, kind: 1 }
      first: 50
      orderBy: startedAt
      orderDirection: desc
    ) {
      id
      amount
      auctionId
      buying
      buyingTokenSymbol
      sellingTokenSymbol
      endAt
      selling
      startedAt
      worstCasePrice
      kind
    }
  }
`

const openTradesFromChainAtom = atomWithLoadable(async (get) => {
  const contracts = get(rTokenContractsAtom)
  const assetRegistry = get(rTokenAssetsAtom)
  const chain = get(chainIdAtom)

  console.log('contracts', { contracts, assetRegistry })

  if (!contracts?.backingManager || !assetRegistry) {
    return null
  }

  try {
    const calls = Object.keys(assetRegistry).map((asset) => {
      return {
        address: contracts.backingManager.address as Address,
        abi: BackingManager,
        functionName: 'trades',
        args: [asset as Address],
        chainId: chain,
      }
    })

    console.log('trying to get trades')

    const result = await readContracts({
      contracts: calls,
      allowFailure: false,
      blockNumber: 19424830n,
    })

    console.log('result', result)
  } catch (e) {
    console.error('Failed to get trades', e)
    return null
  }
})

const TradesUpdater = () => {
  const rToken = useRToken()
  const openTrades = useAtomValue(openTradesFromChainAtom)
  const blockTimestamp = useDebounce(
    useAtomValue(blockTimestampAtom) || dayjs().unix(),
    60000
  )
  const setTrades = useSetAtom(tradesAtom)

  const { data } = useQuery(rToken ? tradesQuery : null, {
    id: rToken?.address.toLowerCase(),
    time: blockTimestamp,
  })

  console.log('open trades', openTrades)

  useEffect(() => {
    if (data) {
      setTrades({
        current: data.current,
        ended: data.ended,
      })
    }
  }, [JSON.stringify(data)])

  return null
}

export default TradesUpdater
