import Details from './components/details';
import Exchange from './components/exchange';
import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useState, useEffect },
  }
} = NEXUS;

export default function Main() {

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
        <Exchange toGo={toGo} /> :
        <Details toGo={toGo} />
      }
    </div>
  );
}