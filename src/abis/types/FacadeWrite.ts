/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type RevenueShareStruct = {
  rTokenDist: PromiseOrValue<BigNumberish>;
  rsrDist: PromiseOrValue<BigNumberish>;
};

export type RevenueShareStructOutput = [number, number] & {
  rTokenDist: number;
  rsrDist: number;
};

export type DeploymentParamsStruct = {
  dist: RevenueShareStruct;
  minTradeVolume: PromiseOrValue<BigNumberish>;
  rTokenMaxTradeVolume: PromiseOrValue<BigNumberish>;
  shortFreeze: PromiseOrValue<BigNumberish>;
  longFreeze: PromiseOrValue<BigNumberish>;
  rewardRatio: PromiseOrValue<BigNumberish>;
  unstakingDelay: PromiseOrValue<BigNumberish>;
  withdrawalLeak: PromiseOrValue<BigNumberish>;
  warmupPeriod: PromiseOrValue<BigNumberish>;
  tradingDelay: PromiseOrValue<BigNumberish>;
  batchAuctionLength: PromiseOrValue<BigNumberish>;
  dutchAuctionLength: PromiseOrValue<BigNumberish>;
  backingBuffer: PromiseOrValue<BigNumberish>;
  maxTradeSlippage: PromiseOrValue<BigNumberish>;
  issuanceThrottle: ThrottleLib.ParamsStruct;
  redemptionThrottle: ThrottleLib.ParamsStruct;
};

export type DeploymentParamsStructOutput = [
  RevenueShareStructOutput,
  BigNumber,
  BigNumber,
  number,
  number,
  BigNumber,
  number,
  BigNumber,
  number,
  number,
  number,
  number,
  BigNumber,
  BigNumber,
  ThrottleLib.ParamsStructOutput,
  ThrottleLib.ParamsStructOutput
] & {
  dist: RevenueShareStructOutput;
  minTradeVolume: BigNumber;
  rTokenMaxTradeVolume: BigNumber;
  shortFreeze: number;
  longFreeze: number;
  rewardRatio: BigNumber;
  unstakingDelay: number;
  withdrawalLeak: BigNumber;
  warmupPeriod: number;
  tradingDelay: number;
  batchAuctionLength: number;
  dutchAuctionLength: number;
  backingBuffer: BigNumber;
  maxTradeSlippage: BigNumber;
  issuanceThrottle: ThrottleLib.ParamsStructOutput;
  redemptionThrottle: ThrottleLib.ParamsStructOutput;
};

export type ConfigurationParamsStruct = {
  name: PromiseOrValue<string>;
  symbol: PromiseOrValue<string>;
  mandate: PromiseOrValue<string>;
  params: DeploymentParamsStruct;
};

export type ConfigurationParamsStructOutput = [
  string,
  string,
  string,
  DeploymentParamsStructOutput
] & {
  name: string;
  symbol: string;
  mandate: string;
  params: DeploymentParamsStructOutput;
};

export type BackupInfoStruct = {
  backupUnit: PromiseOrValue<BytesLike>;
  diversityFactor: PromiseOrValue<BigNumberish>;
  backupCollateral: PromiseOrValue<string>[];
};

export type BackupInfoStructOutput = [string, BigNumber, string[]] & {
  backupUnit: string;
  diversityFactor: BigNumber;
  backupCollateral: string[];
};

export type BeneficiaryInfoStruct = {
  beneficiary: PromiseOrValue<string>;
  revShare: RevenueShareStruct;
};

export type BeneficiaryInfoStructOutput = [string, RevenueShareStructOutput] & {
  beneficiary: string;
  revShare: RevenueShareStructOutput;
};

export type SetupParamsStruct = {
  assets: PromiseOrValue<string>[];
  primaryBasket: PromiseOrValue<string>[];
  weights: PromiseOrValue<BigNumberish>[];
  backups: BackupInfoStruct[];
  beneficiaries: BeneficiaryInfoStruct[];
};

export type SetupParamsStructOutput = [
  string[],
  string[],
  BigNumber[],
  BackupInfoStructOutput[],
  BeneficiaryInfoStructOutput[]
] & {
  assets: string[];
  primaryBasket: string[];
  weights: BigNumber[];
  backups: BackupInfoStructOutput[];
  beneficiaries: BeneficiaryInfoStructOutput[];
};

export type GovernanceParamsStruct = {
  votingDelay: PromiseOrValue<BigNumberish>;
  votingPeriod: PromiseOrValue<BigNumberish>;
  proposalThresholdAsMicroPercent: PromiseOrValue<BigNumberish>;
  quorumPercent: PromiseOrValue<BigNumberish>;
  timelockDelay: PromiseOrValue<BigNumberish>;
};

export type GovernanceParamsStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  votingDelay: BigNumber;
  votingPeriod: BigNumber;
  proposalThresholdAsMicroPercent: BigNumber;
  quorumPercent: BigNumber;
  timelockDelay: BigNumber;
};

export type GovernanceRolesStruct = {
  owner: PromiseOrValue<string>;
  guardian: PromiseOrValue<string>;
  pausers: PromiseOrValue<string>[];
  shortFreezers: PromiseOrValue<string>[];
  longFreezers: PromiseOrValue<string>[];
};

export type GovernanceRolesStructOutput = [
  string,
  string,
  string[],
  string[],
  string[]
] & {
  owner: string;
  guardian: string;
  pausers: string[];
  shortFreezers: string[];
  longFreezers: string[];
};

export declare namespace ThrottleLib {
  export type ParamsStruct = {
    amtRate: PromiseOrValue<BigNumberish>;
    pctRate: PromiseOrValue<BigNumberish>;
  };

  export type ParamsStructOutput = [BigNumber, BigNumber] & {
    amtRate: BigNumber;
    pctRate: BigNumber;
  };
}

export interface FacadeWriteInterface extends utils.Interface {
  functions: {
    "deployRToken((string,string,string,((uint16,uint16),uint192,uint192,uint48,uint48,uint192,uint48,uint192,uint48,uint48,uint48,uint48,uint192,uint192,(uint256,uint192),(uint256,uint192))),(address[],address[],uint192[],(bytes32,uint256,address[])[],(address,(uint16,uint16))[]))": FunctionFragment;
    "deployer()": FunctionFragment;
    "setupGovernance(address,bool,bool,(uint256,uint256,uint256,uint256,uint256),(address,address,address[],address[],address[]))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "deployRToken" | "deployer" | "setupGovernance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployRToken",
    values: [ConfigurationParamsStruct, SetupParamsStruct]
  ): string;
  encodeFunctionData(functionFragment: "deployer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setupGovernance",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>,
      GovernanceParamsStruct,
      GovernanceRolesStruct
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployRToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deployer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setupGovernance",
    data: BytesLike
  ): Result;

  events: {
    "GovernanceCreated(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GovernanceCreated"): EventFragment;
}

export interface GovernanceCreatedEventObject {
  rToken: string;
  governance: string;
  timelock: string;
}
export type GovernanceCreatedEvent = TypedEvent<
  [string, string, string],
  GovernanceCreatedEventObject
>;

export type GovernanceCreatedEventFilter =
  TypedEventFilter<GovernanceCreatedEvent>;

export interface FacadeWrite extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FacadeWriteInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployRToken(
      config: ConfigurationParamsStruct,
      setup: SetupParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployer(overrides?: CallOverrides): Promise<[string]>;

    setupGovernance(
      rToken: PromiseOrValue<string>,
      deployGovernance: PromiseOrValue<boolean>,
      unpause: PromiseOrValue<boolean>,
      govParams: GovernanceParamsStruct,
      govRoles: GovernanceRolesStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deployRToken(
    config: ConfigurationParamsStruct,
    setup: SetupParamsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployer(overrides?: CallOverrides): Promise<string>;

  setupGovernance(
    rToken: PromiseOrValue<string>,
    deployGovernance: PromiseOrValue<boolean>,
    unpause: PromiseOrValue<boolean>,
    govParams: GovernanceParamsStruct,
    govRoles: GovernanceRolesStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployRToken(
      config: ConfigurationParamsStruct,
      setup: SetupParamsStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    deployer(overrides?: CallOverrides): Promise<string>;

    setupGovernance(
      rToken: PromiseOrValue<string>,
      deployGovernance: PromiseOrValue<boolean>,
      unpause: PromiseOrValue<boolean>,
      govParams: GovernanceParamsStruct,
      govRoles: GovernanceRolesStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "GovernanceCreated(address,address,address)"(
      rToken?: PromiseOrValue<string> | null,
      governance?: PromiseOrValue<string> | null,
      timelock?: PromiseOrValue<string> | null
    ): GovernanceCreatedEventFilter;
    GovernanceCreated(
      rToken?: PromiseOrValue<string> | null,
      governance?: PromiseOrValue<string> | null,
      timelock?: PromiseOrValue<string> | null
    ): GovernanceCreatedEventFilter;
  };

  estimateGas: {
    deployRToken(
      config: ConfigurationParamsStruct,
      setup: SetupParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployer(overrides?: CallOverrides): Promise<BigNumber>;

    setupGovernance(
      rToken: PromiseOrValue<string>,
      deployGovernance: PromiseOrValue<boolean>,
      unpause: PromiseOrValue<boolean>,
      govParams: GovernanceParamsStruct,
      govRoles: GovernanceRolesStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployRToken(
      config: ConfigurationParamsStruct,
      setup: SetupParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setupGovernance(
      rToken: PromiseOrValue<string>,
      deployGovernance: PromiseOrValue<boolean>,
      unpause: PromiseOrValue<boolean>,
      govParams: GovernanceParamsStruct,
      govRoles: GovernanceRolesStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
