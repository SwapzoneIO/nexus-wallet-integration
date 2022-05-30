import { steps } from 'redux/reducers/exchange/exchangeInfo'
import StatusLine from '../statusTransaction'
import NavButton from '../navButton'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    ReactRedux: { useSelector },
  },
} = NEXUS

function Details({ toGo, step }) {
  const { fromAmount, fromAccount, bestRate, toAddress, toCoin } = useSelector(state => state.exchange.exchangeInfo)

  return (
    <div className={styles.wrapper}>
      <table>
        <tr>
          <td className={styles.left}> From </td>
          <td className={styles.right}>
            <span>
              
              {fromAccount.name} {fromAccount.token_name}
            </span>
            <span className={styles.address}> {fromAccount.address} </span>
          </td>
        </tr>
        <tr>
          <td className={styles.left}> To </td>
          <td className={styles.right}>
            <span> {toCoin.title} </span> <span className={styles.address}> {toAddress} </span>
          </td>
        </tr>
        <tr>
          <td className={styles.left}> To be exchanged </td>
          <td className={styles.right}>
            
            {fromAmount} {fromAccount.token_name}
          </td>
        </tr>
        <tr>
          <td className={styles.left}> Will receive </td>
          <td className={styles.right}>
            
            {bestRate} {toCoin.ticker}
          </td>
        </tr>
      </table>
      {step === steps.waitingExchange ? <StatusLine /> : null}
      <NavButton step={step} toGo={toGo} />
    </div>
  )
}

export default Details
