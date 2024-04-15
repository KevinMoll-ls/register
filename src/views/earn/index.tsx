import { useEffect } from 'react'
import { Box, Flex, Text, useColorMode } from 'theme-ui'
import Earn from './components/Earn'
import RegisterAbout from 'views/home/components/RegisterAbout'
import mixpanel from 'mixpanel-browser'
import { Trans } from '@lingui/macro'
import FeaturedPools from './components/FeaturedPools'
import HelpIcon from 'components/icons/HelpIcon'
import { Zap } from 'react-feather'
import { colors } from 'theme'

const HeroBackground = () => {
  const [colorMode] = useColorMode()
  const url =
    colorMode === 'dark' ? '/imgs/bg-earn-dark.png' : '/imgs/bg-earn-light.png'

  return (
    <Box
      sx={{
        width: '100%',
        height: '484px',
        top: 0,
        zIndex: -1,
        position: 'absolute',
        background: `url(${url}) no-repeat`,
        backgroundSize: 'cover',
        borderBottom: '3px solid',
        borderColor: 'borderFocused',
      }}
    />
  )
}

const Hero = () => (
  <Box sx={{ position: 'relative' }}>
    <Flex
      mx="auto"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        maxWidth: '95em',
      }}
      pt={[5, 5]}
      mt={[2, 5]}
      pb={0}
      px={[2, 3]}
    >
      <Box sx={{ maxWidth: 900, textAlign: 'center' }} mt={[2, 7]}>
        <Text
          variant="title"
          sx={{
            fontSize: [5, 7],
            fontWeight: 'bold',
            color: 'accentInverted',
            lineHeight: ['36px', '62px'],
          }}
        >
          <Trans>
            Provide liquidity across DeFi & Earn more with your RTokens
          </Trans>
        </Text>
        <Text as="p" px={[2, 0]} sx={{ fontSize: [2, 3] }} mt={[3, 4]}>
          <Trans>
            DeFi yield opportunities for RTokens in Convex, Curve, Yearn & Beefy
          </Trans>
        </Text>
      </Box>
    </Flex>
  </Box>
)

const Info = () => {
  return (
    <Box variant="layout.centered" mt={4} mb={7} pb={[0, 2]}>
      <Box
        variant="layout.verticalAlign"
        sx={{
          gap: 2,
          borderRadius: '50px',
          border: '3px solid',
          borderColor: 'border',
          width: 'fit-content',
        }}
        backgroundColor="cardAlternative"
        py={2}
        px={3}
      >
        <Zap strokeWidth={1.5} size={18} color={colors.primary} />
        <Text sx={{ fontWeight: 'bold' }} color="primary">
          How are APY's so high?
        </Text>
        <HelpIcon />
      </Box>
    </Box>
  )
}

const EarnWrapper = () => {
  useEffect(() => {
    mixpanel.track('Visted Earn Page', {})
  }, [])

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <HeroBackground />
        <Hero />
        <Info />
        <FeaturedPools />
      </Box>
      <Box variant="layout.wrapper">
        <Earn />
      </Box>
      <RegisterAbout />
    </>
  )
}

export default EarnWrapper
