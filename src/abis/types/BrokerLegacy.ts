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
  PayableOverrides,
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

export type TradeRequestStruct = {
  sell: PromiseOrValue<string>;
  buy: PromiseOrValue<string>;
  sellAmount: PromiseOrValue<BigNumberish>;
  minBuyAmount: PromiseOrValue<BigNumberish>;
};

export type TradeRequestStructOutput = [
  string,
  string,
  BigNumber,
  BigNumber
] & {
  sell: string;
  buy: string;
  sellAmount: BigNumber;
  minBuyAmount: BigNumber;
};

export interface BrokerLegacyInterface extends utils.Interface {
  functions: {
    "MAX_AUCTION_LENGTH()": FunctionFragment;
    "auctionLength()": FunctionFragment;
    "disabled()": FunctionFragment;
    "gnosis()": FunctionFragment;
    "init(address,address,address,uint48)": FunctionFragment;
    "main()": FunctionFragment;
    "openTrade((address,address,uint256,uint256))": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "reportViolation()": FunctionFragment;
    "setAuctionLength(uint48)": FunctionFragment;
    "setDisabled(bool)": FunctionFragment;
    "setGnosis(address)": FunctionFragment;
    "setTradeImplementation(address)": FunctionFragment;
    "tradeImplementation()": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
    "version()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "MAX_AUCTION_LENGTH"
      | "auctionLength"
      | "disabled"
      | "gnosis"
      | "init"
      | "main"
      | "openTrade"
      | "proxiableUUID"
      | "reportViolation"
      | "setAuctionLength"
      | "setDisabled"
      | "setGnosis"
      | "setTradeImplementation"
      | "tradeImplementation"
      | "upgradeTo"
      | "upgradeToAndCall"
      | "version"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MAX_AUCTION_LENGTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "auctionLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "disabled", values?: undefined): string;
  encodeFunctionData(functionFragment: "gnosis", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "main", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "openTrade",
    values: [TradeRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reportViolation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAuctionLength",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setDisabled",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGnosis",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTradeImplementation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tradeImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "MAX_AUCTION_LENGTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "auctionLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "disabled", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gnosis", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "main", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "openTrade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reportViolation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAuctionLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDisabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setGnosis", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTradeImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradeImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "AuctionLengthSet(uint48,uint48)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "DisabledSet(bool,bool)": EventFragment;
    "GnosisSet(address,address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "TradeImplementationSet(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionLengthSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DisabledSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GnosisSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TradeImplementationSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface AuctionLengthSetEventObject {
  oldVal: number;
  newVal: number;
}
export type AuctionLengthSetEvent = TypedEvent<
  [number, number],
  AuctionLengthSetEventObject
>;

export type AuctionLengthSetEventFilter =
  TypedEventFilter<AuctionLengthSetEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface DisabledSetEventObject {
  prevVal: boolean;
  newVal: boolean;
}
export type DisabledSetEvent = TypedEvent<
  [boolean, boolean],
  DisabledSetEventObject
>;

export type DisabledSetEventFilter = TypedEventFilter<DisabledSetEvent>;

export interface GnosisSetEventObject {
  oldVal: string;
  newVal: string;
}
export type GnosisSetEvent = TypedEvent<[string, string], GnosisSetEventObject>;

export type GnosisSetEventFilter = TypedEventFilter<GnosisSetEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface TradeImplementationSetEventObject {
  oldVal: string;
  newVal: string;
}
export type TradeImplementationSetEvent = TypedEvent<
  [string, string],
  TradeImplementationSetEventObject
>;

export type TradeImplementationSetEventFilter =
  TypedEventFilter<TradeImplementationSetEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface BrokerLegacy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BrokerLegacyInterface;

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
    MAX_AUCTION_LENGTH(overrides?: CallOverrides): Promise<[number]>;

    auctionLength(overrides?: CallOverrides): Promise<[number]>;

    disabled(overrides?: CallOverrides): Promise<[boolean]>;

    gnosis(overrides?: CallOverrides): Promise<[string]>;

    init(
      main_: PromiseOrValue<string>,
      gnosis_: PromiseOrValue<string>,
      tradeImplementation_: PromiseOrValue<string>,
      auctionLength_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    main(overrides?: CallOverrides): Promise<[string]>;

    openTrade(
      req: TradeRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    reportViolation(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAuctionLength(
      newAuctionLength: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDisabled(
      disabled_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGnosis(
      newGnosis: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTradeImplementation(
      newTradeImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tradeImplementation(overrides?: CallOverrides): Promise<[string]>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[string]>;
  };

  MAX_AUCTION_LENGTH(overrides?: CallOverrides): Promise<number>;

  auctionLength(overrides?: CallOverrides): Promise<number>;

  disabled(overrides?: CallOverrides): Promise<boolean>;

  gnosis(overrides?: CallOverrides): Promise<string>;

  init(
    main_: PromiseOrValue<string>,
    gnosis_: PromiseOrValue<string>,
    tradeImplementation_: PromiseOrValue<string>,
    auctionLength_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  main(overrides?: CallOverrides): Promise<string>;

  openTrade(
    req: TradeRequestStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  reportViolation(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAuctionLength(
    newAuctionLength: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDisabled(
    disabled_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGnosis(
    newGnosis: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTradeImplementation(
    newTradeImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tradeImplementation(overrides?: CallOverrides): Promise<string>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    MAX_AUCTION_LENGTH(overrides?: CallOverrides): Promise<number>;

    auctionLength(overrides?: CallOverrides): Promise<number>;

    disabled(overrides?: CallOverrides): Promise<boolean>;

    gnosis(overrides?: CallOverrides): Promise<string>;

    init(
      main_: PromiseOrValue<string>,
      gnosis_: PromiseOrValue<string>,
      tradeImplementation_: PromiseOrValue<string>,
      auctionLength_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    main(overrides?: CallOverrides): Promise<string>;

    openTrade(
      req: TradeRequestStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    reportViolation(overrides?: CallOverrides): Promise<void>;

    setAuctionLength(
      newAuctionLength: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDisabled(
      disabled_: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGnosis(
      newGnosis: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTradeImplementation(
      newTradeImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tradeImplementation(overrides?: CallOverrides): Promise<string>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "AuctionLengthSet(uint48,uint48)"(
      oldVal?: PromiseOrValue<BigNumberish> | null,
      newVal?: PromiseOrValue<BigNumberish> | null
    ): AuctionLengthSetEventFilter;
    AuctionLengthSet(
      oldVal?: PromiseOrValue<BigNumberish> | null,
      newVal?: PromiseOrValue<BigNumberish> | null
    ): AuctionLengthSetEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;

    "DisabledSet(bool,bool)"(
      prevVal?: PromiseOrValue<boolean> | null,
      newVal?: PromiseOrValue<boolean> | null
    ): DisabledSetEventFilter;
    DisabledSet(
      prevVal?: PromiseOrValue<boolean> | null,
      newVal?: PromiseOrValue<boolean> | null
    ): DisabledSetEventFilter;

    "GnosisSet(address,address)"(
      oldVal?: PromiseOrValue<string> | null,
      newVal?: PromiseOrValue<string> | null
    ): GnosisSetEventFilter;
    GnosisSet(
      oldVal?: PromiseOrValue<string> | null,
      newVal?: PromiseOrValue<string> | null
    ): GnosisSetEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "TradeImplementationSet(address,address)"(
      oldVal?: PromiseOrValue<string> | null,
      newVal?: PromiseOrValue<string> | null
    ): TradeImplementationSetEventFilter;
    TradeImplementationSet(
      oldVal?: PromiseOrValue<string> | null,
      newVal?: PromiseOrValue<string> | null
    ): TradeImplementationSetEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
  };

  estimateGas: {
    MAX_AUCTION_LENGTH(overrides?: CallOverrides): Promise<BigNumber>;

    auctionLength(overrides?: CallOverrides): Promise<BigNumber>;

    disabled(overrides?: CallOverrides): Promise<BigNumber>;

    gnosis(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      main_: PromiseOrValue<string>,
      gnosis_: PromiseOrValue<string>,
      tradeImplementation_: PromiseOrValue<string>,
      auctionLength_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    main(overrides?: CallOverrides): Promise<BigNumber>;

    openTrade(
      req: TradeRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    reportViolation(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAuctionLength(
      newAuctionLength: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDisabled(
      disabled_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGnosis(
      newGnosis: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTradeImplementation(
      newTradeImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tradeImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_AUCTION_LENGTH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    auctionLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    disabled(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gnosis(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      main_: PromiseOrValue<string>,
      gnosis_: PromiseOrValue<string>,
      tradeImplementation_: PromiseOrValue<string>,
      auctionLength_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    main(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    openTrade(
      req: TradeRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reportViolation(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAuctionLength(
      newAuctionLength: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDisabled(
      disabled_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGnosis(
      newGnosis: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTradeImplementation(
      newTradeImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tradeImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
