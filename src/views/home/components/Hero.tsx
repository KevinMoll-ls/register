import { t } from '@lingui/macro'
import LeafIcon from 'components/icons/LeafIcon'
import RootIcon from 'components/icons/RootIcon'
import StackedChainLogo from 'components/icons/StackedChainLogo'
import TreeIcon from 'components/icons/TreeIcon'
import { ArrowUpRight } from 'react-feather'
import Skeleton from 'react-loading-skeleton'
import { Box, Flex, Grid, Text } from 'theme-ui'
import { formatCurrency } from 'utils'
import {
  CHAIN_TO_NETWORK,
  capitalize,
  supportedChainList,
} from 'utils/constants'
import useProtocolMetrics from '../hooks/useProtocolMetrics'
import HistoricalTVL from './HistoricalTVL'
import Help from 'components/help'
import ShieldIcon from 'components/icons/ShieldIcon'

const ProtocolStats = () => {
  const {
    data: {
      marketCap,
      rsrStakedUSD,
      rTokenAnnualizedRevenue,
      rsrStakerAnnualizedRevenue,
    },
    isLoading,
  } = useProtocolMetrics()

  const statInfo = [
    {
      icon: <TreeIcon />,
      value: formatCurrency(marketCap, 1, {
        notation: 'compact',
        compactDisplay: 'short',
      }),
      title: t`RToken Market Cap`,
      tooltip: t`The total value of all RToken in circulation`,
    },
    {
      icon: <ShieldIcon />,
      value: formatCurrency(rsrStakedUSD, 1, {
        notation: 'compact',
        compactDisplay: 'short',
      }),
      title: t`First Loss RSR Capital`,
      tooltip: t`The total value of all RSR staked in the protocol`,
    },
    {
      icon: <LeafIcon />,
      value: formatCurrency(rTokenAnnualizedRevenue, 1, {
        notation: 'compact',
        compactDisplay: 'short',
      }),
      title: t`Annualized RToken Revenue`,
      tooltip: t`The revenue generated by the protocol from RToken holders. Calculation based on the last 10 days revenue.`,
    },
    {
      icon: <LeafIcon />,
      value: formatCurrency(rsrStakerAnnualizedRevenue, 1, {
        notation: 'compact',
        compactDisplay: 'short',
      }),
      title: t`Annualized RSR Staker Revenue`,
      tooltip: t`The revenue generated by the protocol from RSR stakers. Calculation based on the last 10 days revenue.`,
    },
  ]

  return (
    <Grid columns={['1fr', '1fr 1fr']} gap={[4, 0]}>
      {statInfo.map(({ title, value, icon, tooltip }, index) => (
        <Box
          key={title}
          variant="layout.verticalAlign"
          sx={{
            borderTop: ['none', index < 2 ? '1.5px solid' : 'none'],
            borderRight: ['none', index % 2 === 0 ? '1.5px solid' : 'none'],
            borderBottom: ['none', index < 2 ? '1.5px solid' : 'none'],
            borderColor: ['border', 'border'],
            gap: 3,
            p: 4,
          }}
        >
          {icon}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Text sx={{ color: 'secondaryText' }}>{title}</Text>
            <Box>
              {!isLoading ? (
                <Text variant="sectionTitle" sx={{ fontWeight: '700' }}>
                  ${value}
                </Text>
              ) : (
                <Skeleton height={32} width={84} />
              )}
            </Box>
          </Box>
          <Help content={tooltip}></Help>
        </Box>
      ))}
    </Grid>
  )
}

const HeroHeader = () => {
  return (
    <Box
      variant="layout.verticalAlign"
      p={4}
      sx={{
        borderBottom: '1.5px solid',
        borderColor: 'border',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box variant="layout.verticalAlign">
        <StackedChainLogo chains={supportedChainList} />
        <Text>
          The <Text color="accentInverted">Reserve Protocol</Text> on
          {supportedChainList.map(
            (chainId, index) =>
              ` ${capitalize(CHAIN_TO_NETWORK[chainId])}${
                index >= supportedChainList.length - 2
                  ? index === supportedChainList.length - 1
                    ? ''
                    : ' & '
                  : ','
              }`
          )}
        </Text>
      </Box>
      <Box
        variant="layout.verticalAlign"
        sx={{
          gap: 1,
          cursor: 'pointer',
          ':hover': {
            filter: 'brightness(1.1)',
          },
          display: ['none', 'flex'],
        }}
        onClick={() =>
          window.open(
            'https://dune.com/reserve-protocol/reserve-protocol-overview',
            '_blank'
          )
        }
      >
        <Text variant="bold" color="#999">
          Full dashboard
        </Text>
        <ArrowUpRight color="#999" size={16} />
      </Box>
    </Box>
  )
}

const HeroTVL = () => {
  const {
    data: { tvl },
    isLoading,
  } = useProtocolMetrics()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        color: 'accentInverted',
        gap: 1,
      }}
      px={4}
      pt={5}
    >
      <Box pb={2}>
        <RootIcon width={48} height={48} />
      </Box>
      {!isLoading ? (
        <Text variant="bold" sx={{ fontSize: 6 }}>
          ${formatCurrency(tvl, 0)}
        </Text>
      ) : (
        <Skeleton height={52} width={300} style={{ marginBottom: '16px' }} />
      )}

      <Text sx={{ fontSize: 4 }}>TVL in Reserve</Text>
    </Box>
  )
}

const Hero = () => (
  <Box sx={{ position: 'relative' }}>
    <Flex
      sx={{
        flexDirection: 'column',
        borderRadius: '14px',
        backgroundColor: 'reserveBackground',
        border: '1.5px solid',
        borderColor: 'reserveBackground',
      }}
      mx="auto"
    >
      <HeroHeader />
      <Box sx={{ position: 'relative', height: 440 }} px={3} pt={2}>
        <HeroTVL />
        <HistoricalTVL />
      </Box>
      <ProtocolStats />
    </Flex>
  </Box>
)

export default Hero
