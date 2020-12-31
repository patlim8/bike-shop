import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Button from 'react-bootstrap/Button';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Payment() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Cancel Payment</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ButtonBar />

            <main className={styles.main}>
                <h2 className={styles.title}>รายการซื้อได้ถูกยกเลิกแล้ว</h2>
            </main>

            <Button href="/sale">ยืนยัน</Button>{' '}

        </div>
  )
}
