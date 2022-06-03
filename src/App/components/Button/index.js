import styles from './styles.module.scss'

const {
  libraries: {
    React,
  },
} = NEXUS

export default function Button({
  onPress,
  label,
  variant = 'primary',
  isLoading,
  children,
  className = ''
}) {
  return (
    <>
    {isLoading
      ? <div className={styles.skeleton}></div>
      : (
        <button
          className={`${styles[variant]} ${className}`}
          onClick={onPress}
        >
          {children || label}
        </button>
      )
    }
  </>
  )
}
