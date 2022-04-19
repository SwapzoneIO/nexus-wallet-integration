import axios from 'axios'
// import getConfig from 'next/config'
import * as TYPE from 'actions/types';

const {
  utilities: {
    apiCall,
  }
} = NEXUS;

const initialState = {
  fromAmount: 0,
  fromAccount: {},
  accountsFrom: [],
  toAmount: 0,
  toAddress: '',
  toCoin: '',
  coinsList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.UPDATE_FROM_AMOUNT: {
      return {  
        ...state,
        fromAmount: action.amountFrom,
      };
    }
    case TYPE.UPDATE_TO_AMOUNT: {
      return {
        ...state,
        toAmount: action.amountTo,
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
        accountsFrom: action.accounts,
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

// const { publicRuntimeConfig } = getConfig()

const api = axios.create({
  baseURL: 'https://api.swapzone.io',
  headers: {
    'x-api-key': 'DoZLClkWE',
  },
})

export const fetchCoins = async (dispatch) => {
  const { data: response } = await api.get('/v1/internal/get-currencies')

  const resModify =  Object.values(response).map(values => {
    return values.map(coin => coin.title)
  }).reduce((acc, nextCoin) => acc.concat(nextCoin))

  dispatch({
    type: TYPE.UPDATE_COINS,
    coins: resModify,
  })
  dispatch({
    type: TYPE.UPDATE_TO_COIN,
    coin: resModify[0],
  })
}