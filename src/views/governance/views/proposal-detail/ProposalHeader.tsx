import Address from 'components/address'
import { SmallButton } from 'components/button'
import CopyValue from 'components/button/CopyValue'
import dayjs from 'dayjs'
import useRToken from 'hooks/useRToken'
import { useAtomValue } from 'jotai'
import { ArrowLeft, Link2 } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { Box, Link, Text } from 'theme-ui'
import { shortenString, shortenStringN } from 'utils'
import { ROUTES } from 'utils/constants'
import { proposalDetailAtom } from './atom'
import ProposalSnapshot from './ProposalSnapshot'
import { ReactNode } from 'react'
import WalletIcon from 'components/icons/WalletIcon'
import WalletOutlineIcon from 'components/icons/WalletOutlineIcon'
import FingerprintIcon from 'components/icons/FingerprintIcon'
import FilesIcon from 'components/icons/FilesIcon'

const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(`../${ROUTES.GOVERNANCE}`)
  }

  return (
    <SmallButton variant="transparent" onClick={handleBack}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}
      >
        <ArrowLeft size={16} />
      </Box>
    </SmallButton>
  )
}

const Dot = () => (
  <Box
    variant="layout.verticalAlign"
    sx={{
      justifyContent: 'center',
      fontWeight: 'bold',
      display: ['none', 'block', 'block', 'block', 'block'],
    }}
  >
    ·
  </Box>
)

const StatItem = ({
  label,
  icon,
  children,
}: {
  label: string
  icon: ReactNode
  children: ReactNode
}) => (
  <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        bg: 'bgIcon',
        borderRadius: '4px',
        color: 'text',
      }}
    >
      {icon}
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Text variant="legend" sx={{ fontSize: 1 }}>
        {label}
      </Text>
      {children}
    </Box>
  </Box>
)

const ProposalHeader = () => {
  const rToken = useRToken()
  const proposal = useAtomValue(proposalDetailAtom)

  let title = 'Loading...'
  let rfcLink = ''

  if (proposal?.description) {
    const [heading, rfc, _] = proposal.description.split(/\r?\n/)
    title = heading.replaceAll('#', '').trim()
    if (rfc?.includes('forum')) {
      rfcLink = rfc.match(/\(([^)]+)\)/)?.[1] ?? ''
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: [3, 8],
        p: [3, 4],
      }}
    >
      <Box
        variant="layout.verticalAlign"
        sx={{ gap: [3, 2], justifyContent: 'space-between', flexWrap: 'wrap' }}
      >
        <BackButton />
        <ProposalSnapshot />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: [2, 6] }}>
        <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>{title}</Text>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Box
            variant="layout.verticalAlign"
            sx={{
              gap: [2, 5],
              flexWrap: 'wrap',
            }}
          >
            <StatItem label="Proposed on" icon={<FilesIcon />}>
              <Text>
                {proposal?.creationTime
                  ? dayjs.unix(+proposal.creationTime).format('MMM D, YYYY')
                  : 'Loading...'}
              </Text>
            </StatItem>
            <StatItem label="Proposed by" icon={<WalletOutlineIcon />}>
              <Box>
                {proposal?.proposer && rToken?.chainId && (
                  <Address
                    address={proposal?.proposer}
                    chain={rToken?.chainId}
                  />
                )}
              </Box>
            </StatItem>
            <StatItem label="ID" icon={<FingerprintIcon />}>
              <Box variant="layout.verticalAlign" sx={{ gap: 1 }}>
                <Text>
                  {proposal?.id ? shortenString(proposal.id) : 'Loading...'}
                </Text>
                {!!proposal?.id && (
                  <CopyValue text={proposal.id} value={proposal.id} />
                )}
              </Box>
            </StatItem>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default ProposalHeader
