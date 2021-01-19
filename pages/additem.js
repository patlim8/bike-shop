import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import AvailableList from '../components/availableList'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connectToDatabase } from "../util/mongodb"
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { colourOptions, groupedOptions, groupStyles, groupBadgeStyles, animatedComponents, options } from '../components/data';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function AddItem({ item }) {

  const { register, handleSubmit, control, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data)

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
        alert("Response from server "+data.message)
      });

  }
  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  

  return (
    // <div className={styles.container}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>Add/Edit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Add/Edit
        </h1>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}

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
              <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              type="text" name="product_name" ref={register({ required: true })}
            />
          </InputGroup>

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
              type="text" name="code" ref={register}
            />
          </InputGroup>

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
          ยี่ห้อสินค้า: <select name="brand" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
        </select>

          {/* <div>
              ยี่ห้อสินค้า: 
              <Select
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                name="brand" ref={register({ required: true })}
            />
            </div> */}
          
          รุ่นสินค้า: <select name="model" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
        </select>

        {/* รุ่นที่ใช้ได้: <Select
            name="avi_model"
            components={animatedComponents}
            isMulti
            options={options}
            inputRef={register} /> */}

<Controller
    name="avi_model"
    type="select"
    control={control}
    

    render={({ onChange, onBlur, value }) => (
        <Select
             onChange={onChange}
             onBlur={onBlur}
             value={value}  // this is what you need to do
             isMulti
             options={options}
             ref={register}
        />
    )}
/> 
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
              type="text" name="barcode_id" ref={register}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ราคาซื้อ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ราคาซื้อ"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              type="double" name="purchase_price" ref={register}
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
              type="int32" name="amount" ref={register}
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
              type="int32" name="limit_amount" ref={register}
            />
          </InputGroup>
          
          

      </main>

      <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
      <Button variant="danger">ลบสินค้า</Button>{' '}
      <ButtonGroup>
        <Button type="submit">ยืนยัน</Button>{' '}
        <Button variant="dark">กลับ</Button>{' '}
      </ButtonGroup>
    </form>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const item = await db
    .collection("item")
    .find({})
    .sort({})
    .limit(20)
    .toArray();

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
    },
  };
}
