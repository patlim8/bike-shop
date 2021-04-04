import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ButtonBar from '../../../components/buttonBar';
import ButtonBar from '../../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button';
import { connectToDatabase } from "../../util/mongodb"
import { ObjectId } from 'bson';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import hasNewItem from '../../pages/needItem'
import hasNewItemStock from '../../pages/stock'

import { format } from 'date-fns'
import { Col, Row } from 'react-bootstrap';
// import _uniqueId from 'lodash/uniqueId';

export default function AddItem({ item: items, brand: brands, model: models }) {

  // console.log("AddItem", { items })

  // const [id] = useState(_uniqueId('prefix-'));
  const [newItem, setNewItem] = useState(false);
  const [buyOrder, setBuyOrder] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);

  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [aviArray, setAviArray] = useState([]);




  const modelOptions = models.map(model => (
    {
      label: '' + model.name,
      // value: ''+brand._id,
      value: '' + model.name,

    }
  )

  )

  let [filter, setFilter] = useState({
    brand: '',
    id: '',
    model: ''
  })

  const handleBrandChange = (value) => {
    console.log("brand === ", value.value)
    setSelectedBrand(value.value)

    brands.map(brand => {
      if (value.value == brand.name) {
        setFilter({ brand: value.value, id: brand._id, model: '' })
        console.log("value ==== ", filter)
      }
    })

  }

  const handleModelChange = (value) => {
    console.log("model === ", value)
    setSelectedModel(value.value)


  }

  const handleCheck = (event) => {
    if (event.target.checked) {

      // console.log("check")
      setNewItem(true)
    } else {
      setNewItem(false)
      // console.log("not check")
    }

  }





  const brandOptions = brands.map(brand => (
    {
      label: '' + brand.name,
      // value: ''+brand._id,
      value: '' + brand.name,

    }
  )


  )

  const modelListOptions = models.filter(m => m.brand === filter.id).map(model => (
    { label: '' + model.name, value: '' + model.name }
    // label: ''+model.name, 
    //   // value: ''+brand._id,
    // value: ''+model.name,
  )
  )
  // const tempID = uuidv4();
  // console.log(tempID)
  // console.log(item._id)
  // console.log(ObjectId(item._id))


  var data = items;
  // setModel(data.model)

  
  const dummyData = {
    // _id: tempID,
    product_name: '',
    avi_model: [],
    code: '',
    brand: '',
    model: '',
    barcode_id: '',
    purchase_price: 0,
    qty: 0,
    minStock: 0,
    date: ""
  }
  
  if (items === null) {
    // Add new item, prepare blank form
    // in this case, use dummyData
    data = dummyData
  }

  // const setDefaultBlank = () => {
  //   console.log("setDefaultBlank")
  //   data = dummyData
  // }

  let array = []

  data.avi_model.map(avi => array.push(modelOptions[modelOptions.findIndex((model) => model.value == avi)], setAviArray(array) ))
  

  // console.log(array)

  // console.log("id ==", data._id)


  const { register, handleSubmit, control, watch, errors } = useForm();

  const onSubmit = (data, e) => {
    // TODO avi model is not yet implemented
    // data['avi_model'] = []
    let temp_avi = data.avi_model
    data['avi_model'] = []

    // temp_avi.map(avi => data['avi_model'].push(avi.value))
    if(selectedBrand != '' && selectedModel != ''){
      console.log("ok")
      data['brand'] = selectedBrand
      data['model'] = selectedModel
    }else{
      data['brand'] = brand
      data['model'] = model
    }

    // console.log(data['brand'])

    let date = new Date()
    data['date'] = format(date, 'yyyy-LL-dd')
    console.log(data)

    let order = {
      product_name: data.product_name, type: '',
      qty: 0, unit_price: data.purchase_price, expense: 0
    }
    if (newItem == true) {
      order.type = 'Buy'
    }

    order.date = format(date, 'yyyy-LL-dd')

    if (data._id === "") {
      order.qty = data.qty
    } else {
      order.qty = data.qty - items.qty
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
        fetch('/api/balance/buy', {
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
            alert("Add Balance :\nResponse from server " + data.message)
            alert("Newly added _id in Balance", data._id)
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
        fetch('/api/balance/buy', {
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
            alert("Add Balance :\nResponse from server " + data.message)
            alert("Newly added _id in Balance", data._id)
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

  const onsubmit_test = (data) => {

    let date = new Date()

    console.log(format(date, "yyyy-MM-dd"))
    // console.log(data)

  }

  // console.log(brandOptions)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>
          {data._id === undefined ? 'New Item' : 'Edit'}
          {/* {console.log('data == ', data)} */}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />


      <Container>
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
{/* 
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
          </InputGroup><br></br> */}

          {/* ยี่ห้อสินค้า: <select name="brand" ref={register} defaultValue={data.brand}>
          {brands.map((p) => (
            <option value = {p.name}>{p.name}</option>
          ))}
        </select><br></br> */}

          {/* ยี่ห้อสินค้า: <Select

              // options={brandOP}
              // defaultValue={inputBrand}
              options={brandOptions}
              isClearable={true}
              // isMulti
              // className="basic-multi-select"
              // classNamePrefix="select"
              // formatGroupLabel={formatGroupLabel}
              onChange={handleBrandChange}
              /> */}

            ยี่ห้อสินค้า:    <Controller
            render={(props) => (
              <Select
                onChange={(e) => props.onChange(handleBrandChange(e))}
                options={brandOptions}
                defaultValue={brandOptions[brandOptions.findIndex((brand) => brand.value == data.brand, setBrand(data.brand))]}
                // value={props.onChange}
                ref={register} />
            )}
            // defaultValue={data.brand}
            control={control}
            name="brand"
          // ref={register} 
          />

          {/* รุ่นสินค้า: <select name="model" ref={register} defaultValue={data.model}>
          {models.map((i) => (
            <option value = {i.name}>{i.name}</option>
          ))}
        </select><br></br> */}

          {/* รุ่นสินค้า: <Controller
            as={Select}
            options={modelListOptions}
            onChange={handleModelChange}
            isClearable={true}
            name="model"
            control={control}
          // value={inputModel}
          // options={modelOP}
          // formatGroupLabel={formatGroupLabel}
          /> */}

        รุ่นสินค้า: <Controller
            render={(props) => (
              <Select
                onChange={(e) => props.onChange(handleModelChange(e))}
                options={modelListOptions}
                defaultValue={modelOptions[modelOptions.findIndex((model) => model.value == data.model, setModel(data.model))]}

                // value={props.onChange}
                ref={register} />
            )}
            control={control}
            name="model"
          // ref={register} 
          />



          {/* รุ่นสินค้า: <Controller
                        name="model"
                        type="select"
                        control={control}


                        render={({ onChange, onBlur, value }) => (
                          
                            <Select
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}  // this is what you need to do
                                isMulti
                                // options={groupedOptions}
                                options={modelOptions}
                                // options={option}
                                ref={register}
                            />
                        )}
                    /> */}



        {/* รุ่นที่ใช้ได้: <Controller
            name="avi_model"
            type="select"
            control={control}


            render={({ onChange, onBlur, value }) => (

              <Select
                defaultValue={array}
                onChange={onChange}
                onBlur={onBlur}
                value={value}  // this is what you need to do
                isMulti
                // options={groupedOptions}
                options={modelOptions}
                // options={option}
                ref={register}
              />
            )}
          /> */}

        รุ่นที่ใช้ได้: <Select
                defaultValue={array}
                
                  // this is what you need to do
                isMulti
                // options={groupedOptions}
                options={modelOptions}
                // options={option}
                ref={register}
              />
            
          

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

          <div>
            สินค้าใหม่<input type="checkbox" onChange={handleCheck}></input>
          </div>

        </main>

        <div>
        <Button variant="dark" size="lg" className={styles.floatL}>กลับ</Button>&emsp;
          {data._id === undefined ? <Button type="submit" id="add_item" size="lg" className={styles.floatR}>เพิ่ม</Button> :
            <div className={styles.floatR}>
              <Button variant="warning" type="submit" id="update_item" size="lg">อัพเดต</Button> <Button variant="danger" type="submit" id="del_item" size="lg">ลบสินค้า</Button>
            </div>
          } &emsp;&emsp;&emsp;
              
          </div>
        <br /><br /><br />
      </Container>
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
      .findOne(
        { _id: ObjectId(itemId) }
      )


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
