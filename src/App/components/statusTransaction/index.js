// import ExchangeLoader from 'components/common/circular-loader'

import styles from './styles.module.scss'

const {
    libraries: {
      React,
      React: { useState },
    }
  } = NEXUS;

function StatusLine () {
  const [step, exchangeStep] = useState(1)
  const transactionStatus = [
    { id: 1, label: 'Waiting' },
    { id: 2, label: 'Deposit received' },
    { id: 3, label: 'Exchanging' },
    { id: 4, label: 'Sending' },
    { id: 5, label: 'Success' },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.line}/>
      {transactionStatus.map(item => (
        <div className={styles.statusItem} key={item.id}>
          <div className={styles.statusView}>
            {item.id === step ?
              <div className={styles.loading}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.19775 3.58143C11.0549 2.89164 13.0922 2.85772 14.9713 3.48531C16.8504 4.1129 18.4584 5.36425 19.5284 7.03165C20.5983 8.69904 21.0659 10.6822 20.8534 12.6519C20.641 14.6217 19.7613 16.4595 18.3604 17.8604C16.9595 19.2613 15.1217 20.141 13.1519 20.3534C11.1822 20.5659 9.19904 20.0983 7.53165 19.0284C5.86425 17.9584 4.61291 16.3504 3.98532 14.4713C3.35773 12.5922 3.39164 10.5549 4.08143 8.69775" stroke="#00B7FA" stroke-width="1.44711" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              : item.id < step ?
                <div className={styles.successStep}>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2.25C10.5716 2.25 8.68657 2.82183 7.08319 3.89317C5.47982 4.96451 4.23013 6.48726 3.49218 8.26884C2.75422 10.0504 2.56114 12.0108 2.93735 13.9021C3.31355 15.7934 4.24215 17.5307 5.60571 18.8943C6.96928 20.2579 8.70656 21.1865 10.5979 21.5627C12.4892 21.9389 14.4496 21.7458 16.2312 21.0078C18.0127 20.2699 19.5355 19.0202 20.6068 17.4168C21.6782 15.8134 22.25 13.9284 22.25 12C22.245 9.41566 21.2162 6.93859 19.3888 5.11118C17.5614 3.28378 15.0843 2.25496 12.5 2.25ZM17.1406 10.2938L11.6469 15.5438C11.5049 15.6774 11.3169 15.7512 11.1219 15.75C11.0266 15.7514 10.9319 15.7338 10.8434 15.6984C10.7549 15.663 10.6743 15.6105 10.6063 15.5438L7.85938 12.9188C7.78319 12.8523 7.72123 12.7711 7.67722 12.6801C7.63321 12.589 7.60806 12.49 7.60328 12.389C7.5985 12.2881 7.61419 12.1871 7.64941 12.0924C7.68463 11.9976 7.73865 11.9109 7.80822 11.8375C7.8778 11.7642 7.96149 11.7056 8.05426 11.6654C8.14703 11.6252 8.24698 11.6042 8.34809 11.6036C8.44919 11.603 8.54938 11.6229 8.64261 11.662C8.73585 11.7011 8.82021 11.7587 8.89063 11.8312L11.1219 13.9594L16.1094 9.20625C16.2552 9.07902 16.4446 9.01309 16.6379 9.02223C16.8312 9.03138 17.0135 9.1149 17.1467 9.25533C17.2798 9.39576 17.3536 9.58222 17.3524 9.77575C17.3513 9.96928 17.2754 10.1549 17.1406 10.2938Z" fill="#00B7FA"/>
                  </svg>
                </div>
                : <div className={styles.step}/>
            }
          </div>
          <div className={`${styles.statusLabel} ${ item.id === step ? styles.activeStep : null}`}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatusLine