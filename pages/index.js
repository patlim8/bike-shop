import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import { connectToDatabase } from "../util/mongodb"
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>

      <main className={styles.main2}>
        <h1 className={styles.title}>
          Bike Shop
        </h1>

        <div className={styles.grid}>
          <a href="/sale" className={styles.card}>
            <h1>ขาย</h1>
          </a>

          <a href="#" className={styles.card}>
            <h1>บัญชี </h1>
          </a>

          <a href="/inventory" className={styles.card}>
            <h1>สินค้า</h1>
          </a>

          <a
            href="#" className={styles.card}>
            <h1>แจ้งเตือน</h1>
          </a>

          <a href="/model_mgnt" className={styles.card}>
            <h1>จัดการรุ่นสินค้า</h1>
          </a>
        </div>
      </main>
    </div>
  )
}


export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
