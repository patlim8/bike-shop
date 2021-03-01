import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import { Container, Row, Col } from 'react-bootstrap'


const ItemList = ({ ItemList = [], filter = '' }) => {
  let filteredList = ItemList
  if(filter.brand){
    filteredList = ItemList.filter(data => data.brand == filter.brand)
  }
  // const filteredList = ItemList.filter(data => 
    // {filter ? data.brand == filter.brand && data.model == filter.model : data.brand == filter.brand  })
  if(filter.model){
    filteredList = filteredList.filter(data => data.model == filter.model )
  }

  if(filter.avi_model){
    filteredList = filteredList.filter(data => filter.avi_model.map(avi_model => avi_model.value == data.model)
                                        || filter.avi_model.map(avi_model => data.avi_model.map(dataAvi => avi_model.value == dataAvi.value)))
  }

  const itemList2 = filteredList.map((data) => {
    if (data) {
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
            <td>{data.barcode_id}</td>
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

            <th>Barcode ID</th>
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


