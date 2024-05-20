import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { colors } from 'theme'
import { Box, Card, Text } from 'theme-ui'
import { formatCurrency } from 'utils'
import { NETWORKS, capitalize } from 'utils/constants'
import useHistoricalTVL from '../hooks/useHistoricalTVL'

const COLORS: Record<string, any> = {
  ethereum: {
    fill: colors.primary,
    stroke: colors.primary,
    // stroke: '#3B3B3B',
  },
  base: {
    fill: colors.primary,
    stroke: colors.primary,
    // stroke: '#1552F0',
  },
  arbitrum: {
    fill: colors.primary,
    stroke: colors.primary,
    // stroke: '#162B4E',
  },
}

function CustomTooltip({ payload, label, active }: any) {
  if (!active || !payload) return null

  const total = payload?.reduce(
    (acc: number, item: { value: number }) => acc + item.value,
    0
  )

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid',
        borderColor: 'border',
        background: 'cardAlternative',
      }}
    >
      <Text>{new Date(label).toDateString()}</Text>
      {(payload as any[]).map(
        (item: { name: string; value: number }, index) => (
          <Box key={`${item.name}${item.value}${index}`}>
            <Text>
              {capitalize(item.name)}: ${formatCurrency(item.value, 0)}
            </Text>
          </Box>
        )
      )}
      <Text>Total: ${formatCurrency(total, 0)}</Text>
    </Card>
  )
}

const HistoricalTVL = () => {
  const data = useHistoricalTVL()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        height={400}
        data={data}
        margin={{
          right: 10,
          left: 10,
        }}
      >
        <XAxis dataKey="day" style={{ display: 'none' }} />
        <Tooltip content={<CustomTooltip />} />
        {Object.keys(NETWORKS).map((network) => (
          <Area
            key={network}
            type="monotone"
            dataKey={network}
            stackId="1"
            stroke={COLORS[network].stroke}
            fill={COLORS[network].fill}
            fillOpacity="1"
            activeDot={{ r: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default HistoricalTVL
