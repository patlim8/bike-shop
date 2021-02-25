import React, { useState } from 'react';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import BrandList from '../../components/brandList';
import ModelList from '../../components/modelList'


import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useForm } from "react-hook-form";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from "mongodb";
import { ObjectId } from 'bson';

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Calculation({ item: items, order, customer_price_multiply  }) {

  console.log("items: ", items)

  console.log("multiply === ", customer_price_multiply)

  const { register, handleSubmit, watch, errors } = useForm();

  const { register: register2, handleSubmit: handleSubmit2, watch: watch2, errors:errors2 } = useForm();


  const [jsxProductList, setJsxProductList] = useState(<tr></tr>);
  const [productList, setProductList] = useState([]);
  // const newOrder = [];
  // const [newOrder, setNewOrder] = useState([]);
  const [newOrder2, setNewOrder2] = useState([]);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [fixing_price, setFixingPrice] = useState(0);

  

  const onSubmitToDatabase = (data) => {
    // productList << array of Json
    // let data = productList[0]
    
    console.log("data ===", data)
    let s = { totalprice_order: totalPriceProducts, fix_service_price: data.fix_service_price, 
      total: 0, receive: data.receive, change: 0, type: "Sale"}

    // s.totalprice_order = parseInt(q.totalprice_order)
    // s.fix_service_price += parseFloat( data.fix_service_price)
    s.total = s.totalprice_order + Number(s.fix_service_price)
    s.change = Number(s.receive) - s.total

    console.log("s.price order === ", s.totalprice_order)
    console.log("s.total === ", s.total)
    console.log("s.change === ", s.change)
    
    console.log("data ", data)
    console.log("product Lists ", productList)



    productList.map(data => {
      console.log(data)
    
      fetch('/api/item/qty',
        {
          method: 'PUT',
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
          body: JSON.stringify(s) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Response from server " + data.message)
        });
      

    productList.map(data => {
      console.log(data)
    
      fetch('/api/saleItem',
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
    let p = { _id: '', product_name: data.product_name, code: '', brand: '', model: '', qty: data.qty ,purchase_price: 0}
    // let q = { items_ID: [], totalprice_order: 0} // จริงๆอยากให้เป็น ID แต่เดีนวแก้ทีหลัง
    let total_price_products = 0
    



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
        p._id = r._id
        p.code = r.code
        p.brand = r.brand
        p.model = r.model
        p.purchase_price = r.purchase_price
      
        
        
        productList.push(p)
        


        
      }
      
    }
    
    )

    // productList.push(p)
    let newList = productList.map(p => {
          // console.log("Update JSX", p)
          return (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.product_name}</td>
              <td>{p.code}</td>
              <td>{p.brand}</td>
              <td>{p.model}</td>
              <td>{p.qty}</td>
              <td>{(p.purchase_price*customer_price_multiply) * p.qty}</td>
            </tr>
          )

        })
      
    setProductList(productList)
    setJsxProductList(newList)


    productList.map(product =>{
       total_price_products += product.qty * (product.purchase_price * customer_price_multiply)
       setTotalPriceProducts(total_price_products)
       
       
       console.log("ราคาสินค้า", total_price_products)
       console.log("ราคาสินค้า SET", totalPriceProducts)
    })

    // setTotalPriceProducts(total_price_products)

    // newOrder.push(q)

    // console.log("ราคาสินค้า", totalPriceProducts)
    // console.log("ข้างใน q", newOrder)
    // setNewOrder(newOrder)

    // console.log("new order ==== ", newOrder)

    // console.log("ค่าซ่อม ", data.fix_service_price)
    // console.log("รวม ", s.total)
    // console.log("เงินทอน ", s.change)

    // newOrder2.push(s)
    // console.log("ข้างใน s", newOrder2)

    // setNewOrder2(newOrder2)

   

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
          {/* <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Order ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="order_id" ref={register}
              placeholder="New Order"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup> */}

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

          {/* <BrandList brand={brand} />
          <ModelList model={model} /> */}

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
            name="fix_service_price" ref={register2}
            placeholder="ราคา"
            type="number"
            onChange={e => setFixingPrice(e.target.value)}
          />
        </InputGroup>

        
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ต้องชำระ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            readOnly
            placeholder=""
            aria-label="Item name"
            aria-describedby="basic-addon1"
            Value={totalPriceProducts+ Number(fixing_price)}
          />
        </InputGroup>


        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="receive" ref={register2}
            placeholder=""
            type="number"
          />
        </InputGroup>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ปริ้นใบเสร็จ" />
        </Form.Group>


      </div>

      <div>
      <ButtonGroup>
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

export async function getServerSideProps({query}, props) {
  const { db } = await connectToDatabase();
  const { item_id } = query
//   const customer_type = props.params.customer_type
  console.log('type === ',query.customer)  
  console.log(`getServerSideProps: ${item_id}`)

  // console.log('type2 === ',{query}) 

  
  const brand = await db
        .collection("brand")
        .find()
        .sort({})
        .limit(20)
        .toArray();

    const model = await db
        .collection("model")
        .find()
        .sort({})
        .limit(20)
        .toArray();

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

    // return {
    //     props: {
    //     item: JSON.parse(JSON.stringify(item)),
    //     order: JSON.parse(JSON.stringify(order)),
        
    //     },
    // };
  if(query.customer === 'normal'){  
    return {
        props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        customer_price_multiply: JSON.parse(1.2)
        },
    };
}else{

  let percent = query.customer
  // percent.split("x")
  console.log("percent === ", percent.split("x"))
  console.log("number === ", percent.split("x")[1])
    return {
        props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        customer_price_multiply: JSON.parse(Number(1 + Number(percent.split("x")[1])/100))
        },
    };
}
}