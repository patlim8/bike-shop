import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import BrandList from '../components/brandList';
import ModelList from '../components/modelList'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function AddItem() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Add/Edit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Add/Edit
        </h1>

        <div>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ID"
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



          <BrandList />
          <ModelList />

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

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ราคาซื้อ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ราคาซื้อ"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

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

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">จำนวนขั้นต่ำ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="จำนวนขั้นต่ำ"
              aria-label="Item name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>

      </main>

      <Button variant="secondary">สแกนบาร์โค้ด</Button>{' '}
      <Button variant="danger">ลบสินค้า</Button>{' '}
      <ButtonGroup>
        <Button>ยืนยัน</Button>{' '}
        <Button variant="dark">กลับ</Button>{' '}
      </ButtonGroup>
    </div>
  )
}
