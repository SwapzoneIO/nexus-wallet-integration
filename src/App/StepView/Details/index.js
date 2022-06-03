import { Button } from 'App/components'
import { createTransaction } from 'redux/reducers/exchange'

import * as TYPE from 'redux/actions/types'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS

export default function Details({ currentStep }) {

  const {
    fromAccount: {
      name,
      token_name,
      address: fromAddress
    },
    fromAmount,
    toCoin,
    bestRate,
    toAddress,
    tx,
    isLoading
  } = useSelector(state => state.exchange)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch({ type: TYPE.SAVE_TRANSACTION, tx: '' })
    }
  }, [])

  function handlePressConfirm () {
    dispatch(createTransaction)
  }

  function handlePressBack () {
    dispatch({ type: TYPE.PREVIOUS_STEP })
  }

  return (
    <div className={styles.wrapper}>
      <table>
        <tr>
          <td className={styles.left}> From </td>
          <td className={styles.right}>
            <span>
              {name} {token_name}
            </span>
            <span className={styles.address}> {fromAddress} </span>
          </td>
        </tr>
        <tr>
          <td className={styles.left}> To </td>
          <td className={styles.right}>
            <span> {toCoin.title} </span>
            <span className={styles.address}> {toAddress} </span>
          </td>
        </tr>
        <tr>
          <td className={styles.left}> To be exchanged </td>
          <td className={styles.right}>
            {fromAmount} {token_name}
          </td>
        </tr>
        <tr>
          <td className={styles.left}> Will receive </td>
          <td className={styles.right}>
            {bestRate} {toCoin.ticker}
          </td>
        </tr>
      </table>

      <div className={styles.buttonsContainer}>
        <Button className={styles.button} variant='text' onPress={handlePressBack}>
          <div className={styles.backButtonContent}>
            <img src='assets/arrowCircleLeft.svg' />
            <div className={styles.backLabel}>Back</div>
          </div>
        </Button>
        <Button
          className={styles.button}
          onPress={handlePressConfirm}
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </div>
      {tx.error && (
        <div className={styles.error}>
          <img src='assets/alert.svg' />
          <span>
            Address receive is incorrect.
            <br />
            Try another address.
          </span>
        </div>
      ) || null}
    </div>
  )
}
