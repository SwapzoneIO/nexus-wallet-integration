import Button from '../button';
import styles from './styles.module.scss';

const {
    libraries: {
      React,
      ReactRedux: { useSelector },
    }
  } = NEXUS;

function Details ({ toGo }) {
    const { fromAmount, fromAccount, toAmount, toAddress, toCoin } = useSelector(state => state.exchange.exchangeInfo)

    return (
        <div className={styles.wrapper}>
            {/* <p style={{ maxWidth: 600, overflowWrap: 'break-word' }}>
                {JSON.stringify(fromAccount, null, 2)}
            </p> */}
            <table>
                <tr>
                    <td className={styles.left}>From</td>
                    <td className={styles.right}>
                        <span>{fromAccount.name} {fromAccount.token_name}</span>
                        <span className={styles.address}>{fromAccount.address}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.left}>To</td>
                    <td className={styles.right}>
                        <span>{toCoin}</span>
                        <span className={styles.address}>{toAddress}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.left}>To be exchanged</td>
                    <td className={styles.right}>{fromAmount} {fromAccount.token_name}</td>
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