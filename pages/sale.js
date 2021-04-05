import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import React, { useState } from 'react';
import hasNewItem from '../pages/needItem'
import hasNewItemStock from '../pages/stock'

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("working ")
  );




  return (
    <button
      type="button"
      style={{ backgroundColor: 'white' }, { color: 'blue' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function Sale() {

  const [percent, setPercent] = useState('')
  
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      console.log("Enter is pressed.", e.target.value)
    }
  }

  const Percent = (e) => {
    console.log(e.target.value)
    setPercent(e.target.value)
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar hasNewItem={hasNewItem} hasNewItemStock={hasNewItemStock} />


      <main className={styles.main2}>
        <h1 className={styles.title}>
          Sale
        </h1>
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
                  <Button variant="secondary" href={`/sell/special1`}>ราคาปลีก</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="secondary" href={`/sell/special2`}>ราคาส่ง</Button><br /><br />
                  {/* <Button variant="primary" href={`/sell/specialx${percent}`}>ตกลง</Button> */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </main>
    </div>
  )
}
