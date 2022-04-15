import Button from '../button';
import styles from './styles.module.scss';

const {
    libraries: {
      React,
      ReactRedux: { useSelector },
    }
  } = NEXUS;

function Details ({ toGo, account }) {
    const { fromAmount, toAmount } = useSelector(state => state.exchange.exchangeInfo)

    return (
        <div className={styles.wrapper}>
            {/* <p style={{ maxWidth: 600, overflowWrap: 'break-word' }}>
                {JSON.stringify(account, null, 2)}
            </p> */}
            <table>
                <tr>
                    <td className={styles.left}>From</td>
                    <td className={styles.right}>
                        <span>{account.name} {account.token_name}</span>
                        <span className={styles.address}>{account.address}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.left}>To</td>
                    <td className={styles.right}>
                        <span>Etherium (Art)</span>
                        <span className={styles.address}>...</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.left}>To be exchanged</td>
                    <td className={styles.right}>{fromAmount} {account.token_name}</td>
                </tr>
                <tr>
                    <td className={styles.left}>Will receive</td>
                    <td className={styles.right}>{toAmount}</td>
                </tr>
            </table>
            <Button toGo={toGo}/>
        </div>
    )
}

export default Details