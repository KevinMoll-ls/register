export const ChainId = {
  Mainnet: 1,
  Tenderly: 3,
  Goerli: 5,
  Base: 8453,
  BaseGoerli: 84531,
  Hardhat: 31337,
}

export const supportedChains = new Set(Object.values(ChainId))

export const SUBGRAPH_URL = {
  // Dev node
  [ChainId.Mainnet]:
    'https://api.thegraph.com/subgraphs/name/lcamargof/cryptoasdf', // TODO: CHange to mainnet
  [ChainId.Tenderly]: 'http://127.0.0.1:8000/subgraphs/name/lcamargof/reserve',
  [ChainId.Base]: 'http://127.0.0.1:8000/subgraphs/name/lcamargof/reserve',
  [ChainId.Goerli]:
    'https://api.thegraph.com/subgraphs/name/lcamargof/reserve-goerli',
  [ChainId.Hardhat]: 'http://127.0.0.1:8000/subgraphs/name/lcamargof/reserve',
}

const _defaultChain = Number(
  new URL(window.location.href.replace('/#/', '/')).searchParams.get('chainId')
)

export const defaultChain = supportedChains.has(_defaultChain)
  ? _defaultChain
  : ChainId.Mainnet
