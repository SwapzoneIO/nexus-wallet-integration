import axios from 'axios'
import * as TYPE from 'actions/types';

const {
  utilities: {
    apiCall,
    sendNXS,
  }
} = NEXUS;

const initialState = {
  isFindBestRate: false,
  isLoading: 0,
  fromAmount: 0,
  fromAccount: {},
  toAddress: '',
  toCoin: {},
  accountsList: [],
  coinsList: {
    title: '',
    ticker: ''
  },
  bestRate: 0,
  partnersList: [],
  tx: '',
  partner: '',
  send: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.IS_BEST_RATE: {
      return {  
        ...state,
        isFindBestRate: action.isFindBestRate,
      };
    }
    case TYPE.IS_LOADING: {
      return {  
        ...state,
        isLoading: action.isLoading,
      };
    }
    case TYPE.UPDATE_FROM_AMOUNT: {
      return {  
        ...state,
        fromAmount: action.amountFrom,
      };
    }
    case TYPE.UPDATE_FROM_ACCOUNT: {
      return {
        ...state,
        fromAccount: action.account,
      };
    }
    case TYPE.UPDATE_TO_ADDRESS: {
      return {
        ...state,
        toAddress: action.address,
      };
    }
    case TYPE.UPDATE_ACCOUNTS: {
      return {
        ...state,
        accountsList: action.accounts,
      };
    }
    case TYPE.UPDATE_COINS: {
      return {
        ...state,
        coinsList: action.coins,
      };
    }
    case TYPE.UPDATE_TO_COIN: {
      return {
        ...state,
        toCoin: action.coin,
      };
    }
    case TYPE.UPDATE_RATE: {
      return {
        ...state,
        bestRate: action.rate,
    }}
    case TYPE.UPDATE_PARTNERS: {
      return {
        ...state,
        partnersList: action.partners,
      };
    }
    case TYPE.UPDATE_QUOTA_ID: {
      return {
        ...state,
        partner: action.partner,
      };
    }
    case TYPE.SAVE_TRANSACTION: {
      return {
        ...state,
        tx: action.tx,
      };
    }
    case TYPE.SEND_TRANSACTION: {
      return {
        ...state,
        send: action.send,
      };
    }
    default:
      return state;
  }
};

export const fetchAccounts = async (dispatch) => {
  const response = await apiCall('users/list/accounts')

  dispatch({
    type: TYPE.UPDATE_ACCOUNTS,
    accounts: response,
  })
  dispatch({
    type: TYPE.UPDATE_FROM_ACCOUNT,
    account: response[0],
  })
}

const api = axios.create({
  baseURL: 'https://api.swapzone.io',
  headers: {
    'x-api-key': 'DoZLClkWE',
  },
})

export const fetchCoins = async (dispatch) => {
  const { data: response } = await api.get('/v1/internal/get-currencies')

  const resModify =  Object.values(response).map(values => {
    return values.map(coin => ({
      title: coin.title,
      ticker: coin.ticker,
    }))
  }).reduce((acc, nextCoin) => acc.concat(nextCoin))

  dispatch({
    type: TYPE.UPDATE_COINS,
    coins: resModify
  })
  dispatch({
    type: TYPE.UPDATE_TO_COIN,
    coin: resModify[0],
  })
}

export const fetchPartners = async (dispatch) => {
  const { data: response } = await api.get(`/v1/internal/partners?supported=true`)

  dispatch({
    type: TYPE.UPDATE_PARTNERS,
    partners: response.partners,
  })
}

export const fetchRate = (params, partner, countPartners) => async (dispatch, getState) => {
  const { data: response } = await api.get('/v1/exchange/rate', { params })
  const { exchange } = getState()
  const { exchangeInfo } = exchange
  const { bestRate, toCoin, fromAmount, isLoading } = exchangeInfo

  dispatch({
    type: TYPE.IS_LOADING, 
    isLoading: isLoading + countPartners
  })

  const { data: limit } = await api.get('/v1/exchange/limits', {params: {
    from: "nxs",
    partner: partner.id,
    to: toCoin.ticker
  } })

  if (response.rate && Number(response.rate) > bestRate 
    && Number(limit.limitPromises.min) < fromAmount ) {
    dispatch({
      type: TYPE.UPDATE_RATE,
      rate: Number(response.rate),
    })
    dispatch({
      type: TYPE.UPDATE_QUOTA_ID,
      partner: partner,
    })
    dispatch({
      type: TYPE.IS_BEST_RATE, 
      isFindBestRate: true
    })
  }
}

export const createTransaction = () => async (dispatch, getState) => {
  const { exchange } = getState()
  const { exchangeInfo } = exchange
  const { partner, toCoin, fromAmount, fromAccount, toAddress } = exchangeInfo

  try {
    const response = await api.post('/v1/exchange/create', { 
      quotaId: partner.quotaId,
      to: toCoin.ticker,
      from: 'nxs',
      amountDeposit: fromAmount,
      refundAddress: fromAccount.address,
      addressReceive: toAddress,
    })

    if (response.data.transaction) {
      dispatch({ 
        type: TYPE.SAVE_TRANSACTION, 
        tx: response.data.transaction
      })

      sendNXS([response.data.transaction.addressDeposit, fromAmount], 'message')
    } else {
      dispatch({ 
        type: TYPE.SAVE_TRANSACTION, 
        tx: response.data
      })
    }
    
  } catch (ignore) {
  }
}