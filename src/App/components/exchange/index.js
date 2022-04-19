import Input from '../input/input';
import Dropdown from '../dropdown';
import styles from './styles.module.scss';

const {
    libraries: {
      React,
      React: { useEffect, useState },
      ReactRedux: { useSelector},
    },
    utilities: {
      apiCall,
    }
  } = NEXUS;

const nextStep = 2

function Exchange ({ toGo }) {
  const [isClickAccounts, setDropdownAccountsVisible] = useState(false)
  const [isClickCoins, setDropdownCoinsVisible] = useState(false)

  const { fromAccount, toAmount, accountsFrom, coinsList, toCoin } = useSelector(state => state.exchange.exchangeInfo)

  const handleDropdownConins = () => {
    (isClickCoins) ? setDropdownCoinsVisible(false) : setDropdownCoinsVisible(true)
  }
  const handleDropdownAccounts = () => {
    (isClickAccounts) ? setDropdownAccountsVisible(false) : setDropdownAccountsVisible(true)
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.column}>
          {/* <p style={{ maxWidth: 600, overflowWrap: 'break-word' }}>
            {JSON.stringify(accounts, null, 2)}
          </p> */}
          <span>From</span>
          <div className={styles.inform} onClick={handleDropdownAccounts}>
            <span>{`Nexus (${fromAccount.name})`}</span>
            <span className={styles.amount}>{fromAccount.balance} {fromAccount.token_name}</span>
            <Dropdown isClick={isClickAccounts} elements={accountsFrom} currencies={false}/>
          </div>
        </div>
        <div className={styles.columnImg}>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.646446 13.6464C0.451184 13.8417 0.451184 14.1583 0.646446 14.3536L3.82843 17.5355C4.02369 17.7308 4.34027 17.7308 4.53553 17.5355C4.7308 17.3403 4.7308 17.0237 4.53553 16.8284L1.70711 14L4.53553 11.1716C4.7308 10.9763 4.7308 10.6597 4.53553 10.4645C4.34027 10.2692 4.02369 10.2692 3.82843 10.4645L0.646446 13.6464ZM13 13.5L1 13.5L1 14.5L13 14.5L13 13.5Z" fill="#E4E4E4"/>
          <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.97631 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5L13 4.5L13 3.5L1 3.5L1 4.5Z" fill="#E4E4E4"/>
          </svg>
        </div>
        <div className={styles.column}>
        <span>To</span>
          <div className={styles.inform} onClick={handleDropdownConins}>
            <span>{toCoin}</span>
            <Dropdown isClick={isClickCoins} elements={coinsList} currencies={true}/>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.column}>
          <span>Amount</span>
          <Input type='amount' />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.column}>
          <span>Address to receive</span>
          <Input type='address' />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}>
          <span>Available</span>
          <span className={styles.amount}>{fromAccount.balance} {fromAccount.token_name}</span>
        </div>
        <div className={styles.item}>
          <span>Receive</span>
          <span className={styles.amount}>
            {toAmount}
          </span>
        </div>
      </div>

      <div className={styles.container}>
        <button onClick={() => toGo(nextStep, true)}>Exchange</button>
      </div>
    </div>
  )
}

export default Exchange

