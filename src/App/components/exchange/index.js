import Input from '../input/input'
import Dropdown from '../dropdown'
import NavButton from '../navButton'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect },
    ReactRedux: { useSelector },
  },
} = NEXUS

const RATES_ERROR = 'Couldn\'t get rate for this pair. Try another amount.'
const ADDRESS_ERROR = 'Address is invalid'

function Exchange({ toGo, step }) {
  const {
    fromAmount,
    fromAccount,
    accountsList,
    coinsList,
    toCoin,
    toAddress,
    bestRate,
    isFindBestRate,
    isValidToAddress
  } = useSelector(state => state.exchange.exchangeInfo)

  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    setValidationErrors(prevErrors => ({ ...prevErrors, amount: '', address: '' }))
  }, [toAddress, fromAmount])

  function handlePressNext (...args) {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      address: isValidToAddress ? '' : ADDRESS_ERROR,
      amount: isFindBestRate ? '' : RATES_ERROR
    }))

    if (isValidToAddress && isFindBestRate) toGo(...args)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Dropdown elementsList={accountsList} inform={fromAccount} />
        <div className={styles.columnImg}>
          <svg width='13' height='8' viewBox='0 0 13 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.97631 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM2.18557e-08 4.5L12 4.5L12 3.5L-2.18557e-08 3.5L2.18557e-08 4.5Z'
              fill='#E4E4E4'
            />
          </svg>
        </div>
        <Dropdown elementsList={coinsList} inform={toCoin} />
      </div>
      <Input
        value={fromAmount}
        text='Amount'
        error={validationErrors.amount}
      />
      <Input
        value={toAddress}
        text='Address'
        error={validationErrors.address}
      />
      <div className={styles.container}>
        <div className={styles.item}>
          <span>Available</span>
          <span className={styles.amount}>
            {fromAccount.balance} {fromAccount.token_name}
          </span>
        </div>
        <div className={styles.item}>
          <span>Receive</span>
          <span className={styles.amount}>
            {
              isFindBestRate
                ? `${bestRate} ${toCoin.ticker}`
                : <span className={styles.skeleton}></span>
            }
          </span>
        </div>
      </div>

      <NavButton step={step} toGo={handlePressNext} />
    </div>
  )
}

export default Exchange
