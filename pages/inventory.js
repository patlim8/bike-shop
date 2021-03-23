import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import SearchBar from '../components/search_name'
import Button from 'react-bootstrap/Button';
import { connectToDatabase } from "../util/mongodb";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap'
import { colourOptions, groupedOptions, groupStyles, groupBadgeStyles, animatedComponents, options } from '../pages/data';
import Link from 'next/link'
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'

import React, { useState, useEffect } from 'react';
import ItemList from '../components/itemList'

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const item = await db
    .collection("item")
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

  const brand = await db
    .collection("brand")
    .find()
    .sort({})
    .limit(20)
    .toArray();


  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
      model: JSON.parse(JSON.stringify(model)),
      brand: JSON.parse(JSON.stringify(brand)),

    },


  };

}



export default function Inventory({ item: items, brand: brands, model: models }) {

  console.log("All item in database: ", items)

  const { register, handleSubmit, control, watch, errors } = useForm();

  const [input, setInput] = useState('');
  const [inputBrand, setInputBrand] = useState();
  const [inputModel, setInputModel] = useState();

  const [itemListDefault, setItemListDefault] = useState();
  const [itemList, setItemList] = useState();

  const [brandListDefault, setBrandListDefault] = useState();
  const [brandList, setBrandList] = useState();

  // filter is a JSON object having brand and model
  let [filter, setFilter] = useState({
    brand: '',
    id: '',
    model: '',
    avi_model: []
  })

  const brandOptions = brands.map(brand => (
    {
      label: '' + brand.name,
      // value: ''+brand._id,
      value: '' + brand.name,

    }
  ), [{ label: 'empty', value: 'empty' }]

  )

  const modelOptions = models.map(model => (
    {
      label: '' + model.name,
      // value: ''+brand._id,
      value: '' + model.name,

    }
  ),
    [{ label: '', value: '' }]
  )


  const modelListOptions = models.filter(m => m.brand === filter.id).map(model => (
    { label: '' + model.name, value: '' + model.name }
    
  )
  )



  const handleOnChange = e => {
    console.log(e.value)
    brandChange(e.value)
  }


  const updateInput = async (input) => {
    console.log("input ==== ", input)
    if (input != items.brand) {
      // if(input == String && input.value != undefined ){


      const filtered = itemListDefault.filter(item => {
        return item.product_name.toLowerCase().includes(input.toLowerCase())
      })
      console.log("filter ==== ", filtered)
      setInput(input);
      setItemList(filtered);
      console.log("itemList ==== ", itemList)
    }
    // else{
    //   const filtered = brandListDefault.filter(item => {
    //     return item.brand.toLowerCase().includes(input.value.toLowerCase())
    //    })
    //    console.log("222222222222222222")
    //    setInput(input);
    //    setBrandList(filtered);
    // }

  }


  const updateBrand = async (input) => {

    const filtered = itemListDefault.filter(item => {
      return item.brand.toLowerCase().includes(input.value.toLowerCase())
    })
    console.log("222222222222222222")
    //  setInput(input);
    setBrandList(filtered);


  }



  useEffect(() => {
    // This will run after the first render, only once
    setItemList(items)
    setItemListDefault(items)
    { console.log("itemList ====", itemList) }
    { console.log("itemListDefalut ====", itemListDefault) }
  }, []);

  useEffect(() => {
    // This will run when filter is set.
    console.log("filter update ----", filter)
  }, [filter])


  const edit = (itemId) => {
    console.log({ itemId })
  }

  const handleBrandChange = (value) => {
    let temp_avi = filter.avi_model

    if (value != null) {
      brands.map(brand => {
        if (value.value == brand.name) {
          setFilter({ brand: value.value, id: brand._id, model: '', avi_model: temp_avi })
          setInputModel('')
          console.log("value ==== ", filter)
        }
      })
    } else {
      setFilter({ brand: '', id: '', model: '', avi_model: [] })
    }


  }

  const handleModelChange = (value) => {
    let temp_brand = filter.brand
    let temp_id = filter.id
    let temp_avi = filter.avi_model

    if (value != null) {
      // console.log("model ====", value.value)
      setFilter({ brand: temp_brand, id: temp_id, model: value.value, avi_model: temp_avi })
      console.log(filter)
    } else {
      setFilter({ brand: temp_brand, id: temp_id, model: '', avi_model: temp_avi })
    }

  }

  const handleAviModelChange = (obj) => {
    console.log("obj === ", obj)
    // console.log(obj[0].value)
    let temp_brand = filter.brand
    let temp_id = filter.id
    let temp_model = filter.model

    if (obj != null) {
      // console.log("value avi ======= ",obj.label)
      // console.log("model ====", value.value)
      console.log('obj', obj)

      let newFilter = { brand: temp_brand, id: temp_id, model: temp_model, avi_model: [] }

      obj.map(avi => newFilter.avi_model.push(avi.value))

      setFilter(newFilter)
      // console.log('filter', filter)
      // console.log(filter.avi_model.value)
      // newFilter.avi_model.map(avi_model => console.log('--->', avi_model.value))
    }else{
      setFilter({ brand: temp_brand, id: temp_id, model: temp_model, avi_model: [] })
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>

      <Container>
        <main className={styles.main}>
          <Row>
            <Col sm={8}>
              <h1 className={styles.title}>Stock Manangement</h1>
            </Col>
          </Row>

          <br></br><br></br>

          <div>
            <SearchBar input={input}
              onChange={updateInput} />

            <Row>
              <Col sm={6}>
                ยี่ห้อสินค้า: <Select

                  // options={brandOP}
                  // defaultValue={inputBrand}
                  options={brandOptions}
                  isClearable={true}
                  // isMulti
                  // className="basic-multi-select"
                  // classNamePrefix="select"
                  // formatGroupLabel={formatGroupLabel}
                  onChange={handleBrandChange} />
              </Col>
              <Col sm={6}>
                รุ่นสินค้า: <Select
                  options={modelListOptions}
                  onChange={handleModelChange}
                  isClearable={true}
                // value={inputModel}
                // options={modelOP}
                // formatGroupLabel={formatGroupLabel}
                />
              </Col>

            </Row>


          รุ่นที่ใช้ได้:

            <Select
              onChange={handleAviModelChange}
              // onBlur={onBlur}
              // value={value}  // this is what you need to do
              isMulti
              isSearchable={true}
              options={modelOptions}
            // ref={register}
            />



          </div>

          <div>
            <ItemList ItemList={itemList} filter={filter} />
          </div>
        </main>
      </Container>

      <div class="button">
        <Button variant="primary" href="/additem/new" size="lg">เพิ่มสินค้า</Button>{' '}
        {/* <Button variant="secondary" size="lg">สแกนบาร์โค้ด</Button>{' '} */}
      </div>

    </div>
  )
}
