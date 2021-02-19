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
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import { connectToDatabase } from "../util/mongodb";

export default function Balance( { balance: balances } ) {

  console.log(balances)

  let total_receive = 0
  let total_balance = 0
  let total_expense = 0

  balances.map(data =>{
    if(data.type === "Buy"){
      console.log("ซื้อ ",data.expense)
      total_balance -= data.expense
      total_expense += data.expense
    }else if(data.type === "Sale"){
      console.log("ขาย ",data.total)
      total_balance += data.total 
      total_receive += data.total
    }
    
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Balance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Account - Balance
        </h1>
        
        <br></br><br></br>
        
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>รายการ</th>
                <th>รายรับ</th>
                <th>รายจ่าย</th>
                <th>รวม</th>
              </tr>
            </thead>
            <tbody>
              {balances.map(data =>{
                if(data.type === "Buy"){
                return(
              <tr>
                <td>{data.id}</td>
                <td>ซื้อ {data.product_name}</td>
                <td>0</td>
                <td>{data.expense}</td>
                <td></td>
              </tr>
                )}else if(data.type === "Sale"){
                  return(
                <tr>
                  <td>{data.id}</td>
                  <td>ขายสินค้า {data.date}</td>
                  <td>{data.total}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                )
                }
              })}
            </tbody>
          </Table>
        </div>

        <h4>
        {/* Brand: {filter.brand ? filter.brand : '---'} */}
        รวมรายรับ: {total_receive}
        {/* รวมรายจ่าย: {total_expense} */}
        {/* รวม: {total_balance} */}
      </h4>
      
      <h4>
        {/* Brand: {filter.brand ? filter.brand : '---'} */}
        {/* รวมรายรับ: {total_receive} */}
        รวมรายจ่าย: {total_expense}
        {/* รวม: {total_balance} */}
      </h4>

      <h2>
        {/* Brand: {filter.brand ? filter.brand : '---'} */}
        {/* รวมรายรับ: {total_receive} */}
        {/* รวมรายจ่าย: {total_expense} */}
        รวม: {total_balance}
      </h2>
      </main>

      <ButtonGroup>
        <Button variant="success">Save as Excel</Button>{' '}
        <Button variant="secondary">Print</Button>{' '}
      </ButtonGroup>


    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const balance = await db
    .collection("order2")
    .find()
    .sort({})
    .limit(20)
    .toArray();
  
    
  return {
    props: {
      balance: JSON.parse(JSON.stringify(balance)),
      
    },
    
    
  };
  
}