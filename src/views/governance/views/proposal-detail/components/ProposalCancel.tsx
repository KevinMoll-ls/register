import { t } from '@lingui/macro'
import Timelock from 'abis/Timelock'
import TransactionButton from 'components/button/TransactionButton'
import useContractWrite from 'hooks/useContractWrite'
import useWatchTransaction from 'hooks/useWatchTransaction'
import { useAtomValue } from 'jotai'
import { rTokenGovernanceAtom } from 'state/atoms'
import { timelockIdAtom } from '../atom'

const ProposalCancel = () => {
  const governance = useAtomValue(rTokenGovernanceAtom)
  const timelockId = useAtomValue(timelockIdAtom);

  const { write, isLoading, hash, isReady } = useContractWrite({
    abi: Timelock,
    address: governance?.timelock,
    functionName: 'cancel',
    args: timelockId ? [timelockId] : undefined,
  })

  const { isMining } = useWatchTransaction({
    hash,
    label: 'Proposal canceled',
  })

  return (
    <TransactionButton
      small
      loading={isMining || isLoading}
      mining={isMining}
      ml={1}
      disabled={!isReady}
      onClick={write}
      text={t`Cancel proposal`}
    />
  )
}

export default ProposalCancel
