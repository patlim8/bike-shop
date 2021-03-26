import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Button from 'react-bootstrap/Button';
import { connectToDatabase } from "../util/mongodb"
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("working ")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'white' }, { color: 'blue' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />

      <main className={styles.main2}>
        <h1 className={styles.title}>
          Bike Shop
        </h1>

        <div className={styles.grid}>
          <a href="/sale" className={styles.card}>
            <h1>ขาย</h1>
          </a>

          <div className={styles.card}>
            <Accordion>
              <Accordion.Toggle as={Card.Body} eventKey="0">
                <CustomToggle eventKey="0"><h1>บัญชี</h1></CustomToggle>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Button variant="secondary" href="/totalSale">Total Sale</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="secondary" href="/balance">Balance</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="secondary" href="/billHis">Bill</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </div>

          <a href="/inventory" className={styles.card}>
            <h1>สินค้า</h1>
          </a>

          <div className={styles.card}>
            <Accordion>
              <Accordion.Toggle as={Card.Body} eventKey="0">
                <CustomToggle eventKey="0"><h1>การแจ้งเตือน</h1></CustomToggle>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Button variant="secondary" href="/needItem">สินค้าที่ต้องเพิ่ม</Button>&nbsp;&nbsp;&nbsp;
                  <Button variant="secondary" href="/stock">สินค้าค้างสต็อค</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </div>

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
