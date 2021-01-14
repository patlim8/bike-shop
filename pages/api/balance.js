import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("Balance API method " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const balance = await db
      .collection("balance")
      .find({})
      .sort({})
      .limit(20)
      .toArray();
    res.json(balance);
  } else if (req.method === 'POST') {
    console.log("Balance REQ", req.body)
    let data = req.body;
    // data = JSON.parse(data);
    // let title = data.title;
    // let metacritic = data.metacritic;

    let { balance_debit, balance_date } = data;

    console.log("Received Debit:", balance_debit)
    console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('balance')
      .updateOne(
        {
          balance_debit: balance_debit,
          balance_date: balance_date
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  }
}