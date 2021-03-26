import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Table from 'react-bootstrap/Table';
import { connectToDatabase } from "../util/mongodb";
import hasNewItemStock from '../pages/stock'
import { Container } from 'react-bootstrap';

export var hasNewItem = (check) =>{
  if(check != []){
    return true
  }else{
    return false
  }
   
}

export default function NeedItem({ item: items }) {
  console.log(items)

  

  let check = []

  

  return (
    <div>
      <Head>
        <title>NeedItem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>


<Container>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Notification - สินค้าที่ต้องเพิ่ม
        </h1>

        <br></br><br></br>

        <div>
          <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>ชื่อสินค้า</th>
                <th>ยี่ห้อสินค้า</th>
                <th>รุ่นสินค้า</th>
                <th>จำนวนที่เหลืออยู่</th>
              </tr>
            </thead>
            <tbody>
              {items.map(data =>{
                if(data.qty <= data.minStock){
                  check.push(data)
               
                return(
              <tr key={data._id}>
                <td>{data.product_name}</td>
                <td>{data.brand}</td>
                <td>{data.model}</td>
                <td>{data.qty}</td>
              </tr>
                ) 
              }
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

  const item = await db
    .collection("item")
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
