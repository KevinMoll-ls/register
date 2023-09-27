import styled from '@emotion/styled'
import Base from 'components/icons/logos/Base'
import Ethereum from 'components/icons/logos/Ethereum'
import Popup from 'components/popup'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { chainIdAtom } from 'state/atoms'
import { publicClient, wagmiConfig } from 'state/chain'
import { transition } from 'theme'
import { Box, BoxProps, Flex, Text } from 'theme-ui'
import { ChainId } from 'utils/chains'
import { useSwitchNetwork } from 'wagmi'

const ActionItem = styled(Flex)`
  transition: ${transition};
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: #6d3210;
  }
`

const chainIcons = {
  [ChainId.Mainnet]: Ethereum,
  [ChainId.Base]: Base,
  [ChainId.Hardhat]: Ethereum,
}

const CHAIN_LIST = [
  { label: 'Ethereum', id: ChainId.Mainnet },
  { label: 'Base', id: ChainId.Base },
]

if (import.meta.env.DEV) {
  CHAIN_LIST.push({ label: 'Hardhat', id: ChainId.Hardhat })
}

const ChainList = ({ onSelect }: { onSelect(chain: number): void }) => {
  const selected = useAtomValue(chainIdAtom)

  return (
    <Box
      sx={{
        maxHeight: 320,
        overflow: 'auto',
        backgroundColor: 'black',
        borderRadius: '13px',
        color: 'white',
      }}
    >
      {CHAIN_LIST.map((chain) => {
        const Icon = chainIcons[chain.id]

        return (
          <ActionItem onClick={() => onSelect(chain.id)} key={chain.id}>
            <Box variant="layout.verticalAlign">
              <Icon fontSize={20} />
              <Text ml={3}>{chain.label}</Text>
              {selected === chain.id && (
                <Check size={18} style={{ marginLeft: 10 }} color="#11BB8D" />
              )}
            </Box>
          </ActionItem>
        )
      })}
    </Box>
  )
}

const ChainSelector = (props: BoxProps) => {
  const [chainId, setChainId] = useAtom(chainIdAtom)
  const [isVisible, setVisible] = useState(false)
  const { switchNetwork } = useSwitchNetwork()
  const navigate = useNavigate()

  const handleSelect = (chain: number) => {
    if (chain !== chainId) {
      // Switch network if supported by wallet
      wagmiConfig.setPublicClient(publicClient({ chainId: chain }))
      setChainId(chain)
      if (switchNetwork) {
        switchNetwork(chain)
      }
      navigate('/')
    }

    setVisible(false)
  }

  const ChainIcon = chainIcons[chainId]

  return (
    <Popup
      show={isVisible}
      onDismiss={() => setVisible(false)}
      content={<ChainList onSelect={handleSelect} />}
    >
      <Flex
        {...props}
        sx={{ alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setVisible(!isVisible)}
      >
        {!!ChainIcon && <ChainIcon fontSize={20} />}
        <Box mr="2" />
        {isVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Flex>
    </Popup>
  )
}

export default ChainSelector
