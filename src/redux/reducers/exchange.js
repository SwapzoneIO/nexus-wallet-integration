import axios from 'axios'
import * as TYPE from 'redux/actions/types'

export const steps = [
  'chooseCurrencies',
  'confirmExchange',
  'waitingExchange'
]

export const stepTitles = [
  'Exchange with Swapzone',
  'Exchange details confirmation',
  'Exchange confirmed'
]


const {
  utilities: { apiCall, sendNXS },
} = NEXUS

const initialState = {
  step: 0,
  isFindBestRate: false,
  isLoading: false,
  fromAmount: '',
  fromAccount: {},
  toAddress: '',
  toCoin: {},
  accountsList: [],
  coinsList: {
    title: '',
    ticker: '',
  },
  bestRate: 0,
  partnersList: [],
  partner: '',
  tx: '',
  send: '',
  isValidToAddress: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.IS_BEST_RATE: {
      return {
        ...state,
        isFindBestRate: action.isFindBestRate,
      }
    }
    case TYPE.IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    case TYPE.UPDATE_FROM_AMOUNT: {
      return {
        ...state,
        fromAmount: action.amountFrom,
      }
    }
    case TYPE.UPDATE_FROM_ACCOUNT: {
      return {
        ...state,
        fromAccount: action.account,
      }
    }
    case TYPE.UPDATE_TO_ADDRESS: {
      return {
        ...state,
        toAddress: action.address,
        isValidToAddress: action.address.length > 12
      }
    }
    case TYPE.UPDATE_ACCOUNTS: {
      return {
        ...state,
        accountsList: action.accounts,
      }
    }
    case TYPE.UPDATE_COINS: {
      return {
        ...state,
        coinsList: action.coins,
      }
    }
    case TYPE.UPDATE_TO_COIN: {
      return {
        ...state,
        toCoin: action.coin,
      }
    }
    case TYPE.UPDATE_RATE: {
      return {
        ...state,
        bestRate: action.rate,
      }
    }
    case TYPE.UPDATE_PARTNERS: {
      return {
        ...state,
        partnersList: action.partners,
      }
    }
    case TYPE.UPDATE_QUOTA_ID: {
      return {
        ...state,
        partner: action.partner,
      }
    }
    case TYPE.SAVE_TRANSACTION: {
      return {
        ...state,
        tx: action.tx,
      }
    }
    case TYPE.SEND_TRANSACTION: {
      return {
        ...state,
        send: action.send,
      }
    }
    case TYPE.IS_VALID_TO_ADDRESS: {
      return {
        ...state,
        isValidToAddress: action.isValidToAddress
      }
    }
    case TYPE.NEXT_STEP: {
      return {
        ...state,
        step: state.step + 1
      }
    }
    case TYPE.PREVIOUS_STEP: {
      return {
        ...state,
        step: state.step - 1
      }
    }
    default:
      return state
  }
}

const api = axios.create({
  baseURL: 'https://api.swapzone.io',
  headers: {
    'x-api-key': 'DoZLClkWE',
  },
})

export const fetchAccounts = async dispatch => {
  const response = await apiCall('users/list/accounts')

  const account = response[0]

  dispatch({
    type: TYPE.UPDATE_ACCOUNTS,
    accounts: response,
  })
  dispatch({
    type: TYPE.UPDATE_FROM_ACCOUNT,
    account: {
      ...account,
      title: `Nexus (${account.name})`,
      description: `${account.balance} ${account.token_name}`
    },
  })
}

export const fetchCoins = async dispatch => {
  const { data: response } = await api.get('/v1/internal/get-currencies')

  const resModify = Object.values(response)
    .map(values => {
      return values.map(coin => ({
        title: coin.title,
        ticker: coin.ticker,
      }))
    }).flat()

  dispatch({
    type: TYPE.UPDATE_COINS,
    coins: resModify,
  })
  dispatch({
    type: TYPE.UPDATE_TO_COIN,
    coin: { ...resModify[0], description: resModify[0].ticker },
  })
}

export const fetchPartners = async dispatch => {
  const { data: response } = await api.get(`/v1/internal/partners?supported=true`)

  dispatch({
    type: TYPE.UPDATE_PARTNERS,
    partners: response.partners,
  })
}

export const fetchRates = signal => async (dispatch, getState) => {
  const queryId = new Date().getTime().toString()

  const {
    exchange: {
      partnersList,
      fromAmount: amount,
      toCoin
    }
  } = getState()

  try {
    dispatch({ type: TYPE.IS_LOADING, isLoading: true })
    const rates = await Promise.all(partnersList.map(async partner => {
      const params = {
        from: 'nxs',
        partner: partner.id,
        to: toCoin.ticker,
      }

      const { data } = await api.get('/v1/exchange/rate', {
        signal,
        params: { ...params, amount, queryId }
      })
      const { data: limit } = await api.get('/v1/exchange/limits', { signal, params })

      return { partner, data, limit }
    }))
    dispatch({ type: TYPE.IS_LOADING, isLoading: false })

    const bestRate = rates.filter(rate => !rate.data.error
      && !!Number(rate.data.rate)
      && rate.limit.limitPromises
      && Number(rate.limit.limitPromises.min) < amount
    ).sort(
      (a, b) => a.data.rate < b.data.rate ? 1 : -1
    )[0]

    if (bestRate) {
      dispatch({
        type: TYPE.UPDATE_RATE,
        rate: Number(bestRate.data.rate),
      })
      dispatch({
        type: TYPE.UPDATE_QUOTA_ID,
        partner: bestRate.partner,
      })
      dispatch({
        type: TYPE.IS_BEST_RATE,
        isFindBestRate: true,
      })
    }
  } catch (ignore) {}
}

export const createTransaction = async (dispatch, getState) => {
  const { exchange } = getState()
  const { partner, toCoin, fromAmount, fromAccount, toAddress } = exchange

  try {
    dispatch({ type: TYPE.IS_LOADING, isLoading: true })

    const response = await api.post('/v1/exchange/create', {
      quotaId: partner.quotaId,
      to: toCoin.ticker,
      from: 'nxs',
      amountDeposit: fromAmount,
      refundAddress: fromAccount.address,
      addressReceive: toAddress,
    })

    dispatch({ type: TYPE.IS_LOADING, isLoading: false })

    if (response.data.transaction) {
      dispatch({
        type: TYPE.SAVE_TRANSACTION,
        tx: response.data.transaction,
      })

      sendNXS(
        [{
          address: response.data.transaction.addressDeposit,
          amount: fromAmount
        }],
        'message',
        'tritium'
      )

    } else {
      dispatch({
        type: TYPE.SAVE_TRANSACTION,
        tx: response.data,
      })
    }
  } catch (ignore) { }
}
