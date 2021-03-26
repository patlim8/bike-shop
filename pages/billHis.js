import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'
import { connectToDatabase } from "../util/mongodb";
import { Container } from 'react-bootstrap';


function NewlineText(props) {
  const text = props.text;
  return text.split('\n').map(str => <p>{str}</p>);
}


export default function TotalSale({ bill: bills }) {
  console.log(bills)
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
            Account - Bill History
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

          <br></br>

          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>วันที่</th>
                  <th>รายการสินค้า</th>
                  <th>รวม</th>
                  <th>จำนวนที่ได้รับ</th>
                  <th>ทอน</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(data => {
                  return (
                    <tr key={data._id}>
                      <td>{data.orderID}</td>
                      <td>{data.date}</td>
                      {/* <td>{data.productList.map(list =>{
                    list.product_name+'\n'
                    console.log(list.product_name)
                    })}</td> */}
                      <td>{data.productList.map(list => <NewlineText text={list.product_name + ' จำนวน: ' + list.qty
                        + ' ราคา: ' + list.price + ' รวม: ' + list.totalPriceProducts + '\n'} />)}</td>

                      {/* <td>{data.productList.map(list => list.product_name+'\n'+'จำนวน: '+list.qty+
                        '\n'+'ราคา: '+list.price+'\n'+'รวม: '+list.totalPriceProducts)}</td> */}
                      {/* <td>{data.productList[0].product_name+'\n'+'จำนวน: '+data.productList[0].qty+ */}
                      {/* '\n'+'ราคา: '+data.productList[0].price+'\n'+'รวม: '+data.productList[0].totalperProduct}</td> */}
                      <td>{data.total}</td>
                      <td>{data.receive}</td>
                      <td>{data.change}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
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

  const bill = await db
    .collection("billHistory")
    .find()
    .sort({})
    .limit(20)
    .toArray();


  return {
    props: {
      bill: JSON.parse(JSON.stringify(bill)),

    },


  };

}
