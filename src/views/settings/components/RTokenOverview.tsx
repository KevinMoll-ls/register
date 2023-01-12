import BackupBasket from 'components/rtoken-setup/basket/BackupBasket'
import PrimaryBasket from 'components/rtoken-setup/basket/PrimaryBasket'
import SectionWrapper from 'components/section-navigation/SectionWrapper'
import useRToken from 'hooks/useRToken'
import { useAtomValue } from 'jotai'
import { rTokenPriceAtom } from 'state/atoms'
import { Box, Card, Divider, Flex, Text } from 'theme-ui'
import { formatCurrency } from 'utils'
import BackingManager from 'views/deploy/components/BackingManager'
import OtherSetup from 'views/deploy/components/OtherSetup'
import ListingInfo from './ListingInfo'

const RTokenOverview = () => {
  const price = useAtomValue(rTokenPriceAtom)
  const rToken = useRToken()

  return (
    <Box>
      <SectionWrapper navigationIndex={0}>
        <Card p={4}>Basic info</Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={1} mt={4}>
        <Card p={4}>
          <PrimaryBasket readOnly />
          <Divider my={4} mx={-4} sx={{ borderColor: 'darkBorder' }} />
          <Flex>
            <Text variant="title">
              1 {rToken?.name} = ${formatCurrency(price, 5)} USD
            </Text>
          </Flex>
        </Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={2} mt={4}>
        <Card p={4}>
          <BackupBasket readOnly />
        </Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={5} mt={4}>
        <Card p={4}>Backing info</Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={6} mt={4}>
        <Card p={4}>Other info</Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={6} mt={4}>
        <Card p={4}>Governance info</Card>
      </SectionWrapper>
      <SectionWrapper navigationIndex={8} mt={4} mb={4}>
        <ListingInfo />
      </SectionWrapper>
    </Box>
  )
}

export default RTokenOverview
