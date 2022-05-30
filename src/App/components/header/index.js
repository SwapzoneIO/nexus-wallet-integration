import { steps } from 'redux/reducers/exchange/exchangeInfo'
import styles from './styles.module.scss'

const {
  libraries: { React },
} = NEXUS

const stepTitles = [
  { id: 1, title: 'Exchange with Swapzone' },
  { id: 2, title: 'Exchange details confirmation' },
  { id: 3, title: 'Exchange confirmed' },
]

function Header({ step }) {
  return stepTitles.map(stepTitle => {
    if (stepTitle.id === step) {
      return (
        <>
          <h2 className={styles.title}>
            {stepTitle.title}
            {step === steps.waitingExchange ? (
              <span className={`${styles.titleImg} ${styles.inProcess}`}>
                <svg width='28' height='26' viewBox='0 0 28 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M20.2246 9.34528H26.4234V3.14645'
                    stroke='#00B7FA'
                    stroke-width='2.06627'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M5.9668 4.96735C7.02111 3.9115 8.27323 3.07387 9.65155 2.50236C11.0299 1.93086 12.5073 1.63669 13.9994 1.63669C15.4915 1.63669 16.969 1.93086 18.3473 2.50236C19.7256 3.07387 20.9778 3.9115 22.0321 4.96735L26.4229 9.34527'
                    stroke='#00B7FA'
                    stroke-width='2.06627'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M7.77499 16.6547H1.57617V22.8535'
                    stroke='#00B7FA'
                    stroke-width='2.06627'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M22.0323 21.0326C20.978 22.0885 19.7259 22.9261 18.3475 23.4976C16.9692 24.0691 15.4917 24.3633 13.9996 24.3633C12.5075 24.3633 11.0301 24.0691 9.65175 23.4976C8.27344 22.9261 7.02131 22.0885 5.967 21.0326L1.57617 16.6547'
                    stroke='#00B7FA'
                    stroke-width='2.06627'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </span>
            ) : null}
          </h2>
          <div className={styles.pagination}>{step} of 3</div>
        </>
      )
    }
  })
}

export default Header
