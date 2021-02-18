import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import AvailableList from '../components/availableList';
import SearchBar from '../components/search_name'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connectToDatabase } from "../util/mongodb";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { colourOptions, groupedOptions, groupStyles, groupBadgeStyles, animatedComponents, options } from '../pages/data';
import Link from 'next/link'

import React, { useState, useEffect } from 'react';
import ItemList from '../components/itemList'
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

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


 
export default function Inventory({ item: items }) {

  console.log("item: ", items)

  const { register, handleSubmit, control, watch, errors } = useForm();

  const [input, setInput] = useState('');
  const [itemListDefault, setItemListDefault] = useState();
  const [itemList, setItemList] = useState();
    
  const [brandListDefault, setBrandListDefault] = useState();
  const [brandList, setBrandList] = useState();    


  const updateInput = async (input) => {
    if(input != items.brand){

    
    const filtered = itemListDefault.filter(item => {
     return item.product_name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setItemList(filtered);
    }
    else{
      const filtered = brandListDefault.filter(item => {
        return item.brand.toLowerCase().includes(input.toLowerCase())
       })
       setInput(input);
       setBrandList(filtered);
    }
    
 }

 // filter is a JSON object having brand and model
 let [filter,setFilter] = useState({
   brand: 'ptt',
  //  model: '0w20'
 })

 useEffect( () => {
   setItemList(items)
   setItemListDefault(items)
 },[]);

  const edit = (itemId) => {
    console.log({itemId})
  }

  const handleBrandChange = (value) => {
    setFilter({brand: value})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Stock Manangement
        </h1>

        <br></br><br></br>

        <div>
          {/* <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ค้นหา</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              input={input} 
              onChange={updateInput}
            />
          </InputGroup> */}
          <SearchBar input={input} 
                      onChange={updateInput} />
          
          
          <BrandList brandChange={handleBrandChange}/>
          <ModelList />
          
          รุ่นที่ใช้ได้: <Controller
          name="avi_model"
          type="select"
          control={control}


          render={({ onChange, onBlur, value }) => (
            <Select
              onChange={onChange}
              onBlur={onBlur}
              value={value}  // this is what you need to do
              isMulti
              options={groupedOptions}
              ref={register}
            />
          )}
        />

        </div>

        <div>
        <ItemList ItemList={itemList} filter={filter}/>

          {/* <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>ชื่อสินค้า</th>
                <th>รหัสสินค้า</th>
                <th>ยี่ห้อสินค้า</th>
                <th>รุ่นสินค้า</th>
                
                <th>Barcode ID</th>
                <th>จำนวน</th>
                <th>จำนวนจำกัด</th>
                <th>ราคา</th>
                <th>วันที่บันทึก</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr>
                  <td>
                  <Link href={`/additem/${p._id}`}>
            <a>
              Edit
                    {p._id}
            </a>
          </Link>
                    </td>
                  <td>{p.product_name}</td>
                  <td>{p.code}</td>
                  <td>{p.brand}</td>
                  <td>{p.model}</td>
                  
                  <td>{p.barcode_id}</td>
                  <td>{p.amount}</td>
                  <td>{p.limit_amount}</td>
                  <td>{p.purchase_price}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </div>
      </main>

      <div class="button">
        <Button variant="primary" href="/additem/new" size="lg">เพิ่มสินค้า</Button>{' '}
        <Button variant="secondary" size="lg">สแกนบาร์โค้ด</Button>{' '}
      </div>

    </div>
  )
}

// {item.map((items) => (
//   <tr>
//     <td>1</td>
//     <td>{items.product_name}</td>
//     <td>{items.code}</td>
//     <td>{items.brand}</td>
//     <td>{items.model}</td>
    
//     <td>{items.barcode_id}</td>
//     <td>{items.amount}</td>
//     <td>{items.limit_amount}</td>
//     <td>{items.purchase_price}</td>
//   </tr>
// ))}
// </tbody>
// </Table>
// </div>
// </main>

// <ButtonGroup horizontal>
// <Button variant="primary" href="/additem" size="sm">เพิ่มสินค้า</Button>{' '}
// <Button variant="secondary" size="sm">สแกนบาร์โค้ด</Button>{' '}
// </ButtonGroup>

// </div>
// )
// }



// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();

//   const item = await db
//     .collection("item")
//     .find()
//     .sort({})
//     .limit(20)
//     .toArray();

//   return {
//     props: {
//       item: JSON.parse(JSON.stringify(item)),
//     },
//   };
// }