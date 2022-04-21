import { fetchAccounts, fetchCoins, fetchPartners } from 'reducers/exchange/exchangeInfo';
import Details from './components/details';
import Exchange from './components/exchange';
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect },
    ReactRedux: { useDispatch },
  },
} = NEXUS;

export default function Main() {
  const [step, setNumberStep] = useState(1)
  const [isNext, setNextStep] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccounts)
    dispatch(fetchCoins)
    dispatch(fetchPartners)
  }, [])

  const toGo = (nextStep, isNext) => {
    setNumberStep(nextStep)
    setNextStep(isNext)
  }

  return (
    <div className={styles.wrapper}>              
      { !isNext ? 
        <Exchange toGo={toGo} step={step} /> :
        <Details toGo={toGo} step={step} />
      }
    </div>
  );
}