import { Button } from 'components'
import { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'

const SnapshotUpload = ({ onLoad }: { onLoad(): void }) => {
  const handleUpload = () => {
    // onLoad()
  }

  return <Box>drop here</Box>
}

const DeploySnapshot = () => {
  const [isUpload, setUpload] = useState(false)

  const handleSnapshot = () => {}

  const handleLoadSnapshot = () => {}

  return (
    <Box variant="layout.borderBox">
      <Text variant="title">Deploy snapshot</Text>
      <Text as="p" variant="legend">
        Save an snapshot of the RToken deployment parameters for external
        validation
      </Text>
      {isUpload ? (
        <SnapshotUpload onLoad={handleLoadSnapshot} />
      ) : (
        <Flex mt={3} sx={{ gap: 3 }}>
          <Button small>Save snapshot</Button>
          <Button
            small
            variant="bordered"
            onLoad={handleLoadSnapshot}
            onClick={() => setUpload(true)}
          >
            Load snapshot
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default DeploySnapshot
