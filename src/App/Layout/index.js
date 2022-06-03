import { fetchAccounts, fetchCoins, fetchPartners, stepTitles } from 'redux/reducers/exchange'
import { Header } from 'App/components'
import StepView from 'App/StepView'

import styles from './styles.module.scss'

const {
  libraries: {
    React,
    React: { useEffect },
    ReactRedux: { useDispatch, useSelector },
  },
} = NEXUS

export default function Main() {
  const currentStep = useSelector(state => state.exchange.step)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccounts)
    dispatch(fetchCoins)
    dispatch(fetchPartners)
  }, [])

  return (
    <div className={styles.root}>
      <Header step={currentStep}>{stepTitles[currentStep]}</Header>
      <StepView currentStep={currentStep}></StepView>
    </div>
  )
}
