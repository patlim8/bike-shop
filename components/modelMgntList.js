import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

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

// {brand.map((p) => (model.map((i) => (i.brand == p._id) ?
//   <tr>
//       <td>{i._id}</td>
//       <td>{i.name}</td>
//       <td>{p.name}</td>
//   </tr>
//   : null)
// ))}

//  const ItemList = ({ ItemList = [], filter = '', modelFilter = '' }) => {
const ModelMgntList = ({ ModelMgntList = [], filter = '' }) => {
  const filteredList = ModelMgntList.filter(data => data.name == filter.name)

//   const filteredListModel = ItemList.filter(data => data.model == modelFilter.model)

  const modelMgntList2 = filteredList.map((data) => { 
    if (data) {
      return (

        <tbody>
          <tr>
            <td>{data._id}</td>
            <td>{data.name}</td>
          </tr>
        </tbody>
      )
    } 
  })

  

  return (
    <>
      <h2>
        Brand: {filter.brand ? filter.brand : '---'}
      </h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>รุ่นสินค้า</th>
            <th>ยี่ห้อสินค้า</th>
            <th>รุ่นที่ใช้ได้</th>
          </tr>
        </thead>

        {modelMgntList2}

      </Table>

    </>
  );
}

export default ModelMgntList




