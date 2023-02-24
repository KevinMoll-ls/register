import { Container } from 'components'
import useTokenStats from 'hooks/useTokenStats'
import { useAtomValue } from 'jotai'
import { rTokenAtom } from 'state/atoms'
import { Box, Divider, Grid } from 'theme-ui'
import About from './components/About'
import AssetOverview from './components/AssetOverview'
import External from './components/External'
import HistoricalData from './components/HistoricalData'
import RecentProtocolTransactions from './components/RecentProtocolTransactions'
import RecentRSVTransactions from './components/RecentRSVTransactions'
import RecentTokenTransactions from './components/RecentTokenTransactions'
import RecentTransactions from './components/RecentTransactions'
import RevenueSplitOverview from './components/RevenueSplitOverview'
import TokenOverview from './components/TokenOverview'
import TokenUsage from './components/TokenUsage'

const dividerProps = { my: 5, mx: [-1, -5], sx: { borderColor: 'border' } }
const gridProps = { columns: [1, 1, 1, 2], gap: [5, 5, 5, 4] }

/**
 * RToken Overview
 * Displays an overview of the RToken Market and transactions stadistics
 *
 * @returns React.Component
 */
const Overview = () => {
  const rToken = useAtomValue(rTokenAtom)
  const rTokenMetrics = useTokenStats(
    rToken?.address.toLowerCase() ?? '',
    rToken?.isRSV
  )

  return (
    <Container>
      <Grid {...gridProps} ml={[0, 0, 0, 3]} gap={0}>
        <Box>
          <TokenOverview
            mt={[3, 0]}
            ml={[3, 3, 3, 0]}
            mr={2}
            metrics={rTokenMetrics}
          />
        </Box>
      </Grid>
      <Divider {...dividerProps} />
      <Grid {...gridProps} ml={[0, 0, 0, 3]} gap={0}>
        <Box>
          <TokenUsage ml={[3, 3, 3, 0]} mt={1} metrics={rTokenMetrics} />
        </Box>
      </Grid>
      <Divider {...dividerProps} />
      <About mt={2} px={3} />
      <Divider mt={4} sx={{ border: 'none' }} />
      <External />
      <Divider my={5} />
      <Grid {...gridProps}>
        <AssetOverview />
        <RevenueSplitOverview />
      </Grid>
      <Divider {...dividerProps} />
      <Grid {...gridProps}>
        <HistoricalData />
        {rToken?.isRSV ? <RecentRSVTransactions /> : <RecentTransactions />}
      </Grid>
    </Container>
  )
}

export default Overview
