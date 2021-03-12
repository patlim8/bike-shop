import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';


import BrandList from '../../components/brandList';
import ModelList from '../../components/modelList'
import hasNewItem from '../../pages/needItem'
import hasNewItemStock from '../../pages/stock'


import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useForm } from "react-hook-form";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from "mongodb";
import { ObjectId } from 'bson';

import ReactDataGrid from 'react-data-grid';
// import React from "react";
import DataGrid from 'react-data-grid';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Calculation({ item: items, order, customer_price_multiply }) {

  // console.log("items: ", items)

  // console.log("multiply === ", customer_price_multiply)

  const { register, handleSubmit, watch, errors } = useForm();

  const { register: register2, handleSubmit: handleSubmit2, watch: watch2, errors: errors2 } = useForm();


  const [jsxProductList, setJsxProductList] = useState(<tr></tr>);
  const [productList, setProductList] = useState([]);

  const [rows, setRows] = useState([]);

  const [jsxBillList, setJsxBillList] = useState(<tr></tr>);
  const [billList, setBillList] = useState([]);
  // const newOrder = [];
  // const [newOrder, setNewOrder] = useState([]);
  const [newOrder2, setNewOrder2] = useState([]);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [fixing_price, setFixingPrice] = useState(0);
  const [receive_value, setReceiveValue] = useState(0);

  // const columns = [
  //   { key: "id", name: "ID" },
  //   { key: "product_name", name: "ชื่อสินค้า" },
  //   { key: "code", name: "รหัสสินค้า" },
  //   { key: "brand", name: "ยี่ห้อสินค้า" },
  //   { key: "model", name: "รุ่นสินค้า" },
  //   { key: "qty", name: "จำนวน" },
  //   { key: "price", name: "ราคา" }

  //   //<th>id</th>
  //   // <th>ชื่อสินค้า</th>
  //   // <th>รหัสสินค้า</th>
  //   // <th>ยี่ห้อสินค้า</th>
  //   // <th>รุ่นสินค้า</th>
  //   // <th>จำนวน</th>
  //   // <th>ราคา</th>
  // ];

  const columns = [
    { key: "id", name: "ID" },
    { key: "product_name", name: "ชื่อสินค้า" },
    { key: "code", name: "รหัสสินค้า" },
    { key: "brand", name: "ยี่ห้อสินค้า" },
    { key: "model", name: "รุ่นสินค้า" },
    { key: "qty", name: "จำนวน", editable: true },
    { key: "price", name: "ราคา", editable: true }
  ];

  // const rows = [
  //   {id: 0, product_name: 1, code: 2, brand: 3, model: 4, qty: 5, price: 6}
  // ]

  // var rows = [
  //   // { id: 0, title: "Task 1", complete: 20 },
  //   // { id: 1, title: "Task 2", complete: 40 },
  //   // { id: 2, title: "Task 3", complete: 60 }
  // ];



  // state = { rows };

  // const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  //   console.log("fromRow == ", fromRow)
  //   console.log("toRow == ", toRow)
  //   console.log("updated == ", updated)
  //   setRows(state => {
  //     const rows = state.rows.slice();
  //     console.log("=== ",rows)
  //     for (let i = fromRow; i <= toRow; i++) {
  //       rows[i] = { ...rows[i], ...updated };
  //     }
  //     return { rows };
  //   });
  // };

  const handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let row = rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = row[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      row[i] = updatedRow;
    }

    this.setState({ row });
  }

  

  const onSubmitToDatabase = (data) => {
    // productList << array of Json
    // let data = productList[0]

    console.log("data ===", data)
    let s = {
      totalprice_order: totalPriceProducts, fix_service_price: data.fix_service_price,
      total: data.total, receive: data.receive, change: data.change, type: "Sale", date: ""
    }

    // s.totalprice_order = parseInt(q.totalprice_order)
    // s.fix_service_price += parseFloat( data.fix_service_price)
    s.date = new Date()



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




    fetch('/api/order2/sale',
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

  const onSubmitTest = (data) => {
    // productList << array of Json
    // let data = productList[0]

    console.log("data ===", data)
    console.log("bill ===", billList)
    let bill = { orderID: '', date: '', productList: billList, total: data.total, receive: data.receive, change: data.change }

    // s.totalprice_order = parseInt(q.totalprice_order)
    // s.fix_service_price += parseFloat( data.fix_service_price)
    bill.date = new Date()


    fetch('/api/bill',
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
        body: JSON.stringify(bill) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Response from server " + data.message)
      });







  }

  useEffect(() => {
    console.log('rows == ', rows)
}, [rows]);

  const addItems = (data) => {
    // console.log("เพิ่มในรายการขาย",data)
    // let j = 1
    // for (let i = 1; i <= productList.length; i++) {
    //   j++
    // }

    // var start_item_id = j
    let p = { _id: '', product_name: data.product_name, code: '', barcode: data.barcode, brand: '', model: '', qty: data.qty, purchase_price: 0, totalP: 0, remove: '' }
    // let q = { items_ID: [], totalprice_order: 0} // จริงๆอยากให้เป็น ID แต่เดีนวแก้ทีหลัง
    let total_price_products = 0

    let q = { product_name: '', qty: data.qty, unit: '', price: 0, totalperProduct: 0 }




    // var totalprice = productList.map(product =>{
    //   totalprice += product.qty * product.purchase_price
    // })
    // let totalprice = 0
    // let temp = [];


    // console.log("ใน product list", productList)

    // productList.push(p)
    // let check_item = 
    items.map(r => {



      if (r.product_name == p.product_name || r.barcode_id == p.barcode) {
        p.product_name = r.product_name
        p._id = r._id
        p.code = r.code
        p.brand = r.brand
        p.model = r.model
        p.purchase_price = r.purchase_price
        p.totalP = (p.purchase_price * customer_price_multiply) * p.qty

        q.product_name = r.product_name + ' ' + r.model
        q.price = r.purchase_price
        q.totalperProduct = (q.price*customer_price_multiply) * q.qty


        let item = {id: p.id, product_name: p.product_name, code: p.code, brand: p.brand, model: p.model, qty: q.qty, price: (q.price*customer_price_multiply) * q.qty}
        rows.push(item)
        
        
        productList.push(p)
        billList.push(q)




      }

    }

    )

    const editItem = (e) => {
      console.log("Edit btn was clicked.", e.target.value)
      let targetID = e.target.value
    }

    const deleteItem = (e) => {
      console.log("Delete btn was clicked. _id:", e.target.value)
      let targetID = e.target.value
      // let filteredProductList = productList.filter(pi => (pi._id === e.target.value))
      for (var i = 0; i < productList.length; i++) {
        if (productList[i]._id === targetID) {
          // console.log("get Index", i)
          productList.splice(i, 1);
          // console.log("Finished Delete ProductList", productList)
        }
      }
      let delList = productList.map(p => {
        return (
          <tr key={p._id}>
            {/*<td>{p._id}</td>*/}
            <td>{p.product_name}</td>
            <td>{p.code}</td>
            <td>{p.brand}</td>
            <td>{p.model}</td>
            <td>{p.qty}</td>
            <td>{p.totalP}</td>
            <td>
              <Button variant="primary" onClick={editItem} value={p._id}>Edit</Button>
            </td>
            <td>
              <Button variant="danger" onClick={deleteItem} value={p._id}>Delete</Button>
            </td>
          </tr>
        )

      })

      let TP = 0
      setProductList(productList)
      setJsxProductList(delList)
      productList.map(pt => {
        TP += pt.totalP
      })
      setTotalPriceProducts(TP)
    }

    // productList.push(p)
    let newList = productList.map(p => {
      // console.log("Update JSX", p)
      return (
        <tr key={p.id}>
          {/*<td>{p.id}</td>*/}
          <td>{p.product_name}</td>
          <td>{p.code}</td>
          <td>{p.brand}</td>
          <td>{p.model}</td>
          <td>{p.qty}</td>
          <td>{p.totalP}</td>
          <td>
            <Button variant="primary" onClick={editItem}>Edit</Button>{' '}
          </td>
          <td>
            <Button variant="danger" onClick={deleteItem} value={p._id}>Delete</Button>
          </td>
        </tr>
      )

    })

    setProductList(productList)
    setJsxProductList(newList)

    let newBillList = billList.map(q => {
      return (
        <tr key={p.id}>
          <td>{q.product_name}</td>
          <td id="addressTd">{q.qty}</td>
          <td id="addressTd">{q.unit}</td>
          <td id="addressTd">{q.price}</td>
          <td id="addressTd">{(q.price * customer_price_multiply) * q.qty}</td>
        </tr>
      )
    })

    setBillList(billList)
    setJsxBillList(newBillList)
    console.log("jsx:  ", jsxBillList)


    productList.map(product => {
      total_price_products += product.qty * (product.purchase_price * customer_price_multiply)
      setTotalPriceProducts(total_price_products)


      console.log("ราคาสินค้า", total_price_products)
      console.log("ราคาสินค้า SET", totalPriceProducts)
    })

  }

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);



  return (
    <div>
      <form onSubmit={handleSubmit(addItems)}>
        <Head>
          <title>Calculation</title>
          <link rel="icon" href="/favicon.ico" />

          <link rel="stylesheet" href="styles.css" />

        </Head>

        <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />



        <main className={styles.main}>
          <h1 className={styles.title} className="no-print">
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

            <InputGroup className="mb-3" className="no-print">
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

            <InputGroup className="mb-3" className="no-print">
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

            <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Barcode ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="barcode" ref={register}
                placeholder="Barcode ID"
                aria-label="Item name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">จำนวน</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="qty" ref={register}
                placeholder="จำนวน"
                type="number"
                defaultValue="1"
              />
            </InputGroup>


            <button className="no-print">เพิ่มในรายการขาย</button>



            <div className="no-print">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    {/*<th>id</th>*/}
                    <th>ชื่อสินค้า</th>
                    <th>รหัสสินค้า</th>
                    <th>ยี่ห้อสินค้า</th>
                    <th>รุ่นสินค้า</th>
                    <th>จำนวน</th>
                    <th>ราคา</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {jsxProductList}
                </tbody>
              </Table>
            </div>

            <div>
                  <DataGrid
                      columns={columns}
                      rows={rows}
                      onGridRowsUpdated={handleGridRowsUpdated}
                      enableCellSelect={true}
                    />
                </div>

              <div className="no-print">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">ราคารวม</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly
                    name="total" ref={register2}
                    placeholder=""
                    aria-label="Item name"
                    aria-describedby="basic-addon1"
                    value={totalPriceProducts}
                  />
                </InputGroup>
              </div>


          </div>

        </main>

        <main className="print-only hide">
          <h1 className="text-center">ใบส่งของชั่วคราว</h1>
              <div>
                <table>
                  <tbody id="addressTbody">
                    <tr>
                      <td id="addressTd">ชื่อลูกค้า&emsp;&emsp;ร้านเทพประทานพร</td>
                      <td id="addressTd">Order No.&emsp;&emsp;&ensp;3602</td>
                    </tr>
                    <tr>
                      <td id="addressTd"></td>
                      <td id="addressTd">เลขที่ PO</td>
                    </tr>
                    <tr>
                      <td id="addressTd">Tel.&emsp;&emsp;&emsp;&emsp;038531680, 08115113855</td>
                      <td id="addressTd">Credit&emsp;&emsp;&emsp;&emsp;&ensp;0 วัน</td>
                    </tr>
                    <tr>
                      <td id="addressTd">การจัดส่ง</td>
                      <td id="addressTd">พนักงานขาย&emsp;&emsp;Admin</td>
                    </tr>
                    <tr>
                      <td id="addressTd">ที่อยู่จัดส่ง</td>
                      <td id="addressTd">ชำระโดย&emsp;&emsp;เงินสด</td>
                    </tr>
                    <tr>
                      <td id="addressTd">&emsp;&emsp;</td>
                      <td id="addressTd">&emsp;&emsp;</td>
                    </tr>
                    <tr>
                      <td id="addressTd">หมายเหตุ</td>
                      <td id="addressTd"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

                

                <div className="no-print">
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">ราคารวม</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  readOnly
                  name="total" ref={register2}
                  placeholder=""
                  aria-label="Item name"
                  aria-describedby="basic-addon1"
                  Value={totalPriceProducts}
                />
              </InputGroup>
              </div>


        {/* </div> */}
          </main>
      <main>
          <br />

          <div className="full-height-div">
            <table id="orderTable">
              <thead>
                <tr>

                  <th>ชื่อสินค้า</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ราคา</th>
                  <th>จำนวนเงิน</th>


                </tr>
              </thead>
              <tbody>
                {jsxBillList}
              </tbody>
              <tfoot>
                <tr>
                  <td id="addressTd" colSpan="4">รวมทั้งสิ้น</td>
                  <td id="addressTd">{totalPriceProducts + Number(fixing_price)}</td>
                </tr>
                <tr>
                  <td id="addressTd" colSpan="4">จำนวนที่ได้รับ</td>
                  <td id="addressTd">{receive_value}</td>
                </tr>
                <tr>
                  <td id="addressTd" colSpan="4">เงินทอน</td>
                  <td id="addressTd">{receive_value - (totalPriceProducts + Number(fixing_price))}</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </main>

      </form>

      <form onSubmit={handleSubmit2(onSubmitTest)}>

        <div className="no-print">
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
              name="total" ref={register2}
              placeholder=""
              aria-label="Item name"
              aria-describedby="basic-addon1"
              value={totalPriceProducts + Number(fixing_price)}
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
              onChange={e => setReceiveValue(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">เงินทอน</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              readOnly
              name="change" ref={register2}
              placeholder=""
              aria-label="Item name"
              aria-describedby="basic-addon1"
              value={receive_value - (totalPriceProducts + Number(fixing_price))}
            />
          </InputGroup>



          {/* <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="receive" ref={register2}
            placeholder=""
            type="number"
          />
        </InputGroup> */}

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="ปริ้นใบเสร็จ" />
          </Form.Group>


        </div>

        <div className="no-print">
          <ButtonGroup>
            <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
            {/* <Button href="/payment" type="submit">จ่าย</Button>{' '} */}
            <button>จ่าย</button>{' '}

            <Button onClick={() => window.print()}>บิล</Button>{' '}



            <Button variant="danger" href="/sale">ย้อนกลับ</Button>{' '}
          </ButtonGroup>

          {/* <button>จ่าย</button> */}
        </div>

      </form>
    </div>
  )
}

export async function getServerSideProps({ query }, props) {
  const { db } = await connectToDatabase();
  const { item_id } = query
  //   const customer_type = props.params.customer_type
  console.log('type === ', query.customer)
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
    .find({ "item_code": ObjectID(item_id) })
    .toArray()

  console.log(ObjectID(item_id))

  // return {
  //     props: {
  //     item: JSON.parse(JSON.stringify(item)),
  //     order: JSON.parse(JSON.stringify(order)),

  //     },
  // };
  if (query.customer === 'normal') {
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        customer_price_multiply: JSON.parse(1.2)
      },
    };
  } else {

    let percent = query.customer
    // percent.split("x")
    console.log("percent === ", percent.split("x"))
    console.log("number === ", percent.split("x")[1])
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        customer_price_multiply: JSON.parse(Number(1 + Number(percent.split("x")[1]) / 100))
      },
    };
  }
}