import { fetchRate } from 'reducers/exchange/exchangeInfo';
import * as TYPE from 'actions/types';

import styles from './styles.module.scss';

const {
    libraries: {
      React,
      ReactRedux: { useDispatch, useSelector },
    }
  } = NEXUS;

const MIN_WHOLE_LENGTH = 12

function Input ({ value, text }) {
  const queryId = new Date().getTime().toString()
  const { fromAccount: { balance }, partnersList, toCoin } = useSelector(state => state.exchange.exchangeInfo)
  const dispatch = useDispatch()

  const updateAmount = (evt) => {
    if (text.toLowerCase() === 'amount'){
      const value = evt.target.value.trim().replace(/^0+/, '0').replace(',', '.')

      if (isNaN(value) || !balance || !checkAmountLength(value) || Number(value) < 0 || Number(value) > Number(balance)
      ) {
        return
      }

      if (value > 1) {
        value.replace(/^0+/, '')
      }
      dispatch({
        type: TYPE.IS_LOADING, 
        isLoading: 0
      })
      dispatch({
        type: TYPE.UPDATE_FROM_AMOUNT,
        amountFrom: value,
      })
      dispatch({
        type: TYPE.IS_BEST_RATE, 
        isFindBestRate: false
      })
      dispatch({
        type: TYPE.UPDATE_RATE, 
        rate: 0
      })      
      partnersList.forEach((partner, index) => {
        dispatch(fetchRate({
          partner: partner.id,
          amount: value,
          from: "nxs",
          to: toCoin.ticker,
          queryId,
        }, partner, index))
      })

    } else if (text.toLowerCase() === 'address'){
      dispatch({
        type: TYPE.UPDATE_TO_ADDRESS,
        address: evt.target.value,
      })
      dispatch({
        type: TYPE.SAVE_TRANSACTION,
        tx: '',
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
    <div className={styles.container}>
      <div className={styles.column}>
        <span>{text}</span>
        <input type="text" value={value} onChange={updateAmount}/>
      </div>
    </div>
  )
}

export default Input
