import ERC20 from 'abis/ERC20'
import FacadeRead from 'abis/FacadeRead'
import { BackupBasket } from 'components/rtoken-setup/atoms'
import { chainIdAtom } from 'state/atoms'
import { FACADE_ADDRESS } from 'utils/addresses'
import { atomWithLoadable } from 'utils/atoms/utils'
import { stringToHex } from 'viem'
import { Address, readContracts } from 'wagmi'
import rTokenAtom from './rTokenAtom'
import rTokenBasketAtom from './rTokenBasketAtom'

const rTokenBackupAtom = atomWithLoadable(async (get) => {
  const rToken = get(rTokenAtom)
  const rTokenBasket = get(rTokenBasketAtom)
  const targetUnits = Object.keys(rTokenBasket)
  const chainId = get(chainIdAtom)

  if (!rToken?.main || !rTokenBasketAtom) {
    return null
  }

  const calls = targetUnits.map(
    (targetUnit) =>
      ({
        address: FACADE_ADDRESS[chainId],
        abi: FacadeRead,
        functionName: 'backupConfig',
        args: [
          rToken.address as Address,
          stringToHex(targetUnit, { size: 32 }),
        ],
      } as const)
  )

  const multicallResult = await readContracts({
    contracts: calls,
    allowFailure: false,
  })

  const backupBasket: BackupBasket = {}
  let index = 0

  for (const result of multicallResult) {
    const [erc20s, max] = result

    const calls = erc20s.map(
      (address) =>
        ({
          address,
          abi: ERC20,
          functionName: 'symbol',
        } as const)
    )

    const symbols = await readContracts({
      contracts: calls,
      allowFailure: false,
    })

    backupBasket[targetUnits[index]] = {
      diversityFactor: Number(max),
      collaterals: erc20s.map((address, i) => ({
        address,
        targetUnit: targetUnits[index],
        symbol: symbols[i],
      })),
    }
    index += 1
  }

  return backupBasket
})

export default rTokenBackupAtom
