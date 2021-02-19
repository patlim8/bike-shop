import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Payment() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />



      <main className={styles.main}>
        <h1 className={styles.title}>
          Sale - Payment
        </h1>

        <div>


          <div>
          <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>ชื่อสินค้า</th>
                  <th>รหัสสินค้า</th>
                  <th>ยี่ห้อสินค้า</th>
                  <th>รุ่นสินค้า</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td>@</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td>@</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ต้องชำระ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder=""
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>



        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">จำนวนที่ได้รับ</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder=""
            aria-label="Item name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="ปริ้นใบเสร็จ" />
        </Form.Group>

      </main>

      <ButtonGroup>
        <Button href="/money_change">ยืนยัน</Button>{' '}
        <Button variant="danger" href="/cancel_payment">ยกเลิก</Button>{' '}
      </ButtonGroup>

    </div>
  )
}
