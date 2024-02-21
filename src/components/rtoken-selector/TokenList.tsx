import styled from '@emotion/styled'
import TokenItem from 'components/token-item'
import { useAtomValue } from 'jotai'
import { memo } from 'react'
import { Box, Flex } from 'theme-ui'
import availableTokensAtom from './atoms'

const ActionItem = styled(Flex)`
  padding: 16px;
  cursor: pointer;
  border-radius: 6px;
  ,
  &:hover {
    background-color: var(--theme-ui-colors-secondary);
  }
`

/**
 * Token selector list of available RTokens
 */
const TokenList = memo(
  ({
    onSelect,
    onHome,
  }: {
    onSelect(address: string, chainId: number): void
    onHome(): void
  }) => {
    const tokens = useAtomValue(availableTokensAtom)

    return (
      <Box
        p={2}
        sx={{
          maxHeight: 320,
          minWidth: 250,
          overflow: 'auto',
          backgroundColor: 'backgroundNested',
          borderRadius: '12px',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {Object.values(tokens).map(({ address, logo, symbol, chainId }) => (
          <ActionItem
            key={address}
            onClick={() => {
              onSelect(address, chainId as number)
            }}
          >
            <TokenItem
              sx={{ color: 'text' }}
              symbol={symbol}
              logo={logo}
              chainId={chainId}
            />
          </ActionItem>
        ))}
      </Box>
    )
  }
)

export default TokenList
