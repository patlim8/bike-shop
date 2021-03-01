import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
//import BrandList from '../components/brandList';
//import ModelList from '../components/modelList'
//import AvailableList from '../components/availableList'
import Table from 'react-bootstrap/Table'
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import { connectToDatabase } from "../util/mongodb";




export default function TotalSale( { item: items } ) {
  console.log(items)
  return (
    <div className={styles.container}>
      <Head>
        <title>TotalSale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>



      <main className={styles.main}>
        <h1 className={styles.title}>
          Account - Total Sale
        </h1>

        <br></br><br></br>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">เดือน</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder=""
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>ชื่อสินค้า</th>
                <th>ยี่ห้อสินค้า</th>
                <th>รุ่นสินค้า</th>
                <th>จำนวนที่ขายได้</th>
              </tr>
            </thead>
            <tbody>
              {items.map(data =>{
                return(
              <tr>
                <td>{data.id}</td>
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

      <ButtonGroup horizontal>
        <Button variant="success">Save as Excel</Button>{' '}
        <Button variant="secondary">Print</Button>{' '}
      </ButtonGroup>


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
