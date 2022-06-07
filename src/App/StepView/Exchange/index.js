import { fetchRates } from 'redux/reducers/exchange'
import { Dropdown, Button, Input } from 'App/components'

import { checkAmountLength } from 'App/components/Input'

import * as TYPE from 'redux/actions/types'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect, useMemo },
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS

const RATES_ERROR = 'Couldn\'t get rate for this pair. Try another amount.'
const AMOUNT_ERROR = 'insufficient funds'

const AbortContorller = window.AbortController

export default function Exchange({ currentStep }) {
  const {
    fromAmount,
    fromAccount,
    accountsList = [],
    coinsList = [],
    toCoin,
    toAddress,
    bestRate,
    isFindBestRate,
    isValidToAddress,
    isLoading,
    time
  } = useSelector(state => state.exchange)

  const [validationErrors, setValidationErrors] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortContorller

    if (fromAmount && toCoin.ticker) {
      dispatch(fetchRates(controller.signal))
    }

    return () => controller.abort()
  }, [fromAmount, toCoin.ticker])

  useEffect(() => {
    setValidationErrors(prevErrors => ({ ...prevErrors, amount: '' }))
  }, [toAddress, fromAmount])

  function handlePressNext() {
    const isValidAmount = fromAmount < fromAccount.balance

    setValidationErrors(prevErrors => ({
      ...prevErrors,
      amount: isFindBestRate ? isValidAmount ? '' : AMOUNT_ERROR : RATES_ERROR
    }))

    if (isValidToAddress && isFindBestRate && isValidAmount)
      dispatch({ type: TYPE.NEXT_STEP })
  }

  function handleChangeAmount(event) {
    const value = event.target.value
      .trim()
      .replace(/^0+/, '0')
      .replace(',', '.')

    if (
      isNaN(Number(value)) ||
      !checkAmountLength(value) ||
      Number(value) < 0
    ) {
      return
    }

    if (value > 1) {
      value.replace(/^0+/, '')
    }

    dispatch({
      type: TYPE.UPDATE_FROM_AMOUNT,
      amountFrom: value,
    })
    dispatch({
      type: TYPE.IS_BEST_RATE,
      isFindBestRate: false,
    })
  }

  function handleChangeAddress(event) {
    dispatch({
      type: TYPE.UPDATE_TO_ADDRESS,
      address: event.target.value,
    })
  }

  function handleChnageAccountFrom(account) {
    dispatch({
      type: TYPE.UPDATE_FROM_ACCOUNT,
      account: account,
    })
    dispatch({
      type: TYPE.UPDATE_FROM_AMOUNT,
      amountFrom: 0,
    })
  }

  function handleChangeToCoin(coin) {
    dispatch({
      type: TYPE.UPDATE_TO_COIN,
      coin: coin,
    })
    dispatch({
      type: TYPE.IS_BEST_RATE,
      isFindBestRate: false,
    })
  }

  const accountsItems = useMemo(() => accountsList.map(account => ({
    ...account,
    title: `Nexus (${account.name})`,
    description: `${account.balance} ${account.token_name}`
  })), [accountsList])

  const coinItems = useMemo(() => Array.isArray(coinsList) && coinsList.map(coin => ({
    ...coin,
    title: coin.title,
    description: coin.ticker
  })) || [], [coinsList])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Dropdown
          items={accountsItems}
          value={fromAccount}
          label='From'
          onChange={handleChnageAccountFrom}
        />
        <div className={styles.columnImg}>
          <img src="assets/arrow.svg" />
        </div>
        <Dropdown
          items={coinItems}
          value={toCoin}
          label='To'
          onChange={handleChangeToCoin}
        />
      </div>
      <Input
        label='Amount'
        value={fromAmount}
        onChange={handleChangeAmount}
        error={validationErrors.amount}
      />
      <Input
        label='Address'
        value={toAddress}
        onChange={handleChangeAddress}
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
                ? `~ ${bestRate} ${toCoin.ticker} ${time ? '( ETA: ' + time + ' min )' : ''}`
                : (
                    isLoading
                      && (<span className={styles.skeleton}></span>)
                      || `${toCoin.ticker ? '0 ' + toCoin.ticker : ''}`
                  )
            }
          </span>
        </div>
      </div>
      <br />
      <br />
      <Button
        currentStep={currentStep}
        onPress={handlePressNext}
        label='Exchange'
      />
    </div>
  )
}
