import styles from './styles.module.scss';

const {
    libraries: {
      React,
      React: { useState },
    }
  } = NEXUS;

const backStep = 1
const nextStep = 3

function Button ({ toGo }) {
    const [isNext, setNextStep] = useState(false)

    if (!isNext){
        return (
            <div className={styles.container}>
                <button className={styles.backButton} onClick={() => toGo(backStep, false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#E4E4E4" stroke-miterlimit="10"/>
                        <path d="M11.4281 15.1781L8.25 12L11.4281 8.8219" stroke="#E4E4E4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 12H15.75" stroke="#E4E4E4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={styles.back}>
                        Back
                    </div>
                </button>
                
                <div className={styles.buttonContainer}>
                    <button onClick={() => {
                        setNextStep(true)
                        toGo(nextStep, true)
                        }}>Confirm</button>
                </div>
            </div>
        )
    } 
    else {
        return (
            <div className={styles.container}>
                <button className={styles.step3}>To my wallets</button>
            </div>
        )
    }
}

export default Button