import styles from './styles.module.scss'

const {
  libraries: {
    React
  },
} = NEXUS

const MIN_WHOLE_LENGTH = 12

export const checkAmountLength = value => {
  const [whole, fractional] = value.split('.')

  if (whole.length <= MIN_WHOLE_LENGTH && !fractional) {
    return true
  }

  return whole.length <= MIN_WHOLE_LENGTH
}

export default function Input({ value, label, error, onChange }) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.column}>
          <span>{label}</span>
          <input type='text' value={value} onChange={onChange} />
        </div>
      </div>
      {error && (
        <div className={styles.error}>
          <span>
            <img src='assets/alert.svg' />
            {' ' + error}
          </span>
        </div>
      )}
    </div>
  )
}
