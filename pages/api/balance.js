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

    let { balance_name, balance_debit, balance_credit, balance_date } = data;
    

    console.log("Received Debit:", balance_debit)
    console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('balance')
      .updateOne(
        {
          balance_name: balance_name,
          balance_debit: balance_debit,
          //balance_credit: balance_credit,
          balance_date: balance_date
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead
    res.json({ message: 'OK' });
  } else if (req.method === 'PUT') {
    let data = req.body
    let { balance_name, balance_debit, balance_credit, balance_date } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('balance')
      .updateOne({balance_name: balance_name}, { $set: data },
        {
          new: true,
          runValidators: true
        },
      )
      res.json({update: true, message: 'Update data', data: data});
  }else if (req.method === 'DELETE') {
    let data = req.body
    let { balance_date } = data;
    const { db } = await connectToDatabase();
    let doc = await db 
      .collection('balance')
      .deleteMany({ balance_date: balance_date})
    res.json({delete: true, message: 'Delete data', data: {}})
  } 
}