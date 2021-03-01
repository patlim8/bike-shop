import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import React, { useState, useEffect } from 'react';
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    // setPercent(eventKey.target.value),
    console.log("working ")
  );

  


  return (
    <button
      type="button"
      style={{ backgroundColor: 'white' },{ color: 'blue' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function Sale() {

  const [percent, setPercent] = useState('')

  // const updateInput = (e) => {
    
  //     // percent = e.target.value
  //     // setPercent(percent)
  //     console.log("percent ===", e.target.value)

  // }


  return (
    <div className={styles.container}>
      <Head>
        <title>Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock}/>
      

      <main className={styles.main2}>
        <h1 className={styles.title}>
          Sale 
        </h1>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div className={styles.grid}>
          <Card>
            <Card.Body>
              <Card.Link href="/sell/normal">
                <h1>ลูกค้าหน้าร้าน</h1>
              </Card.Link> 
            </Card.Body> 
          </Card>

          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Body} eventKey="0">
                <CustomToggle eventKey="0"><h1>ลูกค้าช่าง</h1></CustomToggle>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>คิดราคาเพิ่ม(%)</Form.Label>
                    <Form.Control type="text" placeholder="ใส่ % ที่ต้องการคิด" onChange={e => setPercent(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" href={`/sell/specialx${percent}`} >
                    ตกลง
                  </Button>
                </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </main>
    </div>
  )
}
