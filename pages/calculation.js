import React, { useState } from 'react';

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useForm } from "react-hook-form";
import { connectToDatabase } from "../util/mongodb";
import { ObjectID } from "mongodb";
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Calculation({ item, order }) {

  const { register, handleSubmit, watch, errors } = useForm();


  const [jsxProductList, setJsxProductList] = useState(<tr></tr>);
  const [productList, setProductList] = useState([]);


  const onSubmitToDatabase = (data) => {
    // productList << array of Json
    console.log({ productList })
    fetch('/api/stock',
      {
        method: 'post',
        body: productList
      })
  }

  const onSubmit = (data) => {
    // console.log("เพิ่มในรายการขาย",data)
    let j = 1
    for (let i = 1; i <= productList.length; i++) {
      j++
    }

    var start_item_id = j
    let p = { id: start_item_id, product_name: data.product_name, code: data.code, brand: 'Honda', model: 'CBR150', qty: data.qty, unitPrice: 100 }
    productList.push(p)
    console.log("productList", productList.length)
    let newList = productList.map(p => {
      console.log("Update JSX", p)
      return (
        <tr>
          <td>{p.id}</td>
          <td>{p.product_name}</td>
          <td>{p.code}</td>
          <td>{p.brand}</td>
          <td>{p.model}</td>
          <td>{p.qty}</td>
          <td>{p.unitPrice}</td>
        </tr>
      )
    })
    setProductList(productList)
    setJsxProductList(newList)

    const product_code = []
    const product_price = []
    const product_unit = []
    productList.map(p => {
      product_code.push(p.code)
      product_price.push(p.unitPrice)
      product_unit.push(p.qty)
    })

    const new_product_unit = product_unit.map(h => parseInt(h));
    const new_product_price = product_price.map(h => parseInt(h));

    let total_unit = 0
    for (let k = 0; k < new_product_unit.length; k++) {
      total_unit = total_unit + new_product_unit[k]
    }

    let total_price = 0
    for (let k = 0; k < new_product_price.length; k++) {
      total_price = total_price + new_product_price[k]
    }
    // console.log(product_code)
    // console.log(product_price)
    // console.log(new_product_unit)
    console.log("Total Unit",total_unit)
    console.log("Total Price",total_price)

    let new_order = {item_code: product_code, unit: total_unit, price: total_price}
    if (productList.length = 1) {
      fetch('/api/order', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(new_order) // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(new_order => {
          console.log(new_order);
          alert("Response from server "+ new_order.message)
        });
  
    } else if (productList.length < 1) {
      fetch('/api/order', {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(new_order) // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(new_order => {
          console.log(new_order);
          alert("Response from server "+ new_order.message)
        });
    }

    // let new_order = []
    // total_pay.push(new_order)
    // total_pay.push(new_order)
    // console.log("new_order",new_order)

  }


  // Add some dummy data
  // let p = { productName: 'กรองอากาศ', code: 'A1234', brand: 'Honda', model: 'CBR150', qty: 10, unitPrice: 100 }
  // productList.push(p)
  // let jsxProductList = productList.map(p => {
  //   return (
  //     <tr>
  //       <td>{p.productName}</td>
  //       <td>{p.code}</td>
  //       <td>{p.brand}</td>
  //       <td>{p.model}</td>
  //       <td>{p.qty}</td>
  //       <td>{p.unitPrice}</td>
  //     </tr>
  //   )
  // })


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>Calculation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Sale - Calculation
        </h1>



        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Order ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Item name"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          {/*<InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ID"
              name="id"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              ref={register}
            />
  </InputGroup>*/}

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="product_name" ref={register}
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">รหัสสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="code" ref={register}
              placeholder="รหัสสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <BrandList />
          <ModelList />

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Barcode ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Barcode ID"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">จำนวน</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="qty" ref={register}
              placeholder="จำนวน"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <button>เพิ่มในรายการขาย</button>



          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>ชื่อสินค้า</th>
                  <th>รหัสสินค้า</th>
                  <th>ยี่ห้อสินค้า</th>
                  <th>รุ่นสินค้า</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>

                </tr>
              </thead>
              <tbody>
                {jsxProductList}
              </tbody>
            </Table>
          </div>


        </div>



        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ค่าถอดประกอบ" />
        </Form.Group>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">ราคา</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="ราคา"
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ต้องชำระ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={order.price}
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder=""
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ปริ้นใบเสร็จ" />
        </Form.Group>


      </main>

      <ButtonGroup horizontal>
        <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
        <Button href="/payment" type="submit">จ่าย</Button>{' '}
        <Button variant="danger" href="/sale">ย้อนกลับ</Button>{' '}
      </ButtonGroup>


    </form>
  )
}

export async function getServerSideProps({query}) {
  const { db } = await connectToDatabase();
  const { item_id } = query
  console.log(`getServerSideProps: ${item_id}`)

  const item = await db
    .collection("item")
    .findOne(ObjectID(item_id))

  const order = await db
    .collection("order")
    .find({"item_code": ObjectID(item_id)})
    .toArray()

    console.log(ObjectID(item_id))
  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}