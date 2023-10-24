import { LoadingButton, LoadingButtonProps } from 'components/button'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { previousZapTransaction, zapTransaction } from '../state/atoms'
import { ui } from '../state/ui-atoms'

const ZapButton = (props: Partial<LoadingButtonProps>) => {
  const tx = useAtomValue(zapTransaction)
  const setPrevious = useSetAtom(previousZapTransaction)
  const ttx = tx.state === 'hasData' ? tx.data : null
  useEffect(() => {
    if (ttx != null) {
      setPrevious(ttx)
    }
  }, [ttx])

  const [{ loading, enabled, label, loadingLabel }, onClick] = useAtom(
    ui.button
  )

  return (
    <LoadingButton
      loading={loading}
      disabled={!enabled}
      text={label}
      variant="primary"
      loadingText={loadingLabel}
      mt={3}
      sx={{ width: '100%' }}
      onClick={onClick}
      {...props}
    />
  )
}

export default ZapButton
