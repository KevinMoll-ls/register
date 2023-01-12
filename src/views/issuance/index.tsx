import { Container } from 'components'
import { Box, Grid } from 'theme-ui'
import About from './components/about'
import Balances from './components/balances'
import Issue from './components/issue'
import Redeem from './components/redeem'

/**
 * Mint & Redeem view
 */
const Issuance = () => (
  <Container pb={4}>
    <Grid columns={[1, 1, 1, '2fr 1.5fr']} gap={[3, 5]}>
      <Box>
        <Grid columns={[1, 2]} gap={[1, 4]} mb={[1, 4]}>
          <Issue />
          <Redeem />
        </Grid>
        <Balances />
      </Box>
      <About />
    </Grid>
  </Container>
)

export default Issuance
