import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'
import { connectToDatabase } from "../util/mongodb";
import { Container } from 'react-bootstrap';




export default function TotalSale({ item: items }) {
  console.log(items)
  return (
    <div>
      <Head>
        <title>TotalSale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />


      <Container>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Account - Total Sale
        </h1>

          <br></br><br></br>

          {/*<InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">เดือน</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder=""
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>*/}

          <div>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  
                  <th>ชื่อสินค้า</th>
                  <th>ยี่ห้อสินค้า</th>
                  <th>รุ่นสินค้า</th>
                  <th>จำนวนที่ขายได้</th>
                </tr>
              </thead>
              <tbody>
                {items.map(data => {
                  return (
                    <tr key={data._id}>
                      <td>{data.product_name}</td>
                      <td>{data.brand}</td>
                      <td>{data.model}</td>
                      <td>{data.qty}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </main>

        {/*<div>
          <Button variant="success" size>Save as Excel</Button>{' '}
          <Button variant="secondary">Print</Button>{' '}
        </div>*/}

      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const item = await db
    .collection("sale item")
    .find()
    .sort({})
    .limit(20)
    .toArray();


  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),

    },


  };

}
