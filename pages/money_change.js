import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function money_change() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Money Change</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar/>
      

      <main className={styles.main}>
        <h1 className={styles.title}>
            เงินทอน 
        </h1>

        <br></br><br></br>

        <Card className={styles.body}>
            <Card.Body className="width: 18rem;">
                <Form>
                    <Form.Group>
                        <Form.Label>จำนวนเงินทอน</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" href="/paymentsuccuess">
                        ตกลง
                    </Button>
                </Form>
            </Card.Body>
        </Card>
      </main>
    </div>
  )
}
