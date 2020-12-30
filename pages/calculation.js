import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import AvailableList from '../components/availableList'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Calculation() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calculation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar/>
        
      

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sale - Calculation 
        </h1>

        <div>
        <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Order ID</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Item name"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Item name"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">ชื่อสินค้า</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="ชื่อสินค้า"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">รหัสสินค้า</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="รหัสสินค้า"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <BrandList/>
  <ModelList/>
  
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Barcode ID</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Barcode ID"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <div>
  <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
  </div>
  </div>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">จำนวน</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="จำนวน"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="ค่าถอดประกอบ" />
  </Form.Group>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">ราคา</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="ราคา"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

      </main>

      <Button variant="outline-primary">สแกนบาร์โค้ด</Button>{' '}
  {/* <Button variant="outline-secondary">Delete Item</Button>{' '} */}
      <Button href="/payment">จ่าย</Button>{' '}
      <Button>ยกเลิก</Button>{' '}

      
    </div>
  )
}
