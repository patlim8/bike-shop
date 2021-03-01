import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'



// {brand.map((p) => (model.map((i) => (i.brand == p._id) ?
//   <tr>
//       <td>{i._id}</td>
//       <td>{i.name}</td>
//       <td>{p.name}</td>
//   </tr>
//   : null)
// ))}

//  const ItemList = ({ ItemList = [], filter = '', modelFilter = '' }) => {
const ModelMgntList = ({ modelMgntList, filter='' }) => {
  let filteredList = modelMgntList
  console.log("ModelMgntList", modelMgntList)

  if (filter.brand) {
    filteredList = filteredList.filter(data => data.brandName == filter.brand)
  }

  if(filter.model){
    filteredList = filteredList.filter(data => data.model_name == filter.model )
  }

  if(filter.avi_model){
    filteredList = filteredList.filter(data => filter.avi_model.map(avi_model => avi_model.value == data.model)
                                        || filter.avi_model.map(avi_model => data.avi_model.map(dataAvi => avi_model.value == dataAvi.value)))
  }
  console.log("filteredList", filteredList)

  const modelMgntList2 = filteredList.map((data) => {
    return (

      <tbody>
        <tr key={data.model_id}>
          <td>{data.model_id}</td>
          <td>{data.model_name}</td>
          <td>{data.brandName}</td>
        </tr>
      </tbody>
    )

  })



  return (
    <div>
      <h2>
        {/*Brand: {filter.brand ? filter.brand : '---'}*/}
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

    </div>
  );
}

export default ModelMgntList




