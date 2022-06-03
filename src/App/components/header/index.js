import { steps } from 'redux/reducers/exchange'
import styles from './styles.module.scss'

const {
  libraries: { React },
} = NEXUS

function Spiner() {
  return (
    <div className={`${styles.titleImg} ${styles.inProcess}`}>
      <img src="assets/arrowsClockwise.svg" />
    </div>
  )
}

export default function Header({ step, isLoading, children }) {

  return (
    <>
      <h2 className={styles.title}>
        {children}
        {isLoading ? <Spiner /> : null}
      </h2>
      <div className={styles.pagination}>{step + 1} of {steps.length}</div>
    </>
  )
}
