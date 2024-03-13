import { t, Trans } from '@lingui/macro'
import { Button } from 'components'
import ChainLogo from 'components/icons/ChainLogo'
import ChevronRight from 'components/icons/ChevronRight'
import CollaterizationIcon from 'components/icons/CollaterizationIcon'
import MoneyIcon from 'components/icons/MoneyIcon'
import PegIcon from 'components/icons/PegIcon'
import TokenLogo from 'components/icons/TokenLogo'
import { ListedToken } from 'hooks/useTokenList'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, BoxProps, Card, Text } from 'theme-ui'
import { formatCurrency, getTokenRoute } from 'utils'
import { CHAIN_TAGS, ROUTES } from 'utils/constants'
import CollateralPieChartWrapper from 'views/overview/components/CollateralPieChartWrapper'
import RTokenAddresses from 'views/overview/components/RTokenAddresses'
import usePriceETH from '../hooks/usePriceETH'
import EarnButton from './EarnButton'
import MobileCollateralInfo from './MobileCollateralInfo'
import VerticalDivider from './VerticalDivider'

interface Props extends BoxProps {
  token: ListedToken
}

const ChainBadge = ({ chain }: { chain: number }) => (
  <Box
    variant="layout.verticalAlign"
    sx={{
      display: ['none', 'flex'],
      backgroundColor: 'rgba(0, 82, 255, 0.06)',
      border: '1px solid',
      borderColor: 'rgba(0, 82, 255, 0.20)',
      borderRadius: '50px',
      padding: '4px 8px',
      gap: 1,
    }}
  >
    <ChainLogo chain={chain} fontSize={12} />
    <Text sx={{ fontSize: 12 }} color="#627EEA">
      {CHAIN_TAGS[chain] + ' Native'}
    </Text>
  </Box>
)

// TODO: Component should be splitted
const RTokenCard = ({ token, ...props }: Props) => {
  const navigate = useNavigate()
  const { priceETHTerms, supplyETHTerms } = usePriceETH(token)

  const handleNavigate = (route: string) => {
    navigate(getTokenRoute(token.id, token.chain, route))
  }

  return (
    <Card
      sx={{
        backgroundColor: 'contentBackground',
        borderRadius: ['10px', '20px'],
        borderBottom: '2px solid',
        borderColor: 'transparent',
        '&:hover': {
          borderColor: ['transparent', 'primary'],
        },
        minHeight: ['100%', '316px'],
        cursor: 'pointer',

        transition: 'border-color 0.3s ease',
      }}
      p={[0, 3]}
      onClick={(e) => {
        e.stopPropagation()
        handleNavigate(ROUTES.OVERVIEW)
      }}
      {...props}
    >
      <Box variant="layout.verticalAlign" sx={{ height: '100%' }}>
        <Box
          sx={{
            pr: 3,
            flexShrink: 0,
            display: ['none', 'block'],
            borderRight: '1px solid',
            borderColor: 'darkBorder',
          }}
        >
          <CollateralPieChartWrapper token={token} />
        </Box>

        <Box
          variant="layout.centered"
          pl={[3, 5]}
          pr={3}
          py={3}
          sx={{
            flexGrow: 1,
            alignItems: 'start',
            justifyContent: ['start', 'space-between'],
            gap: 2,
            height: '100%',
            minHeight: '284px',
          }}
        >
          <Box
            variant="layout.verticalAlign"
            sx={{ gap: 2, justifyContent: 'space-between', width: '100%' }}
          >
            <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
              <TokenLogo
                width={32}
                src={token.logo}
                sx={{ display: ['block', 'none'], height: '32px' }}
              />
              <ChainBadge chain={token.chain} />
              <Box sx={{ display: ['block', 'none'] }}>
                <ChainLogo chain={token.chain} fontSize={12} />
              </Box>
            </Box>
            <RTokenAddresses token={token} />
          </Box>

          <Box
            variant="layout.centered"
            sx={{ alignItems: 'start', gap: [2, 4], width: '100%' }}
          >
            <Box
              variant="layout.verticalAlign"
              sx={{
                gap: '12px',
                justifyContent: ['space-between', 'start'],
                flexGrow: 1,
                width: '100%',
              }}
            >
              <TokenLogo
                width={50}
                src={token.logo}
                sx={{ display: ['none', 'block'] }}
              />
              <Box variant="layout.centered" sx={{ alignItems: 'start' }}>
                <Text
                  sx={{ fontSize: 26, fontWeight: 700, lineHeight: '26px' }}
                >
                  {token.symbol}
                </Text>
                <Text variant="legend" sx={{ fontSize: 16 }}>
                  {priceETHTerms
                    ? `${priceETHTerms} ${token.targetUnits} ($${formatCurrency(
                        token.price,
                        2
                      )})`
                    : `$${formatCurrency(token.price, 2)}`}
                </Text>
              </Box>
              <Box sx={{ display: ['block', 'none'] }}>
                <ChevronRight width={16} height={16} />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column-reverse', 'column'],
                gap: [3, 4],
                width: '100%',
              }}
            >
              <Box
                variant="layout.verticalAlign"
                sx={{ gap: [2, 3], width: '100%' }}
              >
                <Box sx={{ display: ['flex', 'none'] }}>
                  <MoneyIcon />
                </Box>
                <Box
                  variant="layout.verticalAlign"
                  sx={{
                    gap: [0, 2],
                    flexDirection: ['column', 'row'],
                    flexWrap: 'wrap',
                  }}
                  mr={[2, 0]}
                >
                  <Box variant="layout.verticalAlign">
                    <Box sx={{ display: ['none', 'flex'] }}>
                      <MoneyIcon />
                    </Box>
                    <Text variant="legend" sx={{ whiteSpace: 'nowrap' }}>
                      <Trans>Market cap:</Trans>
                    </Text>
                  </Box>
                  <Box ml="1" variant="layout.verticalAlign">
                    <Text variant="strong">
                      ${formatCurrency(token.supply, 0)}
                    </Text>
                    {supplyETHTerms && (
                      <Text ml="1">
                        {`(${formatCurrency(supplyETHTerms, 0)} ${
                          token.targetUnits
                        })`}
                      </Text>
                    )}
                  </Box>
                </Box>
                <VerticalDivider sx={{ display: ['none', 'block'] }} />
                <Box
                  variant="layout.verticalAlign"
                  sx={{ gap: 2, display: ['none', 'flex'], flexWrap: 'wrap' }}
                >
                  <PegIcon />
                  <Text variant="legend">
                    <Trans>Peg:</Trans>
                  </Text>
                  <Text variant="strong">{token.targetUnits}</Text>
                </Box>
                <VerticalDivider sx={{ display: ['none', 'block'] }} />
                <Box
                  variant="layout.verticalAlign"
                  sx={{ gap: 2, display: ['none', 'flex'], flexWrap: 'wrap' }}
                >
                  <CollaterizationIcon />
                  <Text variant="legend">
                    <Trans>Backing + Overcollaterization:</Trans>
                  </Text>
                  <Text variant="strong" color="text">
                    {(token.backing + token.overcollaterization).toFixed(0)}%
                  </Text>
                </Box>
                <EarnButton
                  token={token}
                  sx={{ display: ['flex', 'none'], flexGrow: 1 }}
                />
              </Box>
              <Box
                variant="layout.verticalAlign"
                sx={{ flexWrap: 'wrap', gap: [2, '12px'] }}
                mt={[0, 1]}
              >
                <Button
                  medium
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigate(ROUTES.ISSUANCE)
                  }}
                >
                  {token.tokenApy
                    ? `${token.tokenApy.toFixed(1)}% Est. APY`
                    : 'Mint'}
                </Button>
                <Button
                  medium
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigate(ROUTES.STAKING)
                  }}
                  variant="bordered"
                >
                  <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
                    <Text>
                      Stake RSR{' '}
                      {!!token.stakingApy &&
                        `- ${token.stakingApy.toFixed(1)}%`}
                    </Text>
                    <Text>{t`Est. APY`}</Text>
                  </Box>
                </Button>

                <EarnButton token={token} sx={{ display: ['none', 'block'] }} />
              </Box>
            </Box>
          </Box>
          <MobileCollateralInfo token={token} />
        </Box>
      </Box>
    </Card>
  )
}

export default memo(RTokenCard)
