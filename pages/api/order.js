import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("order API method " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const order = await db
      .collection("order")
      .find({})
      .sort({})
      .limit(20)
      .toArray();
    res.json(order);
  } else if (req.method === 'POST') {
    console.log("order REQ", req.body)
    let data = req.body;
    // data = JSON.parse(data);
    // let title = data.title;
    // let metacritic = data.metacritic;

    let { product_id, unit, price } = data;

    // console.log("Received Debit:", balance_debit)
    // console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order')
      .updateOne(
        {
          product_id: product_id,
          unit: unit,
          price: price
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  }
}