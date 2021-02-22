import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';


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
import { ObjectID } from 'bson';

import React, { useState, useEffect } from 'react';
import ItemList from '../components/itemList'
import BrandOP from './data'
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
            item: JSON.parse(JSON.stringify(item)),
            brand: JSON.parse(JSON.stringify(brand)),
            model: JSON.parse(JSON.stringify(model)),
        },
    };
}

const onSubmit = (data) => {
    // TODO avi model is not yet implemented

    // buyOrder.push(p)
    // setBuyOrder(buyOrder)
    fetch('/api/model', {
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
        alert("Add New Model:\nResponse from server " + data.message)
        alert("Newly added _id",data._id)
    });
}

const onSubmit_brand = (data) => {
    // TODO avi model is not yet implemented

    // buyOrder.push(p)
    // setBuyOrder(buyOrder)
    fetch('/api/brand', {
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
        alert("Add New Model:\nResponse from server " + data.message)
        alert("Newly added _id",data._id)
    });
}

export default function modelManager({ item: items, brand, model }) {

    console.log("item: ", items)

    const { register, handleSubmit, control, watch, errors } = useForm();

    const [input, setInput] = useState('');
    const [itemListDefault, setItemListDefault] = useState();
    const [itemList, setItemList] = useState();

    const [brandListDefault, setBrandListDefault] = useState();
    const [brandList, setBrandList] = useState();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const updateInput = async (input) => {
        if (input != items.brand) {


            const filtered = itemListDefault.filter(item => {
                return item.product_name.toLowerCase().includes(input.toLowerCase())
            })
            setInput(input);
            setItemList(filtered);
        }
        else {
            const filtered = brandListDefault.filter(item => {
                return item.brand.toLowerCase().includes(input.toLowerCase())
            })
            setInput(input);
            setBrandList(filtered);
        }

    }

    // filter is a JSON object having brand and model
    let [filter, setFilter] = useState({
        brand: 'ptt',
        //  model: '0w20'
    })

    useEffect(() => {
        setItemList(items)
        setItemListDefault(items)
    }, []);

    const edit = (itemId) => {
        console.log({ itemId })
    }

    const handleBrandChange = (value) => {
        setFilter({ brand: value })
    }

    // var getModel = []
    // if (model.brand === brand._id) {
    //     getModel = [
    //         {brand_id: brand._id, name: brand.name, model_name: model.name
    //     }]
    // }

    return (
        <div className={styles.container}>
            <Head>
                <title>Inventory</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ButtonBar />



            <main className={styles.main}>
                <h1 className={styles.title}>
                    จัดการรุ่นสินค้า
        </h1>

                <br></br><br></br>

                <div>

                    <BrandList brandChange={handleBrandChange} brand={brand} />
                    <ModelList model={model}/>

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
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ยี่ห้อสินค้า</th>
                                <th>รุ่นสินค้า</th>
                                <th>รุ่นที่ใช้ได้</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brand.map((p) => (model.map((i) => (i.brand == p._id) ?
                                <tr>
                                     <td>{i._id}</td>
                                     <td>{i.name}</td>
                                     <td>{p.name}</td>
                                     
                                 </tr>
                                 : null
                            
                            )
                                // <tr>
                                //     <td>{p._id}</td>
                                //     <td>{p.name}</td>
                                //     {model.map((i) => (i.brand == p._id) ? <td>{i.name}</td> : <td>Error</td>
                                //     )}
                                // </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </main>

            <div class="button">
            <Button variant="primary" onClick={handleShow2}>
          เพิ่มยี่ห้อสินค้า
        </Button>
  
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มยี่ห้อสินค้า</Modal.Title>
          </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit_brand)}>
          <Modal.Body>
            


                ยี่ห้อที่ต้องการเพิ่ม: <input type="text" name="name" ref={register}>
                </input>

            
          </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                ปิด
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose2}>
                บันทึก
                </Button>
            </Modal.Footer>
          </form>
        </Modal>



            <Button variant="primary" onClick={handleShow}>
          เพิ่มรุ่นสินค้า
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มรุ่นสินค้า</Modal.Title>
          </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            

                ยี่ห้อสินค้า: <select name="brand" ref={register}>
                    {brand.map(data => (<option value={data._id}>{data.name}</option>))}
            
                    </select><br></br>

                รุ่นที่ต้องการเพิ่ม: <input type="text" name="model" ref={register}>
                </input>

            
          </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                ปิด
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose}>
                บันทึก
                </Button>
            </Modal.Footer>
          </form>
        </Modal>


                {/* <Button variant="primary" href="/" size="lg">เพิ่มรุ่นสินค้า</Button>{' '} */}
                <Button variant="primary" href="/" size="lg">อัพเดตรุ่นที่ใช้ได้</Button>{' '}
            </div>
        </div>
    )
}