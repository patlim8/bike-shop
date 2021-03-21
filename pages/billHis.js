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
// import bill from './api/bill';


function NewlineText(props) {
  const text = props.text;
  return text.split('\n').map(str => <p>{str}</p>);
}


export default function TotalSale( { bill: bills } ) {
  console.log(bills)
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
                <th>Order ID</th>
                <th>วันที่</th>
                <th>รายการสินค้า</th>
                <th>รวม</th>
                <th>จำนวนที่ได้รับ</th>
                <th>ทอน</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(data =>{
                return(
              <tr>
                <td>{data.orderID}</td>
                <td>{data.date}</td>
                {/* <td>{data.productList.map(list =>{
                    list.product_name+'\n'
                    console.log(list.product_name)
                    })}</td> */}
                <td>{data.productList.map(list => <NewlineText text={list.product_name+' จำนวน: '+list.qty
                        +' ราคา: '+list.price+' รวม: '+list.totalPriceProducts+'\n'} /> )}</td>
                
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

      <ButtonGroup horizontal>
        <Button variant="success">Save as Excel</Button>{' '}
        <Button variant="secondary">Print</Button>{' '}
      </ButtonGroup>


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
