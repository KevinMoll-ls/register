import { ChainId, MULTICALL_ADDRESSES } from '@usedapp/core'

type AddressMap = { [chainId: number]: string }

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DEPLOYER_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: ZERO_ADDRESS,
  [ChainId.Hardhat]: '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
}

// Default RToken
export const RTOKEN_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: ZERO_ADDRESS,
  [ChainId.Hardhat]: '0x9467a509da43cb50eb332187602534991be1fea4',
}

// Default RSR Token
export const RSR_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: ZERO_ADDRESS,
  [ChainId.Hardhat]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

export const ENS_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [ChainId.Hardhat]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const MULTICALL_ADDRESS: AddressMap = {
  ...MULTICALL_ADDRESSES,
  [ChainId.Hardhat]: '0xf5059a5d33d5853360d16c683c16e67980206f36',
}
