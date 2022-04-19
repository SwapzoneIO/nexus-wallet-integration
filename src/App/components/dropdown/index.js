import * as TYPE from 'actions/types';
import styles from './styles.module.scss';
// import onClickOutside from 'react-onclickoutside'

const {
    libraries: {
      React,
      ReactRedux: { useSelector, useDispatch },
    },
  } = NEXUS;

function Dropdown ({ isClick, elements, currencies }) {
    const { fromAmount } = useSelector(state => state.exchange.exchangeInfo)
    const dispatch = useDispatch()

    const handleAccount = (elem) => {
        if (currencies){
            dispatch({
                type: TYPE.UPDATE_TO_COIN,
                coin: elem,
            })
        } else {
            dispatch({
                type: TYPE.UPDATE_FROM_ACCOUNT,
                account: elem,
                })
                if (elem.balance < fromAmount){
                dispatch({
                    type: TYPE.UPDATE_FROM_AMOUNT,
                    amountFrom: elem.balance,
                })
            }
        }
    }

    return(
        <ul className={(isClick) ? styles.dropdown : styles.hide}>
            {(elements.length) ? 
            elements.map(elem => (
            <li className={styles.dropdown__elem} onClick={() => handleAccount(elem)}>
                {(elem.name) ? <span>{`Nexus (${elem.name})`}</span> : <span>{elem}</span>}
                <span className={styles.amount}>{elem.balance} {elem.token_name}</span>
            </li> 
            )) :
            <li className={styles.dropdown__elemNotFound}>
            <span>Elements not found</span>
            </li>}
        </ul>
    )
}

export default Dropdown