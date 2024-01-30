import rtokens from '@lc-labs/rtokens'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { Pool, poolsAtom } from 'state/pools/atoms'
import useSWRImmutable from 'swr/immutable'
import { StringMap } from 'types'
import { EUSD_ADDRESS, RSR_ADDRESS } from 'utils/addresses'
import { ChainId } from 'utils/chains'
import { LP_PROJECTS, RSR } from 'utils/constants'
import { getAddress } from 'viem'

// Only map what I care about the response...
interface DefillamaPool {
  symbol: string
  pool: string
  apy: number
  apyBase: number
  apyReward: number
  stablecoin: boolean
  project: string
  chain: string
  tvlUsd: number
  underlyingTokens: string[]
  rewardTokens: string[]
}

const listedRTokens = Object.values(rtokens).reduce((acc, curr) => {
  // Defillama has some addresses on lowercase... better to transform to lowercase than to an Address format
  const lowercaseAddresses = Object.keys(curr).reduce((tokens, key) => {
    tokens[key.toLowerCase()] = curr[key]
    return tokens
  }, {} as StringMap)

  return { ...acc, ...lowercaseAddresses }
}, {} as StringMap)

listedRTokens[RSR_ADDRESS[ChainId.Mainnet].toLowerCase()] = RSR
listedRTokens[RSR_ADDRESS[ChainId.Base].toLowerCase()] = RSR

// Bridged RTokens
listedRTokens['0xcfa3ef56d303ae4faaba0592388f19d7c3399fb4'] =
  listedRTokens[EUSD_ADDRESS[ChainId.Mainnet].toLowerCase()]

const OTHER_POOL_TOKENS: Record<
  string,
  { address: string; symbol: string; logo: string }
> = {
  '0x3175df0976dfa876431c2e9ee6bc45b65d3473cc': {
    address: '0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC',
    symbol: 'FRAXBP',
    logo: '',
  },
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
    symbol: 'USDC',
    address: '0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC',
    logo: '',
  },
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    logo: '',
  },
  '0x853d955acef822db058eb8505911ed77f175b99e': {
    symbol: 'FRAX',
    address: '0x853d955acef822db058eb8505911ed77f175b99e',
    logo: '',
  },
  '0x417ac0e078398c154edfadd9ef675d30be60af93': {
    symbol: 'crvUSD',
    address: '0x417Ac0e078398C154EdFadD9Ef675d30Be60Af93',
    logo: '',
  },
}

const POOL_URL: Record<string, string> = {
  // Curve
  '28c0ad15-ecaf-4b14-8ad6-06ded47566b1':
    'https://curve.fi/#/ethereum/pools/factory-tricrypto-21/deposit',
  '5a046093-29fc-4ecb-b90e-daccda151b5b':
    'https://curve.fi/#/ethereum/pools/factory-crypto-256/deposit',
  '817329d2-07cb-4cbd-82ac-eb9bc0add450':
    'https://curve.fi/#/ethereum/pools/factory-v2-277/deposit',
  '2faacc5b-7e32-46f3-84e2-061aed8f7f21':
    'https://curve.fi/#/ethereum/pools/factory-crypto-252/deposit',
  'd99d9bb0-8865-44ca-bdcc-1c2047e8b5a6':
    'https://curve.fi/#/ethereum/pools/factory-crypto-312/deposit',
  '3c76e848-3c17-4bc9-8d41-8c36b27368cd':
    'https://curve.fi/#/base/pools/factory-crypto-14/deposit',
  '4af07af7-4b66-4772-bfcc-395dfb5ef10e':
    'https://curve.fi/#/ethereum/pools/factory-crypto-136/deposit',
  'da53450c-14b1-47e3-bca5-7856f27bb928':
    'https://curve.fi/#/base/pools/factory-v2-12/deposit',
  // Convex
  'c04005c9-7e34-41a6-91c4-295834ed8ac0':
    'https://www.convexfinance.com/stake/ethereum/156',
  '74346f6f-c7ee-4506-a204-baf48e13decb':
    'https://www.convexfinance.com/stake/ethereum/185',
  'c8815168-ba35-4e7c-b7b1-a0b33b6c73bc':
    'https://www.convexfinance.com/stake/ethereum/183',
  '59efd00b-0613-42fc-9799-7e43a9350a5d':
    'https://www.convexfinance.com/stake/ethereum/238',
  '19131596-dddf-4a6c-af71-31f75cee6e6e':
    'https://www.convexfinance.com/stake/ethereum/125',
  // Yearn
  'f8eff410-1a99-49be-b3e1-23966a94b57b':
    'https://yearn.fi/vaults/1/0x6a7A0481e476827857704B87bdeE7922D058cbE4',
  '52dd9b80-774f-414b-bf57-83fa5335f707':
    'https://yearn.fi/vaults/1/0x849dC56ceCa7Cf55AbF5ec87910DA21c5C7dA581',
  '313de697-1863-4c81-bf57-6fe40976823b':
    'https://yearn.fi/vaults/1/0x5383C1Ab5beac04d6A6E6872Cc6a422f2Dc25576',
  // Uniswap
  '75ca1ed2-dcd0-419d-99e8-8aa13aa08364':
    'https://info.uniswap.org/#/pools/0x32d9259e6792b2150fd50395d971864647fa27b2',
  'a6f7f1ff-ffb8-48dd-8ad3-ab41925c4d35':
    'https://info.uniswap.org/#/pools/0xa3a9a863ed908aa95cb17e1781aa97e6693bf604',
  // Balancer
  '207aa997-9996-4e69-bd8c-002270ed852d':
    'https://app.balancer.fi/#/ethereum/pool/0x771fbbfcbd8ba252f7f1ee47c1a486bdb0b5bc6200020000000000000000063d',
}

// TODO: May use a central Updater component for defillama data, currently being traversed twice for APYs and this
const useRTokenPools = () => {
  const { data, isLoading } = useSWRImmutable('https://yields.llama.fi/pools')
  const [poolsCache, setPools] = useAtom(poolsAtom)

  const mapPools = useCallback(
    async (data: DefillamaPool[]) => {
      const pools: Pool[] = []
      for (const pool of data) {
        const rToken = pool.underlyingTokens?.find(
          (token: string) => !!listedRTokens[token.toLowerCase()]
        )

        if (rToken && pool.project !== 'reserve') {
          const underlyingTokens = pool.underlyingTokens.map(
            (token: string) => {
              const lowercasedAddress = token.toLowerCase()

              if (
                listedRTokens[lowercasedAddress] &&
                listedRTokens[lowercasedAddress].symbol !== 'RSR'
              ) {
                return {
                  ...listedRTokens[lowercasedAddress],
                  logo: `/svgs/${listedRTokens[lowercasedAddress].logo.toLowerCase()}`,
                }
              }

              return (
                listedRTokens[lowercasedAddress] ||
                OTHER_POOL_TOKENS[lowercasedAddress] || {
                  address: token,
                  symbol: 'Unknown',
                  logo: '',
                }
              )
            }
          )

          let poolSymbol: string = pool.symbol

          if (poolSymbol[poolSymbol.length - 1] === '-') {
            poolSymbol = poolSymbol.substring(0, poolSymbol.length - 1) + '+'
          }

          const separatorIndex = poolSymbol.indexOf('--')

          if (separatorIndex !== -1) {
            poolSymbol =
              poolSymbol.substring(0, separatorIndex) +
              '+' +
              poolSymbol.substring(separatorIndex + 1)
          }

          pools.push({
            ...pool,
            id: pool.pool,
            symbol: poolSymbol,
            underlyingTokens,
            url:
              POOL_URL[pool.pool] ||
              LP_PROJECTS[pool.project]?.site ||
              `https://defillama.com/yields/pool/${pool.pool}`,
          })
        }
      }
      setPools(pools)
    },
    [setPools]
  )

  useEffect(() => {
    if (data) {
      mapPools(data.data as DefillamaPool[])
    }
  }, [data])

  return {
    data: poolsCache,
    isLoading,
  }
}

export default useRTokenPools
