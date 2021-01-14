import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from '../components/buttonBar';
import { useForm } from "react-hook-form";

import { connectToDatabase } from "../util/mongodb"
import Link from 'next/link'



export default function Home({ balance }) {

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data)

    fetch('/api/balance', {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Response from server "+data.message)
      });

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonBar />

      <main className={styles.main2}>
        <b>Insert Balance</b>

        <form onSubmit={handleSubmit(onSubmit)}>
          Name: <input type="text" name="balance_name" ref={register({ required: true })} /><br/>
          Debit: <input type="number" name="balance_debit" ref={register({ required: true })} /><br/>
          Crebit: <input type="number" name="balance_crebit" ref={register({ required: true })} /><br/>
          Date: <input type="date" name="balance_date" ref={register({ required: true })}/><br/>
          <input type="submit" />
        </form>
      </main>

    </div >
  )
}


export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const balance = await db
    .collection("balance")
    .find({})
    .sort({})
    .limit(20)
    .toArray();

  return {
    props: {
      balance: JSON.parse(JSON.stringify(balance)),
    },
  };
}

