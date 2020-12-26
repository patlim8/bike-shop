import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';

export default function Sale() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar/>
      

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sale 
        </h1>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div className={styles.grid}>
          <a href="/calculation" className={styles.card}>
            <h1>ลูกค้าหน้าร้าน</h1>
            </a>

          <a href="/calculation" className={styles.card}>
            <h1>ลูกค้าช่าง</h1>
            </a>

          
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  )
}
