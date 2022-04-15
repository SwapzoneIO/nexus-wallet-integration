import Details from './components/details';
import Exchange from './components/exchange';
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect },
  },
  utilities: {
    apiCall,
  }
} = NEXUS;

export default function Main() {
  const [account, setAccount] = useState('')

  useEffect(() => {
    apiCall('users/list/accounts').then(accounts => {
      setAccount(accounts[0])
    })
  }, [])

  const [step, setNumberStep] = useState(1)
  const [isNext, setNextStep] = useState(false)

  const toGo = (nextStep, isNext) => {
    setNumberStep(nextStep)
    setNextStep(isNext)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Exchange with Swapzone</h2>
      <div className={styles.pagination}>{step} of 3</div>
      { !isNext ? 
        <Exchange toGo={toGo} account={account}/> :
        <Details toGo={toGo} account={account}/>
      }
    </div>
  );
}