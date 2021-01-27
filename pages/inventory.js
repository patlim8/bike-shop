import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import AvailableList from '../components/availableList';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connectToDatabase } from "../util/mongodb";

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Inventory({ item }) {

  console.log("item: ", item)



  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Stock Manangement
        </h1>

        <br></br><br></br>

        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ค้นหา</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <BrandList />
          <ModelList />
          <AvailableList />

        </div>

        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>ชื่อสินค้า</th>
                <th>รหัสสินค้า</th>
                <th>ยี่ห้อสินค้า</th>
                <th>รุ่นสินค้า</th>
                
                <th>Barcode ID</th>
                <th>จำนวน</th>
                <th>จำนวนจำกัด</th>
                <th>ราคา</th>
                <th>วันที่บันทึก</th>
              </tr>
            </thead>
            <tbody>
              {item.map((items) => (
                <tr>
                  <td>1</td>
                  <td>{items.product_name}</td>
                  <td>{items.code}</td>
                  <td>{items.brand}</td>
                  <td>{items.model}</td>
                  
                  <td>{items.barcode_id}</td>
                  <td>{items.amount}</td>
                  <td>{items.limit_amount}</td>
                  <td>{items.purchase_price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>

      <ButtonGroup horizontal>
        <Button variant="primary" href="/additem" size="sm">เพิ่มสินค้า</Button>{' '}
        <Button variant="secondary" size="sm">สแกนบาร์โค้ด</Button>{' '}
      </ButtonGroup>

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
