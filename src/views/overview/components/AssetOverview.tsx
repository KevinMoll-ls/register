import { Trans } from '@lingui/macro'
import TokenLogo from 'components/icons/TokenLogo'
import useRToken from 'hooks/useRToken'
import { atom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  rTokenAtom,
  rTokenCollateralDist,
  rTokenDistributionAtom,
  rTokenPriceAtom,
} from 'state/atoms'
import { Box, Card, Flex, Grid, Text } from 'theme-ui'
import { StringMap } from 'types'
import { formatCurrency, stringToColor } from 'utils'
import RSV from 'utils/rsv'
import CollateralPieChart from './CollateralPieChart'

const collateralColor: StringMap = {
  dai: '',
  usdc: '#2775CA',
  usdt: '',
  usdp: '#28813F',
  tusd: '#2B2E7C',
  busd: '',
  adai: '',
  ausdc: '',
  ausdt: '',
  abusd: '',
  cdai: '',
  cusdc: '',
  cusdt: '',
  cwbtc: '',
  ceth: '',
  wbtc: '',
  weth: '',
  eurt: '',
}

const basketDistAtom = atom((get) => {
  const rToken = get(rTokenAtom)

  if (rToken?.isRSV) {
    return RSV.collaterals.reduce(
      (acc, current) => ({
        ...acc,
        [current.address]: {
          share: current.symbol === 'USDC' ? 33.34 : 33.33,
          targetUnit: 'USD',
        },
      }),
      {} as { [x: string]: { share: number; targetUnit: string } }
    )
  }

  return get(rTokenCollateralDist)
})

const AssetOverview = () => {
  const rToken = useRToken()
  const basketDist = useAtomValue(basketDistAtom)
  const distribution = useAtomValue(rTokenDistributionAtom)
  const price = useAtomValue(rTokenPriceAtom)
  const pieData = useMemo(() => {
    if (rToken?.address && basketDist && Object.keys(basketDist)) {
      return rToken.collaterals.map((c) => ({
        name: c.name,
        value: basketDist[c.address].share,
        color:
          collateralColor[c.symbol.toLowerCase()] || stringToColor(c.address),
      }))
    }

    return []
  }, [JSON.stringify(basketDist), rToken?.address])

  return (
    <Card py={5} sx={{ height: 'fit-content' }}>
      <Grid columns={2} gap={2}>
        <Flex
          sx={{
            textAlign: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Text>
            <Trans>Basket of 1 {rToken?.symbol}</Trans>
          </Text>
          <Text variant="legend">${formatCurrency(price ?? 0)}</Text>
          <CollateralPieChart
            mb={4}
            mt={2}
            data={pieData}
            symbol={rToken?.symbol || 'rsv'}
            isRSV={rToken?.isRSV}
            insurance={distribution.insurance}
          />
          <Text variant="legend">
            <Trans>Backing</Trans>
            <Box as="span" ml={2} sx={{ fontWeight: 'bold', color: 'text' }}>
              {rToken?.isRSV ? 100 : distribution.backing}%
            </Box>
          </Text>
          {!rToken?.isRSV && (
            <Text variant="legend">
              <Trans>Insurance coverage</Trans>
              <Box as="span" ml={2} sx={{ fontWeight: 'bold', color: 'text' }}>
                {distribution.insurance}%
              </Box>
            </Text>
          )}
        </Flex>
        <Box>
          <Text variant="legend">
            <Trans>Primary Basket</Trans>
          </Text>
          {(rToken?.collaterals ?? []).map((c) => (
            <Flex mt={3} key={c.address} sx={{ alignItems: 'center' }}>
              <TokenLogo symbol={c.symbol} mr={3} />
              <Box>
                <Text variant="legend" sx={{ fontSize: 1, display: 'block' }}>
                  {basketDist[c.address]?.targetUnit}
                </Text>
                <Text>{c.symbol}</Text>
              </Box>
              <Text ml="auto">{basketDist[c.address]?.share || 0}%</Text>
            </Flex>
          ))}
        </Box>
      </Grid>
    </Card>
  )
}

export default AssetOverview
