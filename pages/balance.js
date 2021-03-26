import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'
import { connectToDatabase } from "../util/mongodb";
import { Col, Container, Row } from 'react-bootstrap';

export default function Balance({ balance: balances }) {

  console.log(balances)

  let total_receive = 0
  let total_balance = 0
  let total_expense = 0

  balances.map(data => {
    if (data.type === "Buy") {
      console.log("ซื้อ ", data.expense)
      total_balance -= data.expense
      total_expense += data.expense
    } else if (data.type === "Sale") {
      console.log("ขาย ", data.total)
      total_balance += data.total
      total_receive += data.total
    }

  })
  return (
    <div>
      <Head>
        <title>Balance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />

      <Container>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Account - Balance
        </h1>

          <br></br><br></br>

          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>วันที่</th>
                  <th>รายรับ</th>
                  <th>รายจ่าย</th>
                </tr>
              </thead>
              <tbody>
                {balances.map(data => {
                  if (data.type === "Buy") {
                    return (
                      <tr>
                        <td>ซื้อ {data.product_name}</td>
                        <td>{data.date}</td>
                        <td>0</td>
                        <td>{data.expense}</td>
                      </tr>
                    )
                  } else if (data.type === "Sale") {
                    return (
                      <tr>
                        <td>ขายสินค้า {data.date}</td>
                        <td>{data.date}</td>
                        <td>{data.total}</td>
                        <td>0</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </Table>
          </div>

          <br /><br />

          <Container>
            <Row>
              <Col>
                <h4>
                  {/* Brand: {filter.brand ? filter.brand : '---'} */}
        รวมรายรับ:&emsp;{total_receive}
                  {/* รวมรายจ่าย: {total_expense} */}
                  {/* รวม: {total_balance} */}
                </h4>
              </Col>
              <Col>
                <h4>
                  {/* Brand: {filter.brand ? filter.brand : '---'} */}
                  {/* รวมรายรับ: {total_receive} */}
        รวมรายจ่าย:&emsp;{total_expense}
                  {/* รวม: {total_balance} */}
                </h4>
              </Col>
            </Row>

            <br />
            <Row>
              <Col>
                <h2 className="balance-total">
                  {/* Brand: {filter.brand ? filter.brand : '---'} */}
                  {/* รวมรายรับ: {total_receive} */}
                  {/* รวมรายจ่าย: {total_expense} */}
        รวม:&emsp;{total_balance}
                </h2>
              </Col>
            </Row>
          </Container>
        </main>

        {/*<div>
        <Button variant="success">Save as Excel</Button>{' '}
        <Button variant="secondary">Print</Button>{' '}
      </div>*/}
      </Container>

    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const balance = await db
    .collection("balance")
    .find()
    .sort({})
    .toArray();


  return {
    props: {
      balance: JSON.parse(JSON.stringify(balance)),

    },


  };

}