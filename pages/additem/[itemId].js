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
import { colourOptions, groupedOptions, groupStyles, groupBadgeStyles, animatedComponents, options } from '../../components/data';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function AddItem({ item }) {

  console.log("AddItem", { item })

  var data = item;

  if (item === null) {
    // Add new item, prepare blank form
    // in this case, use dummyData
    const dummyData = {
      _id: 'new',
      product_name: 'น้ำมันเครื่อง',
      avi_model: [],
      code: 'DW001',
      brand: 'ptt',
      model: '5w40',
      barcode_id: '865406549874981987',
      purchase_price: 100,
      qty: 10,
      minStock: 4
    }

    data = dummyData

  }

  console.log(data._id)


  const { register, handleSubmit, control, watch, errors } = useForm();
  const onSubmit = (data, e) => {
    // TODO avi model is not yet implemented
    data['avi_model'] = []
    console.log(data)


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
          alert("Response from server " + data.message)
        });
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
          alert("Response from server " + data.message)
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
          {data._id === 'new' ? 'New Item' : 'Edit'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
        {data._id === 'new' ? 'New Item' : 'Edit'}
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
            // readOnly
            placeholder="_ID"
            aria-label="ID"
            aria-describedby="_id"
            type="text"
            name="_id"
            defaultValue={data._id}
            ref={register({id: data._id})}
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
          <option value="mobil1">Mobil1</option>
          <option value="eneos">Eneos</option>
          <option value="ptt">PTT</option>
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
          <option value="0w20">0w-20</option>
          <option value="5w40">5w-40</option>
          <option value="10w40">10w-40</option>
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

        {data._id === 'new' ? <Button type="submit" id="add_item">เพิ่ม</Button> : <Button variant="warning" type="submit" id="update_item">อัพเดต</Button>}
        
        
        <Button variant="dark">กลับ</Button>{' '}
      </div>
    </form>
  )
}

export async function getServerSideProps(props) {
  // console.log({props})  
  const itemId = props.params.itemId
  console.log('_ID', { itemId })
  if (itemId === 'new') {
    console.log("Request to add new item, ignore search existing item from database.")
    return {
      props: {
        item: null
      }
    }
  } else {

    const { db } = await connectToDatabase()

    const item = await db
      .collection("item")
      .findOne(
        { _id: itemId }
      )

    console.log("Found", { item })
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
      },
    };
  }
}
