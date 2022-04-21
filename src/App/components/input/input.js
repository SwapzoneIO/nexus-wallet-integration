import { fetchRate } from 'reducers/exchange/exchangeInfo';
import * as TYPE from 'actions/types';

const {
    libraries: {
      React,
      ReactRedux: { useDispatch, useSelector },
    }
  } = NEXUS;

const MIN_WHOLE_LENGTH = 12


function Input ({ value, type }) {
  const queryId = new Date().getTime().toString()
  const { fromAccount: { balance }, partnersList, toCoin } = useSelector(state => state.exchange.exchangeInfo)
  const dispatch = useDispatch()

  const updateAmount = (evt) => {
    if (type === 'amount'){
      const value = evt.target.value.trim().replace(/^0+/, '0').replace(',', '.')

      if (isNaN(value) || !balance || !checkAmountLength(value) || Number(value) < 0 || Number(value) > Number(balance)) {
        return
      }

      if (value > 1) {
        value.replace(/^0+/, '')
      }

      dispatch({
        type: TYPE.UPDATE_FROM_AMOUNT,
        amountFrom: value,
      })
      partnersList.forEach(partner => dispatch(fetchRate({
        partner: partner.id,
        amount: value,
        from: "nxs",
        to: toCoin.ticker,
        queryId,
      }, partner)))

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


  return (
    <input type="text" value={value} onChange={updateAmount}/>
  )
}

export default Input
