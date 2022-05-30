import { fetchRate } from 'redux/reducers/exchange/exchangeInfo'

import * as TYPE from 'redux/actions/types'
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useRef, useEffect, useState },
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS

function useOutsideClick(ref, setVisible) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

function Dropdown({ elementsList, inform }) {
  const [visible, setVisible] = useState(false)

  const handleDropdown = state => {
    state ? setVisible(false) : setVisible(true)
  }
  const ref = useRef(null)
  useOutsideClick(ref, setVisible)

  const queryId = new Date().getTime().toString()

  const { fromAmount, partnersList } = useSelector(state => state.exchange.exchangeInfo)
  const dispatch = useDispatch()

  const handleElement = elem => {
    if (inform.ticker) {
      dispatch({
        type: TYPE.UPDATE_TO_COIN,
        coin: elem,
      })
      dispatch({
        type: TYPE.IS_BEST_RATE,
        isFindBestRate: false,
      })
      dispatch({
        type: TYPE.UPDATE_RATE,
        rate: 0,
      })
      dispatch({
        type: TYPE.IS_LOADING,
        isLoading: 0,
      })

      partnersList.forEach((partner, index) => {
        dispatch(
          fetchRate(
            {
              partner: partner.id,
              amount: fromAmount,
              from: 'nxs',
              to: elem.ticker,
              queryId,
            },
            partner,
            index,
          ),
        )
      })
    } else {
      dispatch({
        type: TYPE.UPDATE_FROM_ACCOUNT,
        account: elem,
      })
      dispatch({
        type: TYPE.UPDATE_RATE,
        rate: 0,
      })
      dispatch({
        type: TYPE.UPDATE_FROM_AMOUNT,
        amountFrom: 0,
      })
    }
  }

  return (
    <div className={styles.column}>
      <span>From</span>
      <div className={styles.inform} onClick={() => handleDropdown(visible)} ref={ref}>
        <span className={visible ? styles.inform__up : styles.inform__down}></span>
        <span> {inform.name ? `Nexus (${inform.name})` : inform.title} </span>
        <span className={styles.amount}> {inform.balance >= 0 ? `${inform.balance} ${inform.token_name}` : null} </span>
        <ul className={visible ? styles.dropdown : styles.hide}>
          {elementsList.length ? (
            elementsList.map(elem => (
              <li className={styles.dropdown__elem} onClick={() => handleElement(elem)}>
                {elem.name ? <span>{`Nexus (${elem.name})`}</span> : <span>{elem.title}</span>}
                <span className={styles.amount}>
                  {elem.balance} {elem.token_name}
                </span>
              </li>
            ))
          ) : (
            <li className={styles.dropdown__elemNotFound}>
              <span>Elements not found</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
