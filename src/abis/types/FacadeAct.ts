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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface FacadeActInterface extends utils.Interface {
  functions: {
    "claimRewards(address)": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "nextRecollateralizationAuction(address)": FunctionFragment;
    "revenueOverview(address)": FunctionFragment;
    "runRevenueAuctions(address,address[],address[],uint8)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimRewards"
      | "multicall"
      | "nextRecollateralizationAuction"
      | "revenueOverview"
      | "runRevenueAuctions"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimRewards",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "nextRecollateralizationAuction",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revenueOverview",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "runRevenueAuctions",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextRecollateralizationAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revenueOverview",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "runRevenueAuctions",
    data: BytesLike
  ): Result;

  events: {};
}

export interface FacadeAct extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FacadeActInterface;

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
    claimRewards(
      rToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nextRecollateralizationAuction(
      bm: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revenueOverview(
      revenueTrader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    runRevenueAuctions(
      revenueTrader: PromiseOrValue<string>,
      toSettle: PromiseOrValue<string>[],
      toStart: PromiseOrValue<string>[],
      kind: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  claimRewards(
    rToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multicall(
    data: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nextRecollateralizationAuction(
    bm: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revenueOverview(
    revenueTrader: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  runRevenueAuctions(
    revenueTrader: PromiseOrValue<string>,
    toSettle: PromiseOrValue<string>[],
    toStart: PromiseOrValue<string>[],
    kind: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimRewards(
      rToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    nextRecollateralizationAuction(
      bm: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, string, BigNumber] & {
        canStart: boolean;
        sell: string;
        buy: string;
        sellAmount: BigNumber;
      }
    >;

    revenueOverview(
      revenueTrader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string[], boolean[], BigNumber[], BigNumber[]] & {
        erc20s: string[];
        canStart: boolean[];
        surpluses: BigNumber[];
        minTradeAmounts: BigNumber[];
      }
    >;

    runRevenueAuctions(
      revenueTrader: PromiseOrValue<string>,
      toSettle: PromiseOrValue<string>[],
      toStart: PromiseOrValue<string>[],
      kind: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    claimRewards(
      rToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nextRecollateralizationAuction(
      bm: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revenueOverview(
      revenueTrader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    runRevenueAuctions(
      revenueTrader: PromiseOrValue<string>,
      toSettle: PromiseOrValue<string>[],
      toStart: PromiseOrValue<string>[],
      kind: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimRewards(
      rToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nextRecollateralizationAuction(
      bm: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revenueOverview(
      revenueTrader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    runRevenueAuctions(
      revenueTrader: PromiseOrValue<string>,
      toSettle: PromiseOrValue<string>[],
      toStart: PromiseOrValue<string>[],
      kind: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
