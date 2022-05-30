import { createTransaction } from 'redux/reducers/exchange/exchangeInfo'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useEffect },
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS

function navButton({ step, toGo }) {
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(createTransaction())
  }

  const { tx, isFindBestRate } = useSelector(state => state.exchange.exchangeInfo)
  useEffect(() => {
    if (tx.id) {
      toGo(1)
    }
  }, [tx])

  switch (step) {
    case 1:
      return (
        <div className={styles.container}>
          <button disabled={!isFindBestRate} onClick={() => toGo(1)}>
            
            Exchange
          </button>
        </div>
      )
    case 2:
      return (
        <div className={styles.container}>
          <button className={styles.backButton} onClick={() => toGo(-1)}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                stroke='#E4E4E4'
                stroke-miterlimit='10'
              />
              <path
                d='M11.4281 15.1781L8.25 12L11.4281 8.8219'
                stroke='#E4E4E4'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path d='M8.25 12H15.75' stroke='#E4E4E4' stroke-linecap='round' stroke-linejoin='round' />
            </svg>
            <div className={styles.back}>Back</div>
          </button>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => {
                handleSubmit()
              }}
            >
              Confirm
            </button>

            {tx.error && (
              <div className={styles.error}>
                <svg width='17' height='15' viewBox='0 0 17 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M9.78365 0.720686C9.23147 -0.240229 7.76854 -0.240228 7.21636 0.720686L0.178265 12.9685C-0.348618 13.8854 0.355674 15 1.46192 15H15.5382C16.6443 15 17.3487 13.8854 16.8217 12.9685L9.78365 0.720686ZM9.376 5.02329C9.376 4.64329 9.04921 4.33524 8.64607 4.33524H8.3541C7.95097 4.33524 7.62416 4.64329 7.62416 5.02329V9.76744C7.62416 10.1475 7.95097 10.4555 8.3541 10.4555H8.64607C9.0492 10.4555 9.376 10.1475 9.376 9.76744V5.02329ZM9.376 12.2117C9.376 11.8317 9.04921 11.5237 8.64607 11.5237H8.3541C7.95097 11.5237 7.62416 11.8317 7.62416 12.2117V12.2478C7.62416 12.6277 7.95097 12.9358 8.3541 12.9358H8.64607C9.0492 12.9358 9.376 12.6277 9.376 12.2478V12.2117Z'
                    fill='#E8168D'
                  />
                </svg>
                <span>
                  
                  Address receive is incorrect. <br />
                  Try another address.
                </span>
              </div>
            )}
          </div>
        </div>
      )
    case 3:
      return (
        <div className={styles.container}>
          <button className={styles.step3} onClick={() => toGo(-2)}>
            <span>To my wallets</span>
          </button>
        </div>
      )
    default:
      null
  }
}

export default navButton
