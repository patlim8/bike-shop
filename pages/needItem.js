import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { connectToDatabase } from "../util/mongodb";
import hasNewItemStock from '../pages/stock'

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
    <div className={styles.container}>
      <Head>
        <title>NeedItem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>



      <main className={styles.main}>
        <h1 className={styles.title}>
          Notification - สินค้าที่ต้องเพิ่ม
        </h1>

        <br></br><br></br>

        <div>
          <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>id</th>
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
              <tr>
                <td>{data.id}</td>
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

      <ButtonGroup>
        <Button variant="success">Save as Excel</Button>{' '}
        <Button variant="secondary">Print</Button>{' '}
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
