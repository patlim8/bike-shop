import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';


import BrandList from '../../components/brandList';
import ModelList from '../../components/modelList'
import hasNewItem from '../../pages/needItem'
import hasNewItemStock from '../../pages/stock'


// import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useForm, Controller } from "react-hook-form";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from "mongodb";
import { ObjectId } from 'bson';

import { useTable, usePagination } from 'react-table'
import Select from 'react-select';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import SearchbarDropdown from '../../components/searchDropdown'
import { format } from 'date-fns'

function makeid(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



export default function Calculation({ item: items, order, rate }) {

  const { register, handleSubmit, control, watch, errors } = useForm();

  const { register: register2, handleSubmit: handleSubmit2, watch: watch2, errors: errors2 } = useForm();

  // const [options, setOptions] = useState(items);


  const [jsxProductList, setJsxProductList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [originalData] = React.useState([{ id: 0, product_name: 1, code: 2, brand: 3, model: 4, qty: 5, totalP: 6 }, { id: 0, product_name: 1, code: 2, brand: 3, model: 4, qty: 5, totalP: 6 }])
  const [data, setData] = React.useState([])

  const [rows, setRows] = useState([{ id: 0, product_name: 1, code: 2, brand: 3, model: 4, qty: 5, price: 6 }]);

  
 
  // const newOrder = [];
  // const [newOrder, setNewOrder] = useState([]);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [fixing_price, setFixingPrice] = useState(0);
  const [receive_value, setReceiveValue] = useState(0);

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const [billList, setBillList] = useState([]);


  // Dropdown component here 
  // const defaultOptions = [];
  // items.map(p =>{
  //   defaultOptions.push(`${p.product_name} ${p.model} เหลือ ${p.qty} ชิ้น`)
  // })

  // const [options, setOptions] = useState([]);

  // const onInputChange = (event) => {
  //   setOptions(
  //     defaultOptions.filter((option) => option.includes(event.target.value))
  //   );
  // };

  // useEffect(() => {
  //   console.log('productList===', productList)
    
  // }, [productList]);
  const [name, setName] = useState('')
  const [model, setModel] = useState('')

  const onChangeNameModel = (value) => {
    // console.log(value.value)
    setName(value.value[0])
    setModel(value.value[1])
    // console.log(name)
    // console.log(model)
  }

  const itemsOptions = items.map(p =>(
    {
        label: p.product_name+' '+p.model+' เหลือ '+p.qty, 
        // value: ''+brand._id,
      value: [p.product_name, p.model],

    } 
    )
    
)


  useEffect(() => {
    let total = 0
  
    productList.map(p => {
      total = total + Number(p.totalP)
      setTotalPriceProducts(total)
    })

    // productList.forEach(p => {
    //   let q = { product_name: '', qty: 0, unit: '', price: 0, totalperProduct: 0 }

    //   q.product_name = p.display_name
    //   q.qty = p.qty
    //   q.price = p.price
    //   q.totalPriceProducts = p.totalP

    //   setBillList(billList.push(q))

    // })
    // console.log('billList  ', billList)
    // console.log('productList  ', productList)
    
  }, [productList]);


  



  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
      console.log('column === ', e.target.value)
      console.log('onChange', { productList })
      setValue(e.target.value)

    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      console.log('working OnBlur ==', index)
      updateMyData(index, id, value)
    }

    // const onClick = (id) => {
    //   // console.log('working OnBlur ==', index)
    //   console.log("onClick value == ",id)
    //   // console.log('working onclick')
    //   // console.log("index",index)
    //   // console.log(productList)

    //   deleteRow(id)
    // }

    // If the initialValue is changed external, sync it up with our state
    // initialValue = null
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if(id === 'qty' || id === 'totalP'){
    return <input value={value} onChange={onChange} onBlur={onBlur} />
    }else if(id === 'action'){
      return <button type="button" onClick={() => deleteRow(value)} className="no-print">ลบ</button> 
    }else{
      return <td>{value}</td>
    }

  }

  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  }




  const Table = ({ columns, data, updateMyData, skipPageReset }) => {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
      },
      usePagination
    )

    // Render the UI for your table
    return (
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }


  const columns = React.useMemo(
    () => [
      {

        Header: 'ชื่อสินค้า',
        accessor: 'display_name'

      },
      
      {
        Header: 'จำนวน',
        accessor: 'qty'
      },
      {
        Header: 'ราคา',
        accessor: 'price'
      },
      {
        Header: 'จำนวนเงิน',
        accessor: 'totalP'
      },
      {
        className: 'no-print',
        Header: 'Action',
        accessor: 'action'
      }
    ],
    []
  )



  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page

    console.log('updateMyData')
    console.log({ rowIndex, columnId, value })

    setSkipPageReset(true)
    setProductList(old =>

      old.map((row, index) => {
        if (index === rowIndex && columnId === 'qty') {
          console.log('row == ', row)
          return {
            ...old[rowIndex],
            [columnId]: value,
            ["totalP"]: value * old[rowIndex].price,
          }
        }else if(index === rowIndex && columnId === 'totalP'){
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }


  const deleteRow = (id) => {
    
    // if (rowIndex > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
    console.log("productList == ",productList)
    console.log("id == ", id)
    // let rowIndex = productList.findIndex((p) => p._id === id)
    let newArray = productList.filter(p => p.action !== id)
    // productList.filter(p => console.log(p.action))

    // console.log("row ",rowIndex)
    
    // delete productList[rowIndex]

    setProductList(newArray)

    // setProductList(delete productList[rowIndex])
    // }

    // console.log(productList)

    

  }


  const addReceive = (value) => {
    let receive = Number(receive_value) + Number(value)

    setReceiveValue(receive)
  }

  



  const onSubmitToDatabase = (data) => {
    // productList << array of Json
    // let data = productList[0]

    console.log("data ===", data)
    let s = {
      totalprice_order: totalPriceProducts, fix_service_price: data.fix_service_price,
      total: data.total, receive: data.receive, change: data.change, type: "Sale", date: ""
    }

    // s.totalprice_order = parseInt(q.totalprice_order)
    // s.fix_service_price += parseFloat( data.fix_service_price)

    let date = new Date()
    s['date'] = format(date, 'yyyy-LL-dd')
    

    console.log("s == ",s)



    



    // productList.map(data => {
    //   console.log(data)

    //   fetch('/api/item/qty',
    //     {
    //       method: 'PUT',
    //       mode: 'cors', // no-cors, *cors, same-origin
    //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: 'same-origin', // include, *same-origin, omit
    //       headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       redirect: 'follow', // manual, *follow, error
    //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //       body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       alert("Response from server " + data.message)
    //     });
    // })




    // fetch('/api/order2/sale',
    //   {
    //     method: 'POST',
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(s) // body data type must match "Content-Type" header
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     alert("Response from server " + data.message)
    //   });


    // productList.map(data => {
    //   console.log(data)

    //   fetch('/api/saleItem',
    //     {
    //       method: 'POST',
    //       mode: 'cors', // no-cors, *cors, same-origin
    //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: 'same-origin', // include, *same-origin, omit
    //       headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       redirect: 'follow', // manual, *follow, error
    //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //       body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       alert("Response from server " + data.message)
    //     });
    // })
  }


  const onSubmitTest = (data) => {
   

    // console.log(makeid(16))

    // let billList = []

    // productList.map(p => {
    //   billList.push(q)
    //   console.log("billList", billList)
    // })
    

    // productList.map((p, i) =>{
    //   billList[i]['product_name'] = p.display_name
    //   billList[i]['qty'] = p.qty
    //   billList[i]['price'] = p.price
    //   billList[i]['totalperProduct'] = p.totalP

    //   console.log('i == ', i)
    //   console.log("billList", billList)
    // })

    productList.forEach(p => {
      let q = { product_name: '', qty: 0, unit: '', price: 0, totalperProduct: 0 }

      q.product_name = p.display_name
      q.qty = p.qty
      q.price = p.price
      q.totalPriceProducts = p.totalP

      setBillList(billList.push(q))

    })
    console.log('billList  ', billList)
    // console.log('productList  ', productList)

    


    let bill = { orderID: makeid(16), date: '', productList: billList, total: data.total, receive: data.receive, change: data.change }

    // s.totalprice_order = parseInt(q.totalprice_order)
    // s.fix_service_price += parseFloat( data.fix_service_price)
    let date = new Date()
    bill['date'] = format(date, 'yyyy-LL-dd')


    fetch('/api/bill',
      {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(bill) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Response from server " + data.message)
      });


  }



  const addItems = (data) => {
    // console.log('data === ',data)
    
    let p = { _id: '', display_name: '', product_name: name, code: '', barcode: data.barcode, brand: '', model: model, qty: data.qty, price: 0, totalP: 0 , action: ''}

    // let q = { product_name: '', qty: data.qty, unit: '', price: 0, totalperProduct: 0 }

    items.forEach(r => {
      if (r.product_name === p.product_name && r.model === p.model || r.barcode_id == p.barcode) {
        p.display_name = r.product_name+' '+r.model
        // p.product_name = r.product_name 
        p._id = r._id
        p.code = r.code
        p.brand = r.brand
        // p.model = r.model
        p.price = r.purchase_price * rate
        p.totalP = p.price * p.qty

        // q.product_name = r.product_name + ' ' + r.model
        // q.price = r.purchase_price * rate
        // q.totalperProduct = q.price * q.qty

        p.action = r._id

        productList.push(p)
        
        // billList.push(q)
      }
    })
    
    setProductList(productList)
    // productList.push(p)
    

    let total_price_products = 0

    productList.map(p =>{
      total_price_products = Number(total_price_products) + Number(p.totalP)
      setTotalPriceProducts(total_price_products)
    })


  

    // setBillList(billList)
    // setJsxBillList(newBillList)
    
  }



  
 





  return (
    <div>
      <form onSubmit={handleSubmit(addItems)}>
        <Head>
          <title>Calculation</title>
          <link rel="icon" href="/favicon.ico" />

          <link rel="stylesheet" href="/styles.css" />

        </Head>

        <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />



        <main className={styles.main}>
          <h1 className={styles.title} className="no-print">
            Sale - Calculation
        </h1>



          <div>
            

            

            

              ชื่อสินค้า: <Select
                // defaultValue={array}
                onChange={(e) => onChangeNameModel(e)}
                // onBlur={onBlur}
                // value={value}  // this is what you need to do
                // isMulti
                // options={groupedOptions}
                options={itemsOptions}
                // options={option}
                // ref={register}
              />

            {/* <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="product_name" ref={register}
                placeholder="ชื่อสินค้า"
                aria-label="Item name"
                aria-describedby="basic-addon1"
              />
            </InputGroup> */}

            <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">รหัสสินค้า</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="code" ref={register}
                placeholder="รหัสสินค้า"
                aria-label="Item name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            {/* <BrandList brand={brand} />
          <ModelList model={model} /> */}

            <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Barcode ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="barcode" ref={register}
                placeholder="Barcode ID"
                aria-label="Item name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <InputGroup className="mb-3" className="no-print">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">จำนวน</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="qty" ref={register}
                placeholder="จำนวน"
                type="number"
                defaultValue="1"
              />
            </InputGroup>


            <button className="no-print">เพิ่มในรายการขาย</button>




            


          </div>

        </main>

        <main >
          <h1 className="text-center" className="print-only hide">ใบส่งของชั่วคราว</h1>
          <div className="print-only hide">
            <table>
              <tbody id="addressTbody">
                <tr>
                  <td id="addressTd">ชื่อลูกค้า&emsp;&emsp;ร้านเทพประทานพร</td>
                  <td id="addressTd">Order No.&emsp;&emsp;&ensp;3602</td>
                </tr>
                <tr>
                  <td id="addressTd"></td>
                  <td id="addressTd">เลขที่ PO</td>
                </tr>
                <tr>
                  <td id="addressTd">Tel.&emsp;&emsp;&emsp;&emsp;038531680, 08115113855</td>
                  <td id="addressTd">Credit&emsp;&emsp;&emsp;&emsp;&ensp;0 วัน</td>
                </tr>
                <tr>
                  <td id="addressTd">การจัดส่ง</td>
                  <td id="addressTd">พนักงานขาย&emsp;&emsp;Admin</td>
                </tr>
                <tr>
                  <td id="addressTd">ที่อยู่จัดส่ง</td>
                  <td id="addressTd">ชำระโดย&emsp;&emsp;เงินสด</td>
                </tr>
                <tr>
                  <td id="addressTd">&emsp;&emsp;</td>
                  <td id="addressTd">&emsp;&emsp;</td>
                </tr>
                <tr>
                  <td id="addressTd">หมายเหตุ</td>
                  <td id="addressTd"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
              <Table
                columns={columns}
                data={productList}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
              />
            </div>



            <div className="no-print">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">ราคารวม</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  readOnly
                  name="total" ref={register2}
                  placeholder=""
                  aria-label="Item name"
                  aria-describedby="basic-addon1"
                  value={totalPriceProducts}
                />
              </InputGroup>
            </div>



          {/* <div className="no-print">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">ราคารวม</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                readOnly
                name="total" ref={register2}
                placeholder=""
                aria-label="Item name"
                aria-describedby="basic-addon1"
                value={totalPriceProducts}
              />
            </InputGroup>
          </div> */}


          {/* </div> */}
        </main>
        <main>
          <br />

          <div className="print-only hide">
            <table id="orderTable">
              {/* <thead>
                <tr>

                  <th>ชื่อสินค้า</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ราคา</th>
                  <th>จำนวนเงิน</th>


                </tr>
              </thead>
              <tbody>
                {jsxBillList}
              </tbody> */}
              <tfoot>
                <tr>
                  <td id="addressTd" colSpan="4">รวมทั้งสิ้น</td>
                  <td id="addressTd">{totalPriceProducts + Number(fixing_price)}</td>
                </tr>
                <tr>
                  <td id="addressTd" colSpan="4">จำนวนที่ได้รับ</td>
                  <td id="addressTd">{receive_value}</td>
                </tr>
                <tr>
                  <td id="addressTd" colSpan="4">เงินทอน</td>
                  <td id="addressTd">{receive_value - (totalPriceProducts + Number(fixing_price))}</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </main>

      </form>

      <form onSubmit={handleSubmit2(onSubmitTest)}>

        <div className="no-print">
          

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ค่าซ่อม</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="fix_service_price" ref={register2}
              placeholder="ราคา"
              type="number"
              onChange={e => setFixingPrice(e.target.value)}
            />
          </InputGroup>


          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">จำนวนที่ต้องชำระ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              readOnly
              name="total" ref={register2}
              placeholder=""
              aria-label="Item name"
              aria-describedby="basic-addon1"
              value={totalPriceProducts + Number(fixing_price)}
            />
          </InputGroup>




          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="receive" ref={register2}
              placeholder=""
              type="number"
              onChange={e => setReceiveValue(e.target.value)}
              value={receive_value}
            />
          </InputGroup>

          <button type="button" className="no-print" onClick={e => addReceive(5000)}>5000</button>
          <button type="button" className="no-print" onClick={e => addReceive(1000)}>1000</button>
          <button type="button" className="no-print" onClick={e => addReceive(500)}>500</button>
          <button type="button" className="no-print" onClick={e => addReceive(100)}>100</button>
          <button type="button" className="no-print" onClick={e => addReceive(50)}>50</button>
          <button type="button" className="no-print" onClick={e => addReceive(20)}>20</button>
          <button type="button" className="no-print" onClick={e => addReceive(10)}>10</button>
          <button type="button" className="no-print" onClick={e => addReceive(5)}>5</button>
          <button type="button" className="no-print" onClick={e => addReceive(1)}>1</button>



          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">เงินทอน</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              readOnly
              name="change" ref={register2}
              placeholder=""
              aria-label="Item name"
              aria-describedby="basic-addon1"
              value={receive_value - (totalPriceProducts + Number(fixing_price))}
            />
          </InputGroup>



          {/* <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="receive" ref={register2}
            placeholder=""
            type="number"
          />
        </InputGroup> */}

          


        </div>

        <div className="no-print">
          <ButtonGroup>
            <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
            {/* <Button href="/payment" type="submit">จ่าย</Button>{' '} */}
            <button>จ่าย</button>{' '}

            <Button onClick={() => window.print()}>บิล</Button>{' '}



            <Button variant="danger" href="/sale">ย้อนกลับ</Button>{' '}
          </ButtonGroup>

          {/* <button>จ่าย</button> */}
        </div>

      </form>
    </div>
  )
}

export async function getServerSideProps({ query }, props) {
  const { db } = await connectToDatabase();
  const { item_id } = query
  //   const customer_type = props.params.customer_type
  console.log('type === ', query.customer)
  console.log(`getServerSideProps: ${item_id}`)

  // console.log('type2 === ',{query}) 


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

  const item = await db
    .collection("item")
    .find()
    .sort({})
    .limit(20)
    .toArray();

  const order = await db
    .collection("order")
    .find({ "item_code": ObjectID(item_id) })
    .toArray()

  // console.log(ObjectID(item_id))

  // return {
  //     props: {
  //     item: JSON.parse(JSON.stringify(item)),
  //     order: JSON.parse(JSON.stringify(order)),

  //     },
  // };
  if (query.customer === 'normal') {
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        rate: JSON.parse(1.2)
      },
    };
  }
  else if (query.customer === 'special') {

    let percent = query.customer
    // percent.split("x")
    console.log("percent === ", percent.split("x"))
    console.log("number === ", percent.split("x")[1])
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
        order: JSON.parse(JSON.stringify(order)),
        rate: JSON.parse(Number(1 + Number(percent.split("x")[1]) / 100))
      },
    };
  }
}