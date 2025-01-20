import TokenLogo from '@/components/token-logo'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { chainIdAtom } from '@/state/atoms'
import { Token } from '@/types'
import { formatPercentage } from '@/utils'
import { atom, useAtom, useAtomValue } from 'jotai'
import { formatUnits } from 'viem'
import {
  proposedIndexBasketAtom,
  proposedInxexTradesAtom,
  tradeVolatilityAtom,
} from '../atoms'
import { ProposedTrade } from '../utils/get-rebalance-trades'

type ProposedTradeWithMeta = ProposedTrade & {
  index: number
  token: Token
}

type SellData = {
  token: Token
  amount: bigint
  percent: number
  shares: string
}

type IProposedTradeGroup = {
  sell: SellData
  trades: ProposedTradeWithMeta[]
}

type OrganizedTrades = Record<string, IProposedTradeGroup>

const organizedTradesAtom = atom((get) => {
  const basket = get(proposedIndexBasketAtom)
  const trades = get(proposedInxexTradesAtom)

  if (!basket || !trades) return undefined

  // Group trades by sell token
  return trades.reduce((acc, trade, index) => {
    if (!acc[trade.sell]) {
      acc[trade.sell] = {
        trades: [],
        sell: {
          token: basket[trade.sell].token,
          amount: 0n,
          percent: 0,
          shares: basket[trade.sell].currentShares,
        },
      }
    }

    acc[trade.sell].trades.push({
      ...trade,
      index,
      token: basket[trade.buy].token,
    })
    acc[trade.sell].sell.amount += trade.sellLimit
    acc[trade.sell].sell.percent = Number(
      formatUnits(
        (basket[trade.sell].balance / acc[trade.sell].sell.amount) * 100n,
        basket[trade.sell].token.decimals
      )
    )

    console.log('sell', {
      balance: basket[trade.sell].balance,
      amount: acc[trade.sell].sell.amount,
    })

    return acc
  }, {} as OrganizedTrades)
})

const Row = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('grid grid-cols-[248px_auto] gap-2', className)}>
      {children}
    </div>
  )
}

const VOLATILITY_OPTIONS = ['Low', 'Medium', 'High']

const ProposedTradeVolatility = ({ index }: { index: number }) => {
  const [volatility, setVolatility] = useAtom(tradeVolatilityAtom)

  return (
    <ToggleGroup
      type="single"
      className="bg-muted-foreground/10 p-1 rounded-xl text-sm"
      value={volatility[index]?.toString() || '0'}
      onValueChange={(value) => {
        setVolatility((prev) => {
          const newVolatility = [...prev]
          newVolatility[index] = Number(value)
          return newVolatility
        })
      }}
    >
      {VOLATILITY_OPTIONS.map((option, index) => (
        <ToggleGroupItem
          key={option}
          value={index.toString()}
          className="px-2 h-8 whitespace-nowrap rounded-lg data-[state=on]:bg-card text-secondary-foreground/80 data-[state=on]:text-primary"
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

const ProposedTradeItem = ({
  trade,
  className,
}: {
  trade: ProposedTradeWithMeta
  className?: string
}) => {
  const chainId = useAtomValue(chainIdAtom)

  return (
    <div className={cn('flex gap-2 items-center py-4 pl-2', className)}>
      <TokenLogo chain={chainId} address={trade.token.address} />
      <div className="mr-auto text-primary">
        <span>Buy {trade.token.symbol}</span>
        <h4 className="text-xl font-bold">{formatPercentage(2)}</h4>
      </div>
      <ProposedTradeVolatility index={trade.index} />
    </div>
  )
}

const ProposedTradeSold = ({
  sell,
  multiple,
}: {
  sell: SellData
  multiple: boolean
}) => {
  const chainId = useAtomValue(chainIdAtom)

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 rounded-xl bg-destructive/10 text-destructive p-4',
        !multiple ? 'items-center' : undefined
      )}
    >
      <div className={multiple ? 'w-52' : undefined}>
        <TokenLogo chain={chainId} address={sell.token?.address} size="lg" />
      </div>
      <div className="flex flex-col justify-end flex-grow">
        <h3 className="text-sm">Sell ${sell.token.symbol}</h3>
        <div className="flex items-center gap-2">
          <h4 className="text-xl font-bold mr-auto">
            {formatPercentage(sell.percent)}
          </h4>
          <span className="text-sm">
            From {formatPercentage(Number(sell.shares))} to{' '}
            {formatPercentage(Number(sell.shares) - sell.percent)}
          </span>
        </div>
      </div>
    </div>
  )
}

const ProposedTradeGroup = ({ group }: { group: IProposedTradeGroup }) => (
  <Row className="border-b p-2">
    <ProposedTradeSold sell={group.sell} multiple={group.trades.length > 1} />
    <div className="flex flex-col">
      {group.trades.map((trade, index) => (
        <ProposedTradeItem
          key={index}
          trade={trade}
          className={index ? 'border-t' : undefined}
        />
      ))}
    </div>
  </Row>
)

const ProposalTradesSetup = () => {
  const organizedTrades = useAtomValue(organizedTradesAtom)

  return (
    <div className="flex flex-col gap-2">
      <Row>
        <div className="p-4 text-legend">Selling</div>
        <div className="flex items-center p-4 flex-grow border-b text-legend">
          <span>Buying</span>
          <span className="ml-auto">Expected volatility</span>
        </div>
      </Row>
      {!!organizedTrades &&
        Object.keys(organizedTrades).map((key) => (
          <ProposedTradeGroup key={key} group={organizedTrades[key]} />
        ))}
    </div>
  )
}

export default ProposalTradesSetup
