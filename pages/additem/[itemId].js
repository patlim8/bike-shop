import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ButtonBar from '../../../components/buttonBar';
import ButtonBar from '../../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
// import BrandList from '../../../components/brandList';
// import ModelList from '../../../components/modelList'
// import AvailableList from '../../../components/availableList'

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connectToDatabase } from "../../util/mongodb"
import { ObjectId } from 'bson';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { colourOptions, groupedOptions, groupStyles, groupBadgeStyles, animatedComponents, options } from '../../pages/data';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import BrandList from '../../components/brandList';
import ModelList from '../../components/modelList';
// import _uniqueId from 'lodash/uniqueId';

export default function AddItem({ item, brand, model }) {

  console.log("AddItem", { item })

  // const [id] = useState(_uniqueId('prefix-'));

  const [buyOrder, setBuyOrder] = useState([]);
  // const tempID = uuidv4();
  // console.log(tempID)
  // console.log(item._id)
  // console.log(ObjectId(item._id))


  var data = item;

  if (item === null) {
    // Add new item, prepare blank form
    // in this case, use dummyData
    const dummyData = {
      // _id: tempID,
      product_name: 'น้ำมันเครื่อง',
      avi_model: [],
      code: 'DW001',
      brand: 'ptt',
      model: '5w40',
      barcode_id: '865406549874981987',
      purchase_price: 100,
      qty: 10,
      minStock: 4,
      date: ""
    }

    data = dummyData

  }

  console.log(data._id)


  const { register, handleSubmit, control, watch, errors } = useForm();
  const onSubmit = (data, e) => {
    // TODO avi model is not yet implemented
    data['avi_model'] = []
    data['date'] = new Date()
    console.log(data)

    let order = {
      product_name: data.product_name, type: "Buy",
      qty: 0, unit_price: data.purchase_price, expense: 0
    }


    if (data._id === "") {
      order.qty = data.qty
    } else {
      order.qty = data.qty - item.qty
    }

    order.expense = order.unit_price * order.qty

    // buyOrder.push(p)
    // setBuyOrder(buyOrder)



    const submitterId = e.nativeEvent.submitter.id;
    console.log({ submitterId })

    if (submitterId === 'add_item') {
      fetch('/api/item', {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Add Item:\nResponse from server " + data.message)
          alert("Newly added _id", data._id)
        });

      if (order.qty != 0) {
        console.log(order)
        fetch('/api/order2', {
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
          body: JSON.stringify(order) // body data type must match "Content-Type" header
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert("Add Order2 :\nResponse from server " + data.message)
            alert("Newly added _id in Order2", data._id)
          });
      }



    } else if (submitterId == 'update_item') {
      fetch('/api/item', {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Response from server " + data.message)
        });


      if (order.qty != 0) {
        console.log(order)
        fetch('/api/order2', {
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
          body: JSON.stringify(order) // body data type must match "Content-Type" header
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert("Add Order2 :\nResponse from server " + data.message)
            alert("Newly added _id in Order2", data._id)
          });
      }


    } else if (submitterId === 'del_item') {
      fetch('/api/item', {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
          alert("Delete Item\nResponse from server " + data.message)
        });
    }
  }
  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );





  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>
          {data._id === undefined ? 'New Item' : 'Edit'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          {data._id === undefined ? 'New Item' : 'Edit'}
        </h1> <br></br><br></br><br></br>


        {/* <form onSubmit={handleSubmit(onSubmit)}> in case of error*/}

        {/* <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ID"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup> */}

        {/* <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup> */}

        {/* ชื่อสินค้า: <input type="text" name="product_name" ref={register({ required: true })} /><br/> */}

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="_id">_ID</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            readOnly
            placeholder="_ID"
            aria-label="ID"
            aria-describedby="_id"
            type="text"
            name="_id"
            defaultValue={data._id}
            ref={register({ id: data._id })}
          />
        </InputGroup><br></br>

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="ชื่อสินค้า"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="text"
            name="product_name"
            defaultValue={data.product_name}
            ref={register({ required: true })}
          />
        </InputGroup><br></br>

        {/* <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">รหัสสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="รหัสสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup> */}

        {/* รหัสสินค้า: <input type="text" name="code" ref={register} /><br/> */}

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">รหัสสินค้า</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="รหัสสินค้า"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="text" name="code"
            defaultValue={data.code}
            ref={register}
          />
        </InputGroup><br></br>

        {/* <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ยี่ห้อสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ยี่ห้อ"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              type="text" name="brand" ref={register({ required: true })}
            />
          </InputGroup> */}
          ยี่ห้อสินค้า: <select name="brand" ref={register} defaultValue={data.brand}>
          {brand.map((p) => (
            <option value = {p.name}>{p.name}</option>
          ))}
        </select><br></br>

        {/* <div>
              ยี่ห้อสินค้า: 
              <Select
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                name="brand" ref={register({ required: true })}
            />
            </div> */}

          รุ่นสินค้า: <select name="model" ref={register} defaultValue={data.model}>
          {model.map((i) => (
            <option value = {i.name}>{i.name}</option>
          ))}
        </select><br></br>

        {/* รุ่นที่ใช้ได้: <Select
            name="avi_model"
            components={animatedComponents}
            isMulti
            options={options}
            inputRef={register} /> */}

        {/* รุ่นที่ใช้ได้
        <Controller
          name="avi_model"
          type="select"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Select
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}  // this is what you need to do
              isMulti
              options={options}
              ref={register}
            />
          )}
        /><br></br> */}
        {/*           
          <ModelList type="text" name="model" ref={register({ required: true })}/>

          <AvailableList type="text" name="avi_model" ref={register({ required: true })} /> */}


        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Barcode ID</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Barcode ID"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="text"
            name="barcode_id"
            ref={register}
            defaultValue={data.barcode_id}
          />
        </InputGroup><br></br>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">ราคาซื้อ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="ราคาซื้อ"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="double" name="purchase_price"
            ref={register}
            defaultValue={data.purchase_price}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวน</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="จำนวน"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="int32" name="qty" ref={register}
            defaultValue={data.qty}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนขั้นต่ำ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="จำนวนขั้นต่ำ"
            aria-label="Item name"
            aria-describedby="basic-addon1"
            type="int32" name="minStock" ref={register}
            defaultValue={data.minStock}
          />
        </InputGroup>



      </main>

      <div id="buttons">
        <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
        <Button variant="danger" type="submit" id="del_item">ลบสินค้า</Button>{' '}

        {data._id === undefined ? <Button type="submit" id="add_item">เพิ่ม</Button> : <Button variant="warning" type="submit" id="update_item">อัพเดต</Button>}


        <Button variant="dark">กลับ</Button>{' '}
      </div>
    </form>
  )
}

export async function getServerSideProps(props) {
  console.log('props === ', { props })
  const itemId = props.params.itemId
  console.log('_ID', { itemId })
  if (itemId === 'new') {
    console.log("Request to add new item, ignore search existing item from database.")

    const { db } = await connectToDatabase()

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
    return {
      props: {
        item: null,
        brand: JSON.parse(JSON.stringify(brand)),
        model: JSON.parse(JSON.stringify(model)),
      }
    }
  } else {

    const { db } = await connectToDatabase()

    const item = await db
      .collection("item")
      .findOne(
        { _id: ObjectId(itemId) }
      )

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

    console.log("Found", { item })
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
        brand: JSON.parse(JSON.stringify(brand)),
        model: JSON.parse(JSON.stringify(model)),
      },
    };
  }
}
