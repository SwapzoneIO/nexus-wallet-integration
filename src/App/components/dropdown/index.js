import * as TYPE from 'redux/actions/types'
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useRef, useEffect, useState },
    ReactRedux: { useSelector, useDispatch },
  },
} = NEXUS


// TODO: move to hooks folder
function useOutsideClick(ref, setVisible) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default function Dropdown ({items = [], value = {}, label, onChange}) {
  const [visible, setVisible] = useState(false)

  const ref = useRef(null)

  useOutsideClick(ref, setVisible)

  return (
    <div className={styles.root}>
      <span>{label}</span>
      <div className={styles.input} onClick={() => setVisible(!visible)} ref={ref}>
        <span className={visible ? styles.input__up : styles.input__down}></span>
        <span>{value.title}</span>
        <span className={styles.description}>{value.description?.toUpperCase()}</span>
        <ul className={visible ? styles.dropdown : styles.hide}>
          {items.map(item => (
            <li className={styles.dropdown__elem} onClick={() => onChange(item)}>
              <span>{item.title}</span>
              <span className={styles.description}>{item.description.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
