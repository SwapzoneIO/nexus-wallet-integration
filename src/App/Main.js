import { fetchAccounts, fetchCoins, fetchPartners } from 'reducers/exchange/exchangeInfo';
import Details from './components/details';
import Exchange from './components/exchange';
import Header from './components/header';

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

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAccounts)
    dispatch(fetchCoins)
    dispatch(fetchPartners)
  }, [])

  const toGo = (nextStep) => {
    setNumberStep((step) => step + nextStep)
  }

  return (
    <div className={styles.wrapper}>       
      <Header step ={step}/>       
      { step === 1 ? 
        <Exchange toGo={toGo} step={step} /> :
        <Details toGo={toGo} step={step} />
      }
    </div>
  );
}