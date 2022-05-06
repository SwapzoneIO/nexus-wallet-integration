import Input from '../input/input';
import Dropdown from '../dropdown';
import Button from '../button';

import styles from './styles.module.scss';

const {
    libraries: {
      React,
      ReactRedux: { useSelector },
    },
  } = NEXUS;

function Exchange ({ toGo, step }) {
  const { 
    fromAmount, 
    fromAccount, 
    accountsList, 
    coinsList, 
    toCoin, 
    toAddress, 
    bestRate, 
    isFindBestRate, 
    isLoading, 
    partnersList 
  } = useSelector(state => state.exchange.exchangeInfo)

  let totalAmountPartners = partnersList.reduce(function (sum, current, index) {
      return sum + index;
  }, 0)

  let loaded = (isLoading === totalAmountPartners || isLoading >= totalAmountPartners * 2) ||
  (isLoading >= totalAmountPartners && !isFindBestRate) ? true : false

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Dropdown elementsList={accountsList} inform={fromAccount} />
        <div className={styles.columnImg}>
          <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.97631 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM2.18557e-08 4.5L12 4.5L12 3.5L-2.18557e-08 3.5L2.18557e-08 4.5Z" fill="#E4E4E4"/>
          </svg>
        </div>
        <Dropdown elementsList={coinsList} inform={toCoin} />
      </div>

      <Input value={fromAmount} text="Amount"/>
      {!isFindBestRate && loaded &&
      <div className={styles.error}>
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.78365 0.720686C9.23147 -0.240229 7.76854 -0.240228 7.21636 0.720686L0.178265 12.9685C-0.348618 13.8854 0.355674 15 1.46192 15H15.5382C16.6443 15 17.3487 13.8854 16.8217 12.9685L9.78365 0.720686ZM9.376 5.02329C9.376 4.64329 9.04921 4.33524 8.64607 4.33524H8.3541C7.95097 4.33524 7.62416 4.64329 7.62416 5.02329V9.76744C7.62416 10.1475 7.95097 10.4555 8.3541 10.4555H8.64607C9.0492 10.4555 9.376 10.1475 9.376 9.76744V5.02329ZM9.376 12.2117C9.376 11.8317 9.04921 11.5237 8.64607 11.5237H8.3541C7.95097 11.5237 7.62416 11.8317 7.62416 12.2117V12.2478C7.62416 12.6277 7.95097 12.9358 8.3541 12.9358H8.64607C9.0492 12.9358 9.376 12.6277 9.376 12.2478V12.2117Z" fill="#E8168D"/>
          </svg>
          <span> Couldn’t get rate for this pair. Try another amount. </span>
      </div>}

      <Input value={toAddress} text="Address"/>

      <div className={styles.container}>
        <div className={styles.item}>
          <span>Available</span>
          <span className={styles.amount}>{fromAccount.balance} {fromAccount.token_name}</span>
        </div>
        <div className={styles.item}>
          <span>Receive</span>
          <span className={styles.amount}>
          {isFindBestRate && loaded ? `${bestRate} ${toCoin.ticker}` : <span className={styles.skeleton}></span>}
          </span>
        </div>
      </div>

      {/* <p style={{ maxWidth: 600, overflowWrap: 'break-word' }}>
        {JSON.stringify(isLoading, null, 2)}
        {` ${isFindBestRate} ${loaded} ${totalAmountPartners}`}
      </p> */}

      <Button step={step} toGo={toGo}/>
    </div>
  )
}

export default Exchange

