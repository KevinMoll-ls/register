import { RESERVE_API } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

interface TokenPrice {
  address: Address
  price?: number
}
export const useAssetPrices = (tokens: string[]) => {
  const url = `${RESERVE_API}current/prices?tokens=${tokens.join(',')}`

  return useQuery({
    queryKey: ['asset-price', url],
    queryFn: async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch token prices')
        }
        const data = await response.json()

        if (data?.statusCode) {
          throw new Error(data.message)
        }

        return data as TokenPrice[]
      } catch (error) {
        console.error('Error fetching token prices:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
    enabled: !!tokens.length,
  })
}

export const useAssetPrice = (token: string | undefined) => {
  return useAssetPrices(token ? [token] : [])
}
