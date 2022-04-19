import * as TYPE from 'actions/types';

const initialState = {
  fromAmount: 0,
  toAmount: 0,
  toAddress: 0,
  fromAccount: {}
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

    default:
      return state;
  }
};