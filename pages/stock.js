import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Table from 'react-bootstrap/Table'
import { connectToDatabase } from "../util/mongodb";
import hasNewItem from '../pages/needItem'
import { Container } from 'react-bootstrap';

export var hasNewItemStock = (check) =>{
  if(check != []){
    return true
  }else{
    return false
  }
   
}

export default function Stock({ item: items }) {

  let currentYear = new Date().getFullYear()
  console.log(items)
  let check = []

  return (
    <div>
      <Head>
        <title>สินค้าค้างสต็อค</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />

<Container>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Notification - สินค้าค้างสต็อค
        </h1>

        <br></br><br></br>

        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ชื่อสินค้า</th>
                <th>ยี่ห้อสินค้า</th>
                <th>รุ่นสินค้า</th>
                <th>อายุสินค้า (ปี)</th>
              </tr>
            </thead>
            <tbody>
            {items.map(data =>{
              let temp = new Date(data.date)
              temp.setFullYear(2019)
              data.date = temp
                if((currentYear - new Date(data.date).getFullYear()) >= 1 ){
                  check.push(data)
               
                return(
              <tr key={data._id}>
                <td>{data.product_name}</td>
                <td>{data.brand}</td>
                <td>{data.model}</td>
                <td>{currentYear - new Date(data.date).getFullYear()}</td>
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