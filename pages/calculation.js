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
import { ObjectId } from 'bson';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Calculation({ item: items, order }) {

  console.log("items: ", items)

  const { register, handleSubmit, watch, errors } = useForm();

  const { register: register2, handleSubmit: handleSubmit2, watch: watch2, errors:errors2 } = useForm();


  const [jsxProductList, setJsxProductList] = useState(<tr></tr>);
  const [productList, setProductList] = useState([]);
  // const newOrder = [];
  const [newOrder, setNewOrder] = useState([]);
  const [newOrder2, setNewOrder2] = useState([]);

  

  const onSubmitToDatabase = () => {
    // productList << array of Json
    // let data = productList[0]
    
    

    productList.map(data => {
      console.log(data)
    
      fetch('/api/item',
        {
          method: 'DELETE',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Response from server " + data.message)
        });
      })
    // console.log("new order ", newOrder)
    newOrder.map(data => {
      console.log(data)
    
      fetch('/api/order',
        {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Response from server " + data.message)
        });
      })

    newOrder2.map(data => {
      console.log(data)
    
      fetch('/api/order2',
        {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Response from server " + data.message)
        });
      })

    

        
  }

  const addItems = (data) => {
    // console.log("เพิ่มในรายการขาย",data)
    // let j = 1
    // for (let i = 1; i <= productList.length; i++) {
    //   j++
    // }

    // var start_item_id = j
    let p = { product_name: data.product_name, code: '', brand: '', model: '', qty: data.qty ,purchase_price: 0}
    let q = { _id: data.order_id, items_code: [], totalprice_order: 0} // จริงๆอยากให้เป็น ID แต่เดีนวแก้ทีหลัง
    



    // var totalprice = productList.map(product =>{
    //   totalprice += product.qty * product.purchase_price
    // })
    // let totalprice = 0
    // let temp = [];
    
    
    // console.log("ใน product list", productList)

    // productList.push(p)
    // let check_item = 
    items.map(r => {
      
      
    
      if(r.product_name == p.product_name){
        p.code = r.code
        p.brand = r.brand
        p.model = r.model
        p.purchase_price = r.purchase_price
      
        
        
        productList.push(p)
        q.items_code.push(p.code)
        
        console.log("ข้างใน", productList)

        
      }
      
    }
    
    )

    // productList.push(p)
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


    const calculate = productList.map(product =>{
      q.totalprice_order += product.qty * product.purchase_price
    })

    newOrder.push(q)

    console.log("ราคาสินค้า", q.totalprice_order)
    console.log("ข้างใน q", newOrder)
    setNewOrder(newOrder)

    let s = { order_id: data.order_id, totalprice_order: 0, fix_service_price: 0, 
      total: 0, receive: data.receive, change: 0}

    // s.totalprice_order = parseInt(q.totalprice_order)
    s.fix_service_price += data.fix_service_price
    s.total = q.totalprice_order + s.fix_service_price
    s.change = s.receive - s.total
    console.log("ค่าซ่อม ", data.fix_service_price)
    console.log("รวม ", s.total)
    console.log("เงินทอน ", s.change)

    newOrder2.push(s)
    console.log("ข้างใน s", newOrder2)

    setNewOrder2(newOrder2)

   

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
    <div>
    <form onSubmit={handleSubmit(addItems)}>
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
              name="order_id" ref={register}
              placeholder="New Order"
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
              type="number"
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

      </main>
    </form>

    <form onSubmit={handleSubmit2(onSubmitToDatabase)}>

      <div>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ค่าถอดประกอบ" />
        </Form.Group>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">ราคา</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="fix_service_price" ref={register}
            placeholder="ราคา"
            type="number"
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
            name="receive" ref={register}
            placeholder=""
            type="number"
          />
        </InputGroup>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ปริ้นใบเสร็จ" />
        </Form.Group>


      </div>

      <div>
      <ButtonGroup horizontal>
        <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
        {/* <Button href="/payment" type="submit">จ่าย</Button>{' '} */}
        <button>จ่าย</button>{' '}
        <Button variant="danger" href="/sale">ย้อนกลับ</Button>{' '}
      </ButtonGroup>

      {/* <button>จ่าย</button> */}
      </div>

    </form>
    </div>
  )
}

export async function getServerSideProps({query}) {
  const { db } = await connectToDatabase();
  const { item_id } = query
  console.log(`getServerSideProps: ${item_id}`)

  const item = await db
    .collection("item")
    .find()
    .sort({})
    .limit(20)
    .toArray();

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