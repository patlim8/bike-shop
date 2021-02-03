import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

const ItemList = ({ItemList=[]}) => {
  return (
    <>
    <Table striped bordered hover size="sm">
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
            
              {ItemList.map((data) => {

              
                  if(data){
                    return (
                //     <tbody>
                //       <tr>
                //   <td>1</td>
                //   <td>{data.product_name}</td>
                //   <td>{data.code}</td>
                //   <td>{data.brand}</td>
                //   <td>{data.model}</td>
                  
                //   <td>{data.barcode_id}</td>
                //   <td>{data.amount}</td>
                //   <td>{data.limit_amount}</td>
                //   <td>{data.purchase_price}</td>  
                // </tr>
                // </tbody>
                <tbody>
              
                <tr>
                  <td>
                  <Link href={`/additem/${data._id}`}>
            <a>
              Edit
                    {data._id}
            </a>
          </Link>
                    </td>
                  <td>{data.product_name}</td>
                  <td>{data.code}</td>
                  <td>{data.brand}</td>
                  <td>{data.model}</td>
                  
                  <td>{data.barcode_id}</td>
                  <td>{data.amount}</td>
                  <td>{data.limit_amount}</td>
                  <td>{data.purchase_price}</td>
                </tr>
              
            </tbody>
              )	
            }
            return null
       }) } 
            
            
          </Table> 

    
     {/* { countryList.map((data,index) => {
        if (data) {
          return (
            // <div key={data.name}>
            //   <h1>{data.name}</h1>


        //        <Table striped bordered hover size="sm">
        //     <thead>
        //       <tr>
        //         <th>id</th>
        //         <th>ชื่อสินค้า</th>
        //         <th>รหัสสินค้า</th>
        //         <th>ยี่ห้อสินค้า</th>
        //         <th>รุ่นสินค้า</th>
                
        //         <th>Barcode ID</th>
        //         <th>จำนวน</th>
        //         <th>จำนวนจำกัด</th>
        //         <th>ราคา</th>
        //         <th>วันที่บันทึก</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {countryList.map((data) => (
        //         <tr>
        //           <td>1</td>
        //           <td>{data.name}</td>
                  
                  
                  
        //         </tr>
        //       ))}
        //     </tbody>
        //   </Table> 

              
	    // </div>	
    	   )	
    	 }
    	 return null
    }) }  */}
    </>
  );
}

export default ItemList


