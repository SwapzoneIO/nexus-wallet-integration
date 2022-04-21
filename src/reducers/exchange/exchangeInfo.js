import axios from 'axios'
import * as TYPE from 'actions/types';

const {
  utilities: {
    apiCall,
  }
} = NEXUS;

const initialState = {
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
  partnersList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
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

export const fetchRate = (params) => async (dispatch, getState) => {
  const { data: response } = await api.get('/v1/exchange/rate', { params })
  const { exchange } = getState()
  const { exchangeInfo } = exchange
  const { bestRate } = exchangeInfo

  if (response.rate && Number(response.rate) > bestRate) {
    dispatch({
      type: TYPE.UPDATE_RATE,
      rate: Number(response.rate),
    })
  }
}