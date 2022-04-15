import * as TYPE from 'actions/types';

const {
    libraries: {
      React,
      ReactRedux: { useDispatch, useSelector },
    }
  } = NEXUS;

const MIN_WHOLE_LENGTH = 12


function Input () {
  const { fromAmount } = useSelector(state => state.exchange.exchangeInfo)
  const dispatch = useDispatch()

  const updateAmount = (evt) => {
    const value = evt.target.value.trim().replace(/^0+/, '').replace(',', '.')

    if (isNaN(value) || !checkAmountLength(value) || Number(value) < 0) {
      return
    }

    dispatch({
      type: TYPE.UPDATE_FROM_AMOUNT,
      amountFrom: value,
    })
  }

  const checkAmountLength = (value) => {
    const [whole, fractional] = value.split('.')
    
    if (whole.length <= MIN_WHOLE_LENGTH && !fractional) {
      return true
    }

    return whole.length <= MIN_WHOLE_LENGTH
  }

  return (
    <>
      <input type="text" value={fromAmount} onChange={updateAmount}/>
    </>
  )
}

export default Input
