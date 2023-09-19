import { CollateralPlugin } from 'types'
import {
  COMPOUND_ADDRESS,
  CRV_ADDRESS,
  CVX_ADDRESS,
  STAKE_AAVE_ADDRESS,
  ZERO_ADDRESS,
} from 'utils/addresses'
import { ChainId } from 'utils/chains'
import { TARGET_UNITS } from 'utils/constants'

// TODO: Create script that generates this automatically from collateral/underlying arrays
// Collateral asset addresses 3.0
const collateralAddresses = {
  DAI: '0xf7d1C6eE4C0D84C6B530D53A897daa1E9eB56833',
  USDC: '0xBE9D23040fe22E8Bd8A88BF5101061557355cA04',
  USDT: '0x58D7bF13D3572b08dE5d96373b8097d94B1325ad',
  USDP: '0x2f98bA77a8ca1c630255c4517b1b3878f6e60C89',
  TUSD: '0x7F9999B2C9D310a5f48dfD070eb5129e1e8565E2',
  BUSD: '0xCBcd605088D5A5Da9ceEb3618bc01BFB87387423',
  aDAI: '0x256b89658bD831CC40283F42e85B1fa8973Db0c9',
  aUSDC: '0x0F875eE2b36a7B6BdF6c9cb5f2f608E287C3d619',
  aUSDT: '0xAd76B12aeEe90B745F0C62110cf1E261Fc5a06bb',
  aBUSD: '0xeB1A036E83aD95f0a28d0c8E2F20bf7f1B299F05',
  aUSDP: '0x0d61Ce1801A460eB683b5ed1b6C7965d31b769Fd',
  cDAI: '0x440A634DdcFb890BCF8b0Bf07Ef2AaBB37dd5F8C',
  cUSDC: '0x50a9d529EA175CdE72525Eaa809f5C3c47dAA1bB',
  cUSDT: '0x5757fF814da66a2B4f9D11d48570d742e246CfD9',
  cUSDP: '0x99bD63BF7e2a69822cD73A82d42cF4b5501e5E50',
  cWBTC: '0x688c95461d611Ecfc423A8c87caCE163C6B40384',
  cETH: '0x357d4dB0c2179886334cC33B8528048F7E1D3Fe3',
  WBTC: '0x87A959e0377C68A50b08a91ae5ab3aFA7F41ACA4',
  WETH: '0x6B87142C7e6cA80aa3E6ead0351673C45c8990e3',
  EURT: '0xEBD07CE38e2f46031c982136012472A4D24AE070',
  wstETH: '0x29F2EB4A0D3dC211BB488E9aBe12740cafBCc49C',
  rETH: '0x1103851D1FCDD3f88096fbed812c8FF01949cF9d',
  fUSDC: '0x1FFA5955D64Ee32cB1BF7104167b81bb085b0c8d',
  fUSDT: '0xF73EB45d83AC86f8a6F75a6252ca1a59a9A3aED3',
  fDAI: '0xE1fcCf8e23713Ed0497ED1a0E6Ae2b19ED443eCd',
  fFRAX: '0x8b06c065b4b44B310442d4ee98777BF7a1EBC6E3',
  cUSDCv3: '0x85b256e9051B781A0BC0A987857AD6166C94040a',
  cvx3Pool: '0x62C394620f674e85768a7618a6C202baE7fB8Dd1',
  cvxeUSDFRAXBP: '0x890FAa00C16EAD6AA76F18A1A7fe9C40838F9122',
  cvxMIM3Pool: '0xCBE084C44e7A2223F76362Dcc4EbDacA5Fb1cbA7',
  crv3Pool: '0x8Af118a89c5023Bb2B03C70f70c8B396aE71963D',
  crveUSDFRAXBP: '0xC87CDFFD680D57BF50De4C364BF4277B8A90098E',
  crvMIM3Pool: '0x14c443d8BdbE9A65F3a23FA4e199d8741D5B38Fa',
  sDAI: '0xde0e2f0c9792617d3908d92a024caa846354cea2',
  cbETH: '0x3962695aCce0Efce11cFf997890f3D1D7467ec40',
  maUSDT: '0xd000a79bd2a07eb6d2e02ecad73437de40e52d69',
  maUSDC: '0x2304E98cD1E2F0fd3b4E30A1Bc6E9594dE2ea9b7',
  maDAI: '0x9d38BFF9Af50738DF92a54Ceab2a2C2322BB1FAB',
  maWBTC: '0x49A44d50d3B1E098DAC9402c4aF8D0C0E499F250',
  maWETH: '0x878b995bDD2D9900BEE896Bd78ADd877672e1637',
  maStETH: '0x33E840e5711549358f6d4D11F9Ab2896B36E9822',
}

// Underlying token for collateral
const underlyingCollateralAddresses = {
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  BUSD: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  USDP: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
  TUSD: '0x0000000000085d4780B73119b644AE5ecd22b376',
  aDAI: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
  aUSDC: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
  aUSDT: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
  aUSDP: '0x2e8F4bdbE3d47d7d7DE490437AeA9915D930F1A3',
  cDAI: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
  cUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
  cUSDT: '0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9',
  cUSDP: '0x041171993284df560249B57358F931D9eB7b925D',
  cETH: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
  cWBTC: '0xC11b1268C1A384e55C48c2391d8d480264A3A7F4',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  EURT: '0xC581b735A1688071A1746c968e0798D642EDE491',
  fUSDC: '0x465a5a630482f3abD6d3b84B39B29b07214d19e5',
  fUSDT: '0x81994b9607e06ab3d5cF3AffF9a67374f05F27d7',
  fDAI: '0xe2bA8693cE7474900A045757fe0efCa900F6530b',
  wstETH: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  cbETH: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
  rETH: '0xae78736Cd615f374D3085123A210448E74Fc6393',
  cvx3Pool: '0x30D9410ED1D5DA1F6C8391af5338C93ab8d4035C',
  cvxeUSDFRAXBP: '0x8e074d44aaBC1b3b4406fE03Da7ceF787ea85938',
  cvxMIM3Pool: '0xabB54222c2b77158CC975a2b715a3d703c256F05',
  crv3Pool: '0xC9c37FC53682207844B058026024853A9C0b8c7B',
  crveUSDFRAXBP: '0x27F672aAf061cb0b2640a4DFCCBd799cD1a7309A',
  crvMIM3Pool: '0xe8461dB45A7430AA7aB40346E68821284980FdFD',
  sDAI: '0x83F20F44975D03b1b09e64809B757c47f942BEeA',
}

// Deposit contract for wrapped collaterals
const collateralErc20Adresses = {}

// MAINNET - ChainId = 1
const plugins: CollateralPlugin[] = [
  // FIAT COLLATERAL
  {
    symbol: 'DAI',
    address: collateralAddresses.DAI,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'DAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.DAI,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'USDC',
    address: collateralAddresses.USDC,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'USDC',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.USDC,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'USDT',
    address: collateralAddresses.USDT,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'USDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.USDT,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'USDP',
    address: collateralAddresses.USDP,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDP',
    collateralToken: 'USDP',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.USDP,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'TUSD',
    address: collateralAddresses.TUSD,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'TUSD',
    collateralToken: 'TUSD',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.TUSD,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'BUSD',
    address: collateralAddresses.BUSD,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'BUSD',
    collateralToken: 'BUSD',
    description: '',
    collateralAddress: underlyingCollateralAddresses.BUSD,
    rewardToken: [ZERO_ADDRESS],
  },
  // YIELD TOKEN COLLATERAL
  {
    symbol: 'saDAI',
    address: collateralAddresses.aDAI,
    decimals: 18,
    collateralDecimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'aDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aDAI,
    depositContract: '0xafd16aFdE22D42038223A6FfDF00ee49c8fDa985',
    rewardToken: [STAKE_AAVE_ADDRESS[ChainId.Mainnet]],
    underlyingToken: underlyingCollateralAddresses.DAI,
  },
  {
    symbol: 'saUSDC',
    address: collateralAddresses.aUSDC,
    decimals: 6,
    collateralDecimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'aUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aUSDC,
    depositContract: '0x743063E627d375f0A21bB92D07598Edc7D6F3a2d',
    rewardToken: [STAKE_AAVE_ADDRESS[ChainId.Mainnet]],
    underlyingToken: underlyingCollateralAddresses.USDC,
  },
  {
    symbol: 'saUSDT',
    address: collateralAddresses.aUSDT,
    decimals: 6,
    collateralDecimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'aUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aUSDT,
    depositContract: '0xA6e159b274e00848322B9Fa89F0783876884CeDD',
    rewardToken: [STAKE_AAVE_ADDRESS[ChainId.Mainnet]],
    underlyingToken: underlyingCollateralAddresses.USDT,
  },
  {
    symbol: 'cDAI',
    address: collateralAddresses.cDAI,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'cDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cDAI,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'cUSDC',
    address: collateralAddresses.cUSDC,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'cUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDC,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'wcUSDCv3',
    address: collateralAddresses.cUSDCv3,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'cUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDC,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'cUSDT',
    address: collateralAddresses.cUSDT,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'cUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDT,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'cWBTC',
    address: collateralAddresses.cWBTC,
    decimals: 18,
    targetUnit: TARGET_UNITS.BTC,
    referenceUnit: 'WBTC',
    collateralToken: 'cWBTC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cWBTC,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'cETH',
    address: collateralAddresses.cETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'ETH',
    collateralToken: 'cETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cETH,
    rewardToken: [COMPOUND_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'wBTC',
    address: collateralAddresses.WBTC,
    decimals: 6,
    targetUnit: TARGET_UNITS.BTC,
    referenceUnit: 'wBTC',
    collateralToken: 'wBTC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.WBTC,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'wETH',
    address: collateralAddresses.WETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'wETH',
    collateralToken: 'wETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.WETH,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'EURT',
    address: collateralAddresses.EURT,
    decimals: 6,
    targetUnit: TARGET_UNITS.EUR,
    referenceUnit: 'EURT',
    collateralToken: 'EURT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.EURT,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'fUSDC',
    address: collateralAddresses.fUSDC,
    decimals: 8,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'fUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fUSDC,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'fUSDT',
    address: collateralAddresses.fUSDT,
    decimals: 8,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'fUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fUSDT,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'fDAI',
    address: collateralAddresses.fDAI,
    decimals: 8,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'fDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fDAI,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'stkcvx3Crv',
    address: collateralAddresses.cvx3Pool,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC/USDT/DAI',
    collateralToken: 'stkcvx3Crv',
    description: '',
    depositContract: '0xaBd7E7a5C846eD497681a590feBED99e7157B6a3',
    collateralAddress: underlyingCollateralAddresses.cvx3Pool,
    underlyingToken: underlyingCollateralAddresses.cvx3Pool,
    rewardToken: [CVX_ADDRESS[ChainId.Mainnet], CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'stkcvxeUSD3CRV-f',
    address: collateralAddresses.cvxeUSDFRAXBP,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'eUSD/FRAX/USDC',
    collateralToken: 'stkcvxeUSD3CRV-f',
    description: '',
    depositContract: '0x3BECE5EC596331033726E5C6C188c313Ff4E3fE5',
    collateralAddress: underlyingCollateralAddresses.cvxeUSDFRAXBP,
    underlyingToken: underlyingCollateralAddresses.cvxeUSDFRAXBP,
    rewardToken: [CVX_ADDRESS[ChainId.Mainnet], CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'stkcvxMIM-3LP3CRV-f',
    address: collateralAddresses.cvxMIM3Pool,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'MIM/USDC/USDT/DAI',
    collateralToken: 'stkcvxMIM-3LP3CRV-f',
    description: '',
    depositContract: '0x9FF9c353136e86EFe02ADD177E7c9769f8a5A77F',
    collateralAddress: underlyingCollateralAddresses.cvxMIM3Pool,
    underlyingToken: underlyingCollateralAddresses.cvxMIM3Pool,
    rewardToken: [CVX_ADDRESS[ChainId.Mainnet], CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'wstETH',
    address: collateralAddresses.wstETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'wETH',
    collateralToken: 'wstETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.wstETH,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'rETH',
    address: collateralAddresses.rETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'wETH',
    collateralToken: 'rETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.rETH,
    rewardToken: [ZERO_ADDRESS],
  },
  // 3.0 new collaterals
  {
    symbol: 'crv3Pool',
    address: collateralAddresses.crv3Pool,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC/USDT/DAI',
    collateralToken: 'crv3Pool',
    description: '',
    depositContract: underlyingCollateralAddresses.crv3Pool,
    collateralAddress: underlyingCollateralAddresses.crv3Pool,
    underlyingToken: underlyingCollateralAddresses.crv3Pool,
    rewardToken: [CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'crveUSDFRAXBP',
    address: collateralAddresses.crveUSDFRAXBP,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'eUSD/FRAX/USDC',
    collateralToken: 'crveUSDFRAXBP',
    description: '',
    depositContract: underlyingCollateralAddresses.crveUSDFRAXBP,
    collateralAddress: underlyingCollateralAddresses.crveUSDFRAXBP,
    underlyingToken: underlyingCollateralAddresses.crveUSDFRAXBP,
    rewardToken: [CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'crvMIM3Pool',
    address: collateralAddresses.crvMIM3Pool,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'MIM/USDC/USDT/DAI',
    collateralToken: 'crvMIM3Pool',
    description: '',
    depositContract: underlyingCollateralAddresses.crvMIM3Pool,
    collateralAddress: underlyingCollateralAddresses.crvMIM3Pool,
    underlyingToken: underlyingCollateralAddresses.crvMIM3Pool,
    rewardToken: [CRV_ADDRESS[ChainId.Mainnet]],
  },
  {
    symbol: 'sDAI',
    address: collateralAddresses.sDAI,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'DAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.sDAI,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.DAI,
    depositContract: '0x83F20F44975D03b1b09e64809B757c47f942BEeA',
  },
  {
    symbol: 'cbETH',
    address: collateralAddresses.cbETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'ETH',
    collateralToken: 'cETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cbETH,
    rewardToken: [ZERO_ADDRESS],
  },
  {
    symbol: 'mrp-aUSDT',
    address: collateralAddresses.maUSDT,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'USDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.USDT,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.USDT,
    depositContract: '0xaA91d24c2F7DBb6487f61869cD8cd8aFd5c5Cab2',
  },
  {
    symbol: 'mrp-aUSDC',
    address: collateralAddresses.maUSDC,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'USDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.USDC,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.USDC,
    depositContract: '0x7f7B77e49d5b30445f222764a794AFE14af062eB',
  },
  {
    symbol: 'mrp-aDAI',
    address: collateralAddresses.maDAI,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'DAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.DAI,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.DAI,
    depositContract: '0xE2b16e14dB6216e33082D5A8Be1Ef01DF7511bBb',
  },
  {
    symbol: 'mrp-aWBTC',
    address: collateralAddresses.maWBTC,
    decimals: 18,
    targetUnit: TARGET_UNITS.BTC,
    referenceUnit: 'WBTC',
    collateralToken: 'WBTC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.WBTC,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.WBTC,
    depositContract: '0xe0E1d3c6f09DA01399e84699722B11308607BBfC',
  },
  {
    symbol: 'mrp-aWETH',
    address: collateralAddresses.maWETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'WETH',
    collateralToken: 'WETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.WETH,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.WETH,
    depositContract: '0x291ed25eB61fcc074156eE79c5Da87e5DA94198F',
  },
  {
    symbol: 'mrp-aSTETH',
    address: collateralAddresses.maStETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'stETH',
    collateralToken: 'ETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.stETH,
    rewardToken: [ZERO_ADDRESS],
    underlyingToken: underlyingCollateralAddresses.stETH,
    depositContract: '0x97F9d5ed17A0C99B279887caD5254d15fb1B619B',
  },
]

export default plugins
