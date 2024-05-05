import { Button } from 'components'
import {
  BackupBasket,
  Basket,
  RevenueSplit,
  backupCollateralAtom,
  basketAtom,
  revenueSplitAtom,
} from 'components/rtoken-setup/atoms'
import useRToken from 'hooks/useRToken'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { File } from 'react-feather'
import { Box, Flex, Text } from 'theme-ui'
import { Address, Hex } from 'viem'
import {
  Roles,
  autoRegisterBackupAssetsAtom,
  autoRegisterBasketAssetsAtom,
  contractUpgradesAtom,
  isNewBackupProposedAtom,
  isNewBasketProposedAtom,
  isProposalValidAtom,
  parametersChangesAtom,
  proposedRolesAtom,
  registerAssetsAtom,
  revenueSplitChangesAtom,
  roleChangesAtom,
  unregisterAssetsAtom,
} from '../atoms'
import { ParameterChange } from '../hooks/useParametersChanges'
import useProposalTx from '../hooks/useProposalTx'
import { RegisterAsset } from '../hooks/useRegisterAssets'

const JSONToFile = (obj: any, filename: string) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export const SnapshotUpload = ({ onLoad }: { onLoad(): void }) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = (event: any) => {
    event.preventDefault()

    try {
      const droppedFiles = event.dataTransfer.files

      if (
        droppedFiles.length === 1 &&
        droppedFiles[0].type.match('application/json')
      ) {
        var reader = new FileReader()

        // Closure to capture the file information.
        reader.onload = function (theFile) {
          if (reader.result) {
            let data = JSON.parse(reader.result as string)

            console.log('test', data)
          }
        }

        reader.readAsText(droppedFiles[0])
      }
    } catch (e) {}
  }

  return (
    <Box mt="3">
      <label>
        <Box
          onDrop={handleUpload}
          onDragOver={(event) => event.preventDefault()}
          sx={{
            border: '3px dashed',
            height: 150,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'border',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <input
            type="file"
            style={{
              display: 'none',
            }}
          />
          <File />
          <Text mt="2" variant="strong">
            Upload JSON snapshot
          </Text>
        </Box>
      </label>
    </Box>
  )
}

interface ProposalSnapshotJSON {
  autoRegisterBasketAssets: boolean
  autoRegisterBackupAssets: boolean
  basket?: Basket
  backup?: BackupBasket
  assetsToRegister?: RegisterAsset[]
  assetsToUnregister?: string[]
  revenueSplit?: RevenueSplit
  roles?: Roles
  parameterChanges?: Record<string, string>
  upgrades?: Record<string, Address>
  transaction: {
    addresses: Address[]
    calls: Hex[]
    description: string
  }
}

function getParametersSnapshot(
  changes: ParameterChange[]
): Record<string, string> | undefined {
  if (!changes.length) return undefined

  return changes.reduce((acc, { field, proposed }) => {
    acc[field] = proposed
    return acc
  }, {} as Record<string, string>)
}

const ProposalSnapshot = () => {
  const rToken = useRToken()
  const parameterChanges = useAtomValue(parametersChangesAtom)
  const proposedRoles = useAtomValue(proposedRolesAtom)
  const roleChanges = useAtomValue(roleChangesAtom)
  const assetsToUnregister = useAtomValue(unregisterAssetsAtom)
  const assetsToRegister = useAtomValue(registerAssetsAtom)
  const newBackup = useAtomValue(isNewBackupProposedAtom)
  const newBasket = useAtomValue(isNewBasketProposedAtom)
  const basket = useAtomValue(basketAtom)
  const backup = useAtomValue(backupCollateralAtom)
  const revenueChanges = useAtomValue(revenueSplitChangesAtom)
  const revenueSplit = useAtomValue(revenueSplitAtom)
  const upgrades = useAtomValue(contractUpgradesAtom)
  const autoRegisterBasketAssets = useAtomValue(autoRegisterBasketAssetsAtom)
  const autoRegisterBackupAssets = useAtomValue(autoRegisterBackupAssetsAtom)
  const transaction = useProposalTx()

  const handleSnapshot = () => {
    const snapshot: ProposalSnapshotJSON = {
      autoRegisterBasketAssets,
      autoRegisterBackupAssets,
      basket: newBasket ? basket : undefined,
      backup: newBackup ? backup : undefined,
      assetsToRegister: assetsToRegister.length ? assetsToRegister : undefined,
      assetsToUnregister: assetsToUnregister.length
        ? assetsToUnregister
        : undefined,
      revenueSplit: revenueChanges.count ? revenueSplit : undefined,
      roles: roleChanges.length ? proposedRoles : undefined,
      transaction: {
        addresses: transaction?.args[0] ?? [],
        calls: transaction?.args[2] ?? [],
        description: transaction?.args[3] ?? '',
      },
      parameterChanges: getParametersSnapshot(parameterChanges),
      upgrades: Object.keys(upgrades).length ? upgrades : undefined,
    }

    JSONToFile(snapshot, `${rToken?.symbol ?? ''}-snapshot-${Date.now()}`)
  }

  const handleLoadSnapshot = () => {}

  return (
    <Box variant="layout.borderBox" mt="3">
      <Text variant="title">Proposal snapshot</Text>
      <Text as="p" variant="legend">
        Save an snapshot of the governance proposal for external validation
      </Text>
      <Flex mt={3} sx={{ gap: 3 }}>
        <Button small disabled={!transaction?.enabled} onClick={handleSnapshot}>
          Save snapshot
        </Button>
      </Flex>
    </Box>
  )
}

export default ProposalSnapshot
