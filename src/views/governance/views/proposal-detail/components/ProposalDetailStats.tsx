import Governance from 'abis/Governance'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Check, Slash, ThumbsDown, ThumbsUp, X } from 'react-feather'
import { Box, Progress, Text } from 'theme-ui'
import { formatEther } from 'viem'
import { useContractReads } from 'wagmi'
import { proposalDetailAtom } from '../atom'
import { colors } from 'theme'
import { formatCurrency, formatPercentage } from 'utils'
import { rTokenAtom } from 'state/atoms'
import { isTimeunitGovernance } from 'views/governance/utils'

const BooleanIcon = ({
  value,
  colorSuccess = colors.success,
  colorFailure = 'orange',
}: {
  value: boolean
  colorSuccess?: string
  colorFailure?: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: '2px',
        bg: 'secondary',
        borderRadius: '4px',
      }}
    >
      {value ? (
        <Check size={18} color={colorSuccess} />
      ) : (
        <X size={18} color={colorFailure} />
      )}
    </Box>
  )
}

const ProposalDetailStats = () => {
  const rToken = useAtomValue(rTokenAtom)
  const proposal = useAtomValue(proposalDetailAtom)
  const isTimeunit = isTimeunitGovernance(proposal?.version ?? '1')

  const { data } = useContractReads({
    contracts: [
      {
        address: proposal?.governor ?? '0x1',
        abi: Governance,
        functionName: 'quorum',
        args: [
          isTimeunit
            ? BigInt(proposal?.creationTime || '0')
            : BigInt(proposal?.startBlock || '0'),
        ],
        chainId: rToken?.chainId,
      },
      {
        address: proposal?.governor ?? '0x1',
        abi: Governance,
        functionName: 'proposalVotes',
        args: [BigInt(proposal?.id || '0')],
        chainId: rToken?.chainId,
      },
    ],
    allowFailure: false,
    enabled: !!proposal,
  })

  const [quorum, votes] = data ?? [0n, [0n, 0n, 0n]]

  const [againstVotes, forVotes, abstainVotes] = useMemo(
    () => votes.map((v) => formatEther(v)),
    [votes]
  )

  const [quorumWeight, currentQuorum, quorumNeeded, quorumReached] =
    useMemo(() => {
      const _quorumNeeded = Number(formatEther(quorum ?? 0n))

      if (!proposal || !_quorumNeeded) return [0, 0, 0, false]

      const _currentQuorum = +forVotes + +abstainVotes
      const _quorumWeight = _currentQuorum / _quorumNeeded
      const _quorumReached = _quorumWeight > 1

      return [_quorumWeight, _currentQuorum, _quorumNeeded, _quorumReached]
    }, [proposal, quorum])

  const [majorityWeight, majoritySupport] = useMemo(() => {
    const totalVotes = +forVotes + +againstVotes

    if (!totalVotes) return [0, false]

    const _majorityWeight = +forVotes / totalVotes
    const _majoritySupport = _majorityWeight > 0.5

    return [_majorityWeight, _majoritySupport]
  }, [forVotes, againstVotes])

  return (
    <Box sx={{ bg: 'background', borderRadius: '8px', p: 2 }}>
      <Text variant="title" sx={{ fontWeight: 'bold' }} p={3}>
        Current votes
      </Text>
      <Box
        sx={{
          bg: 'focusedBackground',
          borderRadius: '6px',
          overflow: 'hidden',
          '>div:not(:last-child)': {
            borderBottom: '1px solid',
            borderColor: 'borderSecondary',
          },
          boxShadow: '0px 10px 38px 6px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
          <Box
            variant="layout.verticalAlign"
            sx={{ gap: 2, justifyContent: 'space-between' }}
          >
            <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
              <BooleanIcon value={quorumReached} />
              <Text>Quorum</Text>
            </Box>
            <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
              <Text
                sx={{
                  fontWeight: 'bold',
                  color: quorumReached ? 'success' : 'orange',
                }}
              >
                {formatPercentage(quorumWeight * 100)}
              </Text>

              <Text color="secondaryText" sx={{ whiteSpace: 'nowrap' }}>
                {formatCurrency(currentQuorum, 2, {
                  notation: 'compact',
                  compactDisplay: 'short',
                })}{' '}
                of{' '}
                {formatCurrency(quorumNeeded, 2, {
                  notation: 'compact',
                  compactDisplay: 'short',
                })}
              </Text>
            </Box>
          </Box>
          <Progress
            max={1}
            mt={2}
            sx={{
              width: '100%',
              color: quorumReached ? 'success' : 'orange',
              backgroundColor: 'lightgray',
              height: 4,
            }}
            value={quorumWeight}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
          <Box
            variant="layout.verticalAlign"
            sx={{ gap: 2, justifyContent: 'space-between' }}
          >
            <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
              <BooleanIcon
                value={majoritySupport}
                colorSuccess={colors.primary}
                colorFailure="red"
              />
              <Text>Majority support</Text>
            </Box>
            <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
              <Text
                sx={{
                  fontWeight: 'bold',
                  color: majoritySupport ? 'primary' : 'red',
                }}
              >
                {majoritySupport ? 'Yes' : 'No'}
              </Text>
              <Text color="secondaryText">
                {formatPercentage(majorityWeight * 100)}
              </Text>
            </Box>
          </Box>
          <Progress
            max={1}
            mt={2}
            sx={{
              width: '100%',
              color: majoritySupport ? 'primary' : 'red',
              backgroundColor: 'lightgray',
              height: 4,
            }}
            value={majorityWeight}
          />
        </Box>
        <Box variant="layout.verticalAlign">
          <Box
            variant="layout.verticalAlign"
            sx={{
              gap: '12px',
              flexGrow: 1,
              borderRight: '1px solid',
              borderColor: 'borderSecondary',
              p: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                bg: 'secondary',
                borderRadius: '4px',
              }}
            >
              <ThumbsUp size={16} color={colors.primary} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text sx={{ minWidth: 60 }}>For</Text>
              <Text sx={{ fontWeight: 'bold', color: 'primary' }}>
                {formatCurrency(+forVotes, 0, {
                  notation: 'compact',
                  compactDisplay: 'short',
                })}
              </Text>
            </Box>
          </Box>
          <Box
            variant="layout.verticalAlign"
            sx={{
              gap: '12px',
              flexGrow: 1,
              p: 3,
              justifyContent: 'end',
              textAlign: 'right',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text sx={{ minWidth: 60 }}>Against</Text>
              <Text sx={{ fontWeight: 'bold', color: 'red' }}>
                {formatCurrency(+againstVotes, 0, {
                  notation: 'compact',
                  compactDisplay: 'short',
                })}
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                bg: 'secondary',
                borderRadius: '4px',
              }}
            >
              <ThumbsDown size={16} color="red" />
            </Box>
          </Box>
        </Box>
        <Box
          variant="layout.verticalAlign"
          sx={{
            p: 3,
            justifyContent: 'space-between',
          }}
        >
          <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                bg: 'secondary',
                borderRadius: '4px',
              }}
            >
              <Slash size={16} />
            </Box>
            <Text sx={{ minWidth: 60 }}>Abstain</Text>
          </Box>
          <Text sx={{ fontWeight: 'bold', color: 'secondaryText' }}>
            {formatCurrency(+abstainVotes, 0, {
              notation: 'compact',
              compactDisplay: 'short',
            })}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ProposalDetailStats
