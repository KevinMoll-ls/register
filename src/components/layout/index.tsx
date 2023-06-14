import styled from '@emotion/styled'
import { ReactNode, Suspense } from 'react'
import { Box, Flex } from 'theme-ui'
import Header from './header'
import MobileNav from './navigation/MobileNav'
import Sidebar from './sidebar'

const Container = styled(Flex)`
  height: 100%;
  max-width: 95em;
  margin: auto;
`

const Wrapper = styled(Flex)`
  flex-grow: 99999;
  flex-basis: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  flex-direction: column;
`

const Body = styled(Box)`
  display: block;
  height: 100%;
  overflow: hidden;
`

const ContentContainer = styled(Box)`
  overflow: auto;
  height: 100%;
  position: relative;
  flex: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

/**
 * Application Layout
 *
 * @param children - required
 * @returns {JSX.Element}
 */
const Layout = ({ children }: { children: ReactNode }) => (
  <Container>
    <Wrapper>
      <Header />
      <Sidebar />
      <Body>
        <Suspense>
          <ContentContainer id="app-container">{children}</ContentContainer>
        </Suspense>
      </Body>
      <MobileNav />
    </Wrapper>
  </Container>
)

export default Layout
