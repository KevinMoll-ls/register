import AsteriskIcon from 'components/icons/AsteriskIcon'
import CirclesIcon from 'components/icons/CirclesIcon'
import CollaterizationIcon from 'components/icons/CollaterizationIcon'
import LayersIcon from 'components/icons/LayersIcon'
import RiskIcon from 'components/icons/RiskIcon'
import TabMenu from 'components/tab-menu'
import { useCallback, useMemo, useState } from 'react'
import { ChevronDown } from 'react-feather'
import { Box, Card, Flex, Text } from 'theme-ui'
import BackingOverview from './BackingOverview'
import CollateralExposure from './CollateralExposure'
import PlatformExposure from './PlatformExposure'
import Risks from './Risks'
import TokenExposure from './TokenExposure'

const tabComponents = {
  collaterals: CollateralExposure,
  tokens: TokenExposure,
  platforms: PlatformExposure,
  risks: Risks,
}

const Menu = ({
  current,
  onChange,
}: {
  current: string
  onChange(key: string): void
}) => {
  const items = useMemo(
    () => [
      {
        key: 'collaterals',
        label: 'Collaterals',
        icon: <CollaterizationIcon />,
      },
      {
        key: 'tokens',
        label: 'Tokens',
        icon: <CirclesIcon color="currentColor" />,
      },
      { key: 'platforms', label: 'Platforms', icon: <LayersIcon /> },
      { key: 'risks', label: 'Other Risks', icon: <RiskIcon /> },
    ],
    []
  )

  return <TabMenu active={current} items={items} onMenuChange={onChange} />
}

const AssetBreakdown = () => {
  const [current, setCurrent] = useState('collaterals')

  const handleChange = useCallback(
    (key: string) => {
      setCurrent(key)
    },
    [setCurrent]
  )

  const Current = tabComponents[current as keyof typeof tabComponents]

  return (
    <Card>
      <Box variant="layout.verticalAlign">
        <Menu current={current} onChange={handleChange} />
        <Box variant="layout.verticalAlign" ml="auto">
          <AsteriskIcon />
          <Text mx="2">What if there’s a de-peg?</Text>
          <ChevronDown size={16} />
        </Box>
      </Box>
      <Flex
        mt={3}
        sx={{
          flexWrap: ['wrap-reverse', 'wrap-reverse', 'wrap-reverse', 'nowrap'],
        }}
      >
        <BackingOverview current={current} />
        <Current />
      </Flex>
    </Card>
  )
}

export default AssetBreakdown
