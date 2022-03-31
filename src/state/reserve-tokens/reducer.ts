import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveToken } from 'types'

export interface ReserveTokenState {
  list: { [x: string]: ReserveToken }
  current: string | null
  balances: { [x: string]: number }
}

const initialState: ReserveTokenState = {
  list: {},
  // TODO: dev only
  current: '0x4E0C596bE5FE217cB80AeB4C47C72701DFF0F6BC',
  // Represent balances for the CONNECTED account only
  // This balances are fetched from the chain
  balances: {},
}

export const reserveTokenSlice = createSlice({
  name: 'reserveTokens',
  initialState,
  reducers: {
    // TODO: Typings
    loadTokens: (
      state,
      action: PayloadAction<{ [x: string]: ReserveToken }>
    ) => {
      state.list = action.payload
    },
    updateBalance: (state, action: PayloadAction<{ [x: string]: number }>) => {
      state.balances = { ...state.balances, ...action.payload }
    },
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload
    },
  },
})

export const selectCurrentRToken = createSelector(
  (state: any) => [state.reserveTokens.current, state.reserveTokens.list],
  ([current, list]): ReserveToken | null => (current ? list[current] : null)
)

// Returns an aggregate of the current rToken balance + collaterals balance
// Useful for reacting to non-specific balance changes
export const selectBalanceAggregate = createSelector(
  selectCurrentRToken,
  (state: any) => state.reserveTokens.balances,
  (rToken, balances): { value: number } => {
    if (!rToken) {
      return { value: 0 }
    }

    const addresses: string[] = [
      rToken.token.address,
      ...rToken.basket.collaterals.map((c) => c.token.address),
    ]

    return addresses.reduce(
      (prev: any, current: any) => {
        prev.value += balances[current] || 0
        return prev
      },
      { value: 0 }
    )
  }
)

// Get top 5 tokens including the selected token on top
// TODO: Proposal - Only display tokens made by Reserve on this list
export const selectTopTokens = createSelector(
  (state: any) => [state.reserveTokens.current, state.reserveTokens.list],
  (params) => {
    const [current, list] = <[string, ReserveTokenState['list']]>params
    const result: ReserveToken[] = []

    if (!list || !Object.keys(list).length) {
      return result
    }

    if (!list[current]) {
      return Object.values(list).slice(0, 5)
    }

    return [
      <ReserveToken>list[current],
      ...Object.values(list)
        .reduce<ReserveToken[]>((prev, curr): ReserveToken[] => {
          if (curr.id === current) {
            return prev
          }

          return [...prev, curr]
        }, [])
        .slice(0, 4),
    ]
  }
)

export const { loadTokens, updateBalance, setCurrent } =
  reserveTokenSlice.actions

export default reserveTokenSlice.reducer
