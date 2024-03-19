import { t } from '@lingui/macro'
import { Modal } from 'components'
import ShowMore from 'components/transaction-modal/ShowMore'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import {
  accountDelegateAtom,
  isModuleLegacyAtom,
  walletAtom,
} from 'state/atoms'
import {
  customDelegateAtom,
  stakeAmountAtom,
  stakeAmountUsdAtom,
  stakeOutputAtom,
} from './atoms'
import AmountPreview from '../AmountPreview'
import ConfirmStakeButton from './ConfirmStakeButton'
import DelegateStake from './DelegateStake'
import { stRsrTickerAtom } from 'views/staking/atoms'

const AmountsPreview = () => {
  const amount = useAtomValue(stakeAmountAtom)
  const usdAmount = useAtomValue(stakeAmountUsdAtom)
  const stAmount = useAtomValue(stakeOutputAtom)
  const ticker = useAtomValue(stRsrTickerAtom)

  return (
    <>
      <AmountPreview
        title={t`You use:`}
        amount={Number(amount)}
        usdAmount={usdAmount}
        symbol="RSR"
        mb="3"
      />
      <AmountPreview
        title={t`You’ll receive:`}
        amount={stAmount}
        usdAmount={usdAmount}
        src="/svgs/strsr.svg"
        symbol={ticker}
      />
    </>
  )
}

const StakeExtra = () => {
  const account = useAtomValue(walletAtom)
  const { staking: isLegacy } = useAtomValue(isModuleLegacyAtom)
  const currentDelegate = useAtomValue(accountDelegateAtom)
  const [delegate, setDelegate] = useAtom(customDelegateAtom)
  const [isEditingDelegate, setEditingDelegate] = useState(false)

  useEffect(() => {
    if (currentDelegate !== delegate || !delegate) {
      setDelegate(currentDelegate || account || '')
    }
  }, [currentDelegate])

  return (
    <ShowMore my="3">
      {!isLegacy && (
        <DelegateStake
          value={delegate}
          editing={isEditingDelegate}
          onEdit={setEditingDelegate}
          onChange={(delegate) => {
            setEditingDelegate(false)
            setDelegate(delegate)
          }}
        />
      )}
    </ShowMore>
  )
}

const StakeModal = ({ onClose }: { onClose(): void }) => {
  const setAmount = useSetAtom(stakeAmountAtom)
  const handleClose = useCallback(() => {
    setAmount('')
    onClose()
  }, [setAmount])

  return (
    <Modal title={t`Review stake`} onClose={handleClose} width={440}>
      <AmountsPreview />
      <StakeExtra />
      <ConfirmStakeButton />
    </Modal>
  )
}

export default StakeModal
