// TODO: Currently using numbers, approvals will be bumped so not an issue

import { atom } from 'jotai'
import { basketAtom } from '../../../atoms'
import { formatUnits } from 'viem'
import { indexDeployFormDataAtom } from '../atoms'
import { chainIdAtom } from '@/state/atoms'
import { INDEX_DEPLOYER_ADDRESS } from '@/utils/addresses'

// But ideally we should use BigInts
export const initialTokensAtom = atom('')
export const assetsAllowanceAtom = atom<Record<string, bigint>>({})
export const formattedAssetsAllowanceAtom = atom<Record<string, number>>(
  (get) => {
    const basket = get(basketAtom)
    const assetsAllowance = get(assetsAllowanceAtom)

    return basket.reduce(
      (acc, token) => {
        acc[token.address] = Number(
          formatUnits(assetsAllowance[token.address] ?? 0n, token.decimals)
        )
        return acc
      },
      {} as Record<string, number>
    )
  }
)
// Quantities of assets for 1 folio
export const assetDistributionAtom = atom<Record<string, number>>((get) => {
  const formData = get(indexDeployFormDataAtom)
  return (
    formData?.tokensDistribution.reduce(
      (acc, { address, percentage }) => {
        acc[address] = percentage
        return acc
      },
      {} as Record<string, number>
    ) ?? {}
  )
})
// Required quantities of assets for initial tokens
export const basketRequiredAmountsAtom = atom<Record<string, number>>((get) => {
  const initialTokens = get(initialTokensAtom)
  const assetDistribution = get(assetDistributionAtom)
  return Object.entries(assetDistribution).reduce(
    (acc, [address, percentage]) => {
      acc[address] = (Number(initialTokens) * percentage) / 100
      return acc
    },
    {} as Record<string, number>
  )
})
// Allowance atom validation
// TODO: validate balances as well include it on the balances updater!
export const hasAssetsAllowanceAtom = atom((get) => {
  const initialTokens = get(initialTokensAtom)

  if (!initialTokens) return false

  const assetsAllowance = get(formattedAssetsAllowanceAtom)
  const basketRequiredAmounts = get(basketRequiredAmountsAtom)
  return Object.entries(basketRequiredAmounts).every(
    ([address, required]) => assetsAllowance[address] >= required
  )
})
export const basketAllowanceAtom = atom((get) => {
  const basket = get(basketAtom)
  const chainId = get(chainIdAtom)
  return basket.map((token) => [
    token.address,
    INDEX_DEPLOYER_ADDRESS[chainId],
  ]) as [string, string][]
})
