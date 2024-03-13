import { gql } from 'graphql-request'
import useQuery from 'hooks/useQuery'
import useRToken from 'hooks/useRToken'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import {
  blockAtom,
  chainIdAtom,
  rTokenAssetsAtom,
  rTokenContractsAtom,
} from 'state/atoms'
import atomWithDebounce from 'utils/atoms/atomWithDebounce'
import {
  endedDutchTradesAtom,
  ongoingDutchTradesAtom,
  pendingDutchTradesAtom,
} from '../atoms'
import { atomWithLoadable } from 'utils/atoms/utils'
import { Address, readContracts } from 'wagmi'
import BackingManager from 'abis/BackingManager'
import { formatUnits, zeroAddress } from 'viem'
import DutchTrade from 'abis/DutchTrade'
import { publicClient } from 'state/chain'
import { TradeKind } from 'views/auctions/atoms'

const ongoingTradesQuery = gql`
  query OngoingDutchTrades($id: String!, $block: Int!) {
    trades(
      where: { endBlock_gt: $block, rToken: $id, kind: 0, isSettled: false }
      orderBy: startBlock
      orderDirection: desc
    ) {
      id
      amount
      buying
      buyingTokenSymbol
      sellingTokenSymbol
      endAt
      selling
      startedAt
      worstCasePrice
      startBlock
      endBlock
      isSettled
      settleTxHash
    }
  }
`

const endedTradesQuery = gql`
  query EndedDutchTrades($id: String!, $block: Int!) {
    ended: trades(
      where: { rToken: $id, kind: 0, endBlock_lte: $block, isSettled: false }
      orderBy: startBlock
      orderDirection: desc
    ) {
      id
      amount
      buying
      buyingTokenSymbol
      sellingTokenSymbol
      endAt
      selling
      startedAt
      worstCasePrice
      startBlock
      endBlock
      isSettled
      settleTxHash
      kind
    }
    settled: trades(
      where: { rToken: $id, kind: 0, endBlock_lte: $block, isSettled: true }
      orderBy: startBlock
      orderDirection: desc
    ) {
      id
      amount
      buying
      buyingTokenSymbol
      sellingTokenSymbol
      endAt
      selling
      isSettled
      startedAt
      worstCasePrice
      startBlock
      endBlock
      settleTxHash
      kind
    }
  }
`

const debouncedBlock = atomWithDebounce(
  atom((get) => get(blockAtom)),
  60000
).debouncedValueAtom

// Use debounce value if exist over current block
const currentBlockAtom = atom((get) => {
  const block = get(blockAtom)
  const debounced = get(debouncedBlock)

  return debounced || block
})

const openTradesFromChainAtom = atomWithLoadable(async (get) => {
  const contracts = get(rTokenContractsAtom)
  const assetRegistry = get(rTokenAssetsAtom)
  const chain = get(chainIdAtom)
  const client = publicClient({ chainId: chain })

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
    })

    const openTradesCalls = result
      .filter((addr) => addr !== zeroAddress)
      .map((addr) => [
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'worstPrice',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'endTime',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'endBlock',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'startBlock',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'sell',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'buy',
          chainId: chain,
        },
        {
          address: addr as Address,
          abi: DutchTrade,
          functionName: 'sellAmount',
          chainId: chain,
        },
      ])

    if (!openTradesCalls.length) {
      return null
    }

    const trade = await readContracts({
      contracts: openTradesCalls[0],
      allowFailure: false,
    })

    const sellingToken = assetRegistry[trade[4] as Address]

    const startBlock = await client.getBlock({
      blockNumber: trade[3] as bigint,
    })

    return {
      id: openTradesCalls[0][0].address,
      amount: +formatUnits(
        trade[6] as bigint,
        sellingToken?.token?.decimals ?? 18
      ),
      buying: trade[5] as Address,
      buyingTokenSymbol:
        assetRegistry[trade[5] as Address]?.token?.symbol ?? 'Unknown',
      sellingTokenSymbol: sellingToken?.token?.symbol ?? 'Unknown',
      endAt: trade[1] as number,
      selling: sellingToken.token.address,
      startedAt: Number(startBlock.timestamp),
      worstCasePrice: +formatUnits(
        trade[0] as bigint,
        sellingToken?.token?.decimals ?? 18
      ),
      startBlock: Number(startBlock.number),
      endBlock: Number(trade[2]),
      isSettled: false,
      kind: TradeKind.BatchTrade,
    }
  } catch (e) {
    console.error('Failed to get trades', e)
    return null
  }
})

const useDutchTrades = () => {
  const rToken = useRToken()
  const blockNumber = useAtomValue(currentBlockAtom)
  const setOngoingTrades = useSetAtom(ongoingDutchTradesAtom)
  const setPendingTrades = useSetAtom(pendingDutchTradesAtom)
  const [currentEndedTrades, setEndedTrades] = useAtom(endedDutchTradesAtom)
  const openTrade = useAtomValue(openTradesFromChainAtom)

  const { data, error } = useQuery(
    rToken && blockNumber ? ongoingTradesQuery : null,
    {
      id: rToken?.address.toLowerCase(),
      block: blockNumber,
    }
  )
  const { data: endedData, error: endedError } = useQuery(
    rToken && blockNumber ? endedTradesQuery : null,
    {
      id: rToken?.address.toLowerCase(),
      block: blockNumber,
    }
  )

  useEffect(() => {
    if (data) {
      setOngoingTrades(data.trades)
    }
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (openTrade) {
      setOngoingTrades([openTrade])
    }
  }, [JSON.stringify(openTrade)])

  useEffect(() => {
    // Only update if 1) current obj is empty, or 2) length is updated
    if (
      endedData &&
      (!currentEndedTrades.length ||
        currentEndedTrades.length !=
          endedData.settled.length + endedData.ended.length)
    ) {
      setPendingTrades(endedData.ended)
      setEndedTrades(endedData.settled)
    }
  }, [endedData])
}

export default useDutchTrades
