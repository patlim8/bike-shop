import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button';
import { connectToDatabase } from "../util/mongodb";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'

import React, { useState } from 'react';
import ModelMgntList from '../components/modelMgntList'

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

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
            alert("Newly added _id", data._id)
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
            alert("Newly added _id", data._id)
        });
}

export default function modelManager({ brand: brands, model: models }) {

    console.log("brands: ", brands)
    console.log("models: ", models)

    // console.log(brand[0]._id)

    const { register, handleSubmit, control, watch, errors } = useForm();

    const [inputBrand, setInputBrand] = useState();
    const [inputModel, setInputModel] = useState();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    // const id = brands[0]._id
    // console.log(id)

    // filter is a JSON object having brand and model
    let [filter, setFilter] = useState({
        brand: '',
        id: '',
        model: '',
        avi_model: []
    })


    const groupedOptions = brands.map(brand => (
        {
            label: '' + brand._id,
            value: '' + brand._id,
            //   options: modelOptions(''+brand._id),

        }
    )

    )

    const brandOptions = brands.map(brand => (
        {
            label: '' + brand.name,
            // value: ''+brand._id,
            value: '' + brand.name,

        }
    ), [{ label: 'empty', value: 'empty' }]

    )

    console.log("brandOption", brandOptions)

    const modelOptions = models.map(model => (
        {
            label: '' + model.name,
            // value: ''+brand._id,
            value: '' + model.name,

        }
    )

    )

    const modelListOptions = models.filter(m => m.brand === filter.id).map(model => (

        model.brand === filter.id ? ({ label: '' + model.name, value: '' + model.name }) : ({})

    )
    )


    const option = [
        {
            label: 'ยี่ห้อ', value: '0',
        }
    ];

    let Modelss = []

    brands.map((p) => (models.map((i) => (i.brand == p._id) ?
        Modelss.push({ model_id: i._id, model_name: i.name, brandName: p.name, brand_id: p._id })
        : null)
    ))


    console.log("Modelss", Modelss)

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
            setFilter({ brand: temp_brand, id: temp_id, model: value.value, avi_model: temp_avi })
            console.log(filter)
        } else {
            setFilter({ brand: temp_brand, id: temp_id, model: '', avi_model: temp_avi })
        }
    }

    const handleAviModelChange = (e) => {
        console.log(e[0].value)
        console.log("value avi ======= ", e.label)
        let temp_brand = filter.brand
        let temp_id = filter.id
        let temp_model = filter.model

        if (e != null) {
            setFilter({ brand: temp_brand, id: temp_id, model: temp_model, avi_model: e })
            console.log(filter)
            filter.avi_model.map(avi_model => console.log(avi_model.value))
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>จัดการรุ่นสินค้า</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />


            <Container>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        จัดการรุ่นสินค้า
        </h1>

                    <br></br><br></br>

                    <div>

                        ยี่ห้อสินค้า: <Select
                            options={brandOptions}
                            isClearable={true}
                            onChange={handleBrandChange}
                        />

                    รุ่นสินค้า: <Select
                            options={modelListOptions}
                            onChange={handleModelChange}
                            isClearable={true}
                        />

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
                                    options={modelOptions}
                                    ref={register}
                                />
                            )}
                        />

                    </div>

                    <br />

                    <div>
                        <ModelMgntList modelMgntList={Modelss} filter={filter} />
                    </div>

                </main>

                <div>
                    <Button variant="primary" onClick={handleShow2} size="lg">
                        เพิ่มยี่ห้อสินค้า
        </Button>&emsp;

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



                    <Button variant="primary" onClick={handleShow} size="lg">
                        เพิ่มรุ่นสินค้า
        </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มรุ่นสินค้า</Modal.Title>
                        </Modal.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Modal.Body>


                                ยี่ห้อสินค้า: <select name="brand" ref={register}>
                                    {brands.map(data => (<option value={data._id}>{data.name}</option>))}

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
                </div>
                <br /><br /><br />
            </Container>
        </div>
    )
}