import * as TYPE from 'actions/types';

const {
    libraries: {
      React,
      ReactRedux: { useDispatch, useSelector },
    }
  } = NEXUS;

const MIN_WHOLE_LENGTH = 12


function Input ({type}) {
  const { fromAmount, fromAccount: { balance }, toAddress } = useSelector(state => state.exchange.exchangeInfo)
  const dispatch = useDispatch()

  const updateAmount = (evt) => {
    if (type === 'amount'){
      const value = evt.target.value.trim().replace(/^0+/, '0').replace(',', '.')

      if (isNaN(value) || !checkAmountLength(value) || Number(value) < 0 || Number(value) > Number(balance)) {
        return
      }

      if (value > 1) {
        value.replace(/^0+/, '')
      }

      dispatch({
        type: TYPE.UPDATE_FROM_AMOUNT,
        amountFrom: value,
      })
    } else if (type === 'address'){
      dispatch({
        type: TYPE.UPDATE_TO_ADDRESS,
        address: evt.target.value,
      })
    }

  }

  const checkAmountLength = (value) => {
    const [whole, fractional] = value.split('.')

    if (whole.length <= MIN_WHOLE_LENGTH && !fractional) {
      return true
    }

    return whole.length <= MIN_WHOLE_LENGTH
  }

  if (type === 'amount'){
    return (
      <input type="text" value={fromAmount} onChange={updateAmount}/>
    )
  } else if (type === 'address'){
    return (
      <input type="text" value={toAddress} onChange={updateAmount}/>
    )
  }
}

export default Input
