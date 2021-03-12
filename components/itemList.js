import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns'


const ItemList = ({ ItemList = [], filter = null }) => {
  let filteredList = ItemList
  let array = []

  // useEffect(() => {
  //   // This will run when filter is set.
  //   filteredList = array
  // }, [array])

  if (filter) {
    if(filter.avi_model.length != 0){
      // let array = []
      // ItemList.map(data => )
      console.log("ข้างใน filter ==== ", filter)
      console.log("ข้างใน filter avi ==== ", filter.avi_model)
      
      let contain_Avi = (avi) => filter.avi_model.includes(avi)
      filteredList.map(data =>{
        if(data.avi_model != null){
          if(data.avi_model.some(contain_Avi)){
            console.log("data ===== ",data)
            array.push(data)
          }
        }
      })

      filteredList = array

      // array.push()
      
      // let filteredList1 = ItemList.filter(data => filter.avi_model.includes(data.model) )
      // let filteredList2 = ItemList.filter(data => data.avi_model.map(avi => filter.avi_model.includes(avi)) )
      // filteredList = [...filteredList1, ...filteredList2]

    }
    if(filter.brand){
      filteredList = filteredList.filter(data => data.brand == filter.brand)
    }
    // const filteredList = ItemList.filter(data => 
      // {filter ? data.brand == filter.brand && data.model == filter.model : data.brand == filter.brand  })
    if(filter.model){
      filteredList = filteredList.filter(data => data.model == filter.model )
    }

    
      //|| data.avi_model.map(avi => filter.avi_model.includes(avi))
    
  }

  // if(filter.avi_model){
  //   filteredList = filteredList.filter(data => data.model == filter.model )
  //   //|| data.avi_model.map(avi => filter.avi_model.includes(avi))
  // }

  const itemList2 = filteredList.map((data) => {
    if (data) {
      // console.log(format(data.date, "yyyy-MM-dd"))
      return (
        <tbody>
          <tr key={data._id}>
            <td>
              <Link href={`/additem/${data._id}`}>
                <a>
                  Edit
      
                </a>
              </Link>
            </td>
            <td>{data.product_name}</td>
            <td>{data.code}</td>
            <td>{data.brand}</td>
            <td>{data.model}</td>
            <td>{data.avi_model}</td>
            <td>{data.qty}</td>
            <td>{data.minStock}</td>
            <td>{data.purchase_price}</td>
            <td>{data.date}</td>
          </tr>

        </tbody>
      )
    } 
  })

  

  return (
    <div>
      <Container>
        <br />
        <Row>
          <Col sw={6}>
            <h3>Brand: {filter.brand ? filter.brand : '---'}</h3>
          </Col>
          <Col sw={6}>
            <h3>Model: {filter.model ? filter.model : '---'}</h3>
          </Col>
        </Row>
        <br />
      </Container>
      {/* <h2>
        Brand: {filter.brand ? filter.brand : '---'}
      </h2> */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Action</th>
            <th>ชื่อสินค้า</th>
            <th>รหัสสินค้า</th>
            <th>ยี่ห้อสินค้า</th>
            <th>รุ่นสินค้า</th>

            <th>รุ่นที่ใช้ได้</th>
            <th>จำนวน</th>
            <th>จำนวนจำกัด</th>
            <th>ราคา</th>
            <th>วันที่บันทึก</th>
          </tr>
        </thead>

        {itemList2}

      </Table>
    </div>
  );
}

export default ItemList


