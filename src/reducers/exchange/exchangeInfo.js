import * as TYPE from 'actions/types';

const initialState = {
  fromAmount: 0,
  toAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.UPDATE_FROM_AMOUNT: {
      return {
        fromAmount: action.amountFrom,
      };
    }
    case TYPE.UPDATE_TO_AMOUNT: {
      return {
        toAmount: action.amountTo,
      };
    }

    default:
      return state;
  }
};