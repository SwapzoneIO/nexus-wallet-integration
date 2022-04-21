import { fetchAccounts, fetchCoins, fetchPartners } from 'reducers/exchange/exchangeInfo';
import Details from './components/details';
import Exchange from './components/exchange';
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect },
    ReactRedux: { useDispatch, useSelector },
  },
} = NEXUS;

export default function Main() {
  const [step, setNumberStep] = useState(1)
  const [isNext, setNextStep] = useState(false)

  const { coinsList } = useSelector(state => state.exchange.exchangeInfo)
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
      <h2 className={styles.title}>Exchange with Swapzone</h2>
      <div className={styles.pagination}>{step} of 3</div>  
              
      {/* <p>
            {JSON.stringify(coinsList.title, null, 2)}
          </p> */}
      { !isNext ? 
        <Exchange toGo={toGo} /> :
        <Details toGo={toGo} />
      }
    </div>
  );
}