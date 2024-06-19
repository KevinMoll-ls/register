import { gql } from 'graphql-request'
import useQuery from 'hooks/useQuery'
import useRToken from 'hooks/useRToken'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { rTokenGovernanceAtom, rTokenManagersAtom } from 'state/atoms'
import { isAddress } from 'utils'
import { Address } from 'viem'

// Added name order to governanceFrameworks so that "Governor Anastasius"
// is first element (until we add a timestamp field).
const query = gql`
  query getRTokenOwner($id: String!) {
    rtoken(id: $id) {
      owners
      pausers
      freezers
      longFreezers
    }
    governance(id: $id) {
      guardians
      governanceFrameworks(orderBy: name, orderDirection: desc) {
        id
        name
        proposalThreshold
        contractAddress
        quorumDenominator
        quorumNumerator
        quorumVotes
        executionDelay
        timelockAddress
        votingDelay
        votingPeriod
      }
    }
  }
`

const ANASTASIUS_BSDETH = {
  id: '0x21fBa52dA03e1F964fa521532f8B8951fC212055',
  timelockAddress: '0xe664d294824C2A8C952A10c4034e1105d2907F46',
  name: 'Governor Anastasius',
  proposalThreshold: '10000',
  contractAddress: '0x21fBa52dA03e1F964fa521532f8B8951fC212055',
  quorumDenominator: '100',
  quorumNumerator: '10',
  quorumVotes: '5933603586673195820121089',
  executionDelay: '259200',
  votingDelay: '172800',
  votingPeriod: '259200',
}

const RTokenGovernanceUpdater = () => {
  const rToken = useRToken()
  const setGovernance = useSetAtom(rTokenGovernanceAtom)
  const setTokenManagers = useSetAtom(rTokenManagersAtom)

  const { data } = useQuery(rToken?.main ? query : null, {
    id: rToken?.address.toLowerCase(),
  })

  useEffect(() => {
    if (data?.rtoken) {
      setTokenManagers(data.rtoken)

      // Governance is set up
      if (data.governance?.governanceFrameworks?.length) {
        const governanceFrameworks =
          rToken?.symbol === 'bsdETH'
            ? ANASTASIUS_BSDETH
            : data.governance.governanceFrameworks[0]

        // TODO: Multiple governances, currently use 1
        const {
          id,
          name,
          proposalThreshold,
          quorumDenominator,
          quorumNumerator,
          quorumVotes,
          contractAddress,
          timelockAddress,
          executionDelay,
          votingDelay,
          votingPeriod,
        } = governanceFrameworks

        setGovernance({
          name,
          proposalThreshold: (+proposalThreshold / 1e6).toString(),
          timelock: isAddress(timelockAddress) ?? undefined,
          governor: isAddress(contractAddress) as Address,
          votingDelay,
          votingPeriod,
          quorumDenominator,
          // TODO: Figure out why eUSD governance config is incorrectly recorded in graphql
          executionDelay:
            id === '0x7e880d8bd9c9612d6a9759f96acd23df4a4650e6' &&
            executionDelay === '0'
              ? '259200'
              : executionDelay,
          quorumNumerator,
          quorumVotes,
          guardians: data.governance.guardians ?? [],
        })
      }
    }
  }, [data])

  return null
}

export default RTokenGovernanceUpdater
