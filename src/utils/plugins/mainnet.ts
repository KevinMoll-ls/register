import { CollateralPlugin } from 'types'
import {
  COMPOUND_ADDRESS,
  CVX_ADDRESS,
  CRV_ADDRESS,
  STAKE_AAVE_ADDRESS,
  ZERO_ADDRESS,
} from 'utils/addresses'
import { ChainId } from 'utils/chains'
import { TARGET_UNITS } from 'utils/constants'

const collateralAddresses = {
  // DAI: '0xB03A029FF70d7c4c53bb3C4288a87aCFea0Ee8FE',
  DAI: '0x0776Ad71Ae99D759354B3f06fe17454b94837B0D', // TODO:Temporal
  USDC: '0xc3E9E42DE399F50C5Fc2BC971f0b8D10A631688D',
  USDT: '0x7fc1c34782888a076d3c88c0cce27b75892ee85d',
  USDP: '0xeD67e489E7aA622380288557FABfA6Be246dE776',
  TUSD: '0x9cCc7B600F80ed6F3d997698e01301D9016F8656',
  BUSD: '0x07cDEA861B2A231e249E220A553D9A38ba7383D6',
  aDAI: '0x2cAF7BB8C9651377cc7DBd8dc297b58F67D8A816',
  aUSDC: '0xE19ae8D1f3FFf987aaEaa65248BAB3A0d1FDC809',
  aUSDT: '0x44AB1cB3C9f25A928E39A4eDE3CA08B52b4cdE24',
  aBUSD: '0x002835840A6CB5dd3f73e78A21eF41db4C66948e',
  aUSDP: '0x50f4991BE43a631f5BEDB5C39e45FF3E57Fa783e',
  cDAI: '0xe11b8943b6C9abfc9D729306029f7401205bAa9B',
  cUSDC: '0x7FC2df2B27220D9F23Fbd8C21b1f7b0CaEB6fE15',
  cUSDT: '0x1F1941eE0B3CCb4Ff2135D31103C59F2E53C34B5',
  cUSDP: '0xD9438B058Ce83925E4AC0834744fC0b573A7AFbB',
  cWBTC: '0xC3481edefE16599701940a71B7a488605803D4cB',
  cETH: '0xA88304757c00D45b24eea13568bd346C4a49053C',
  WBTC: '0xe9c6bF8536e2Af014a54651F0dd6c74A18D13e70',
  WETH: '0xBd941FA60b6E2AcCa15afB8962f6B4795c848b8D',
  EURT: '0x14d5b63e8FfDDDB590C88d9A258461CbEfbB8d56',
  wstETH: '0x3879C820c3cC4547Cb76F8dC842005946Cedb385',
  rETH: '0xD2270A3E17DBeA5Cb491E0120441bFD0177Da913',
  fUSDC: '0x1289a753e0BaE82CF7f87747f22Eaf8E4eb7C216',
  fUSDT: '0x5F471bDE4950CdB00714A6dD033cA7f912a4f9Ee',
  fDAI: '0xA4410B71033fFE8fA41c6096332Be58E3641326d',
  fFRAX: '0xcd46Ff27c0d6F088FB94896dcE8F17491BD84c75',
  cUSDCv3: '0x615D92fAF203Faa9ea7a4D8cdDC49b2Ad0702a1f',
  cvx3Pool: '0xC34E547D66B5a57B370217aAe4F34b882a9933Dc',
  cvxTriCrypto: '0xb2EeD19C381b71d0f54327D61596312144f66fA7',
  cvxeUSDFRAXBP: '0x0D41E86D019cadaAA32a5a12A35d456711879770',
  cvxMIM3Pool: '0x9866020B7A59022C2F017C6d358868cB11b86E2d',
}

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
  rETH: '0xae78736Cd615f374D3085123A210448E74Fc6393',
  cvx3Pool: '0x30D9410ED1D5DA1F6C8391af5338C93ab8d4035C',
  cvxeUSDFRAXBP: '0x8e074d44aaBC1b3b4406fE03Da7ceF787ea85938',
  cvxMIM3Pool: '0xabB54222c2b77158CC975a2b715a3d703c256F05',
}

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
    depositContract: '0xF6147b4B44aE6240F7955803B2fD5E15c77bD7ea',
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
    depositContract: '0x60C384e226b120d93f3e0F4C502957b2B9C32B15',
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
    depositContract: '0x21fe646D1Ed0733336F2D4d9b2FE67790a6099D9',
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
    collateralAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
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
    collateralAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
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
    collateralAddress: '0xC581b735A1688071A1746c968e0798D642EDE491',
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
    depositContract: '0xee0ac49885719DBF5FC1CDAFD9c752127E009fFa',
    collateralAddress: underlyingCollateralAddresses.cvx3Pool,
    rewardToken: [CVX_ADDRESS[ChainId.Mainnet], CRV_ADDRESS[ChainId.Mainnet]],
  },
  // {
  //   symbol: 'stkCvxCrv3crypto',
  //   address: collateralAddresses.stkCvxCrv3crypto,
  //   decimals: 18,
  //   targetUnit: TARGET_UNITS.TRICRYPTO,
  //   referenceUnit: 'USDT/WBTC/ETH',
  //   collateralToken: 'stkCvxCrv3crypto',
  //   description: '',
  //   depositContract: '0xF68F5cde346729ADB14a89402605a26c5C8Bf028',
  //   collateralAddress: underlyingCollateralAddresses.stkCvxCrv3crypto,
  //   rewardToken: [CVX_ADDRESS[ChainId.Mainnet], CRV_ADDRESS[ChainId.Mainnet]],
  // },
  {
    symbol: 'stkcvxeUSD3CRV-f',
    address: collateralAddresses.cvxeUSDFRAXBP,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'eUSD/FRAX/USDC',
    collateralToken: 'stkcvxeUSD3CRV-f',
    description: '',
    depositContract: '0xBF2FBeECc974a171e319b6f92D8f1d042C6F1AC3',
    collateralAddress: underlyingCollateralAddresses.cvxeUSDFRAXBP,
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
    depositContract: '0x8443364625e09a33d793acd03aCC1F3b5DbFA6F6',
    collateralAddress: underlyingCollateralAddresses.cvxMIM3Pool,
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
]

export default plugins
