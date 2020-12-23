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
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

export default function AddItem() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Add/Edit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar/>
        
      

      <main className={styles.main}>
        <h1 className={styles.title}>
          Add/Edit 
        </h1>

        <div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Item</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Item name"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Item Code</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Item Code"
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

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">initial price</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="price"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Amount"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Limit number</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Limit number"
      aria-label="Item name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </div>

      </main>

      <Button variant="outline-primary">Scan Barcode</Button>{' '}
  <Button variant="outline-secondary">Delete Item</Button>{' '}
  <Button>Confirm</Button>{' '}
  <Button>Cancel</Button>{' '}

      
    </div>
  )
}
