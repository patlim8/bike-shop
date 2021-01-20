import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("order2 API method " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const order2 = await db
      .collection("order2")
      .find({})
      .sort({})
      .limit(20)
      .toArray();
    res.json(order2);
  } else if (req.method === 'POST') {
    console.log("order2 REQ", req.body)
    let data = req.body;
    // data = JSON.parse(data);
    // let title = data.title;
    // let metacritic = data.metacritic;

    let { id, price, fix_service_price, total_price, receive, change } = data;

    // console.log("Received Debit:", balance_debit)
    // console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order2')
      .updateOne(
        {
            _id: id, 
            price: price, 
            fix_service_price: fix_service_price,
            total_price: total_price, 
            receive: receive, 
            change: change
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  }  else if (req.method === 'PUT') {
    let data = req.body
    let { id, price, fix_service_price, total_price, receive, change } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order2')
      .updateOne({_id: id}, { $set: data },
        {
          new: true,
          runValidators: true
        },
      )
    res.json({message: 'Update data', data: data });
  } else if (req.method === 'DELETE') {
    let data = req.body
    let { id } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order2')
      .deleteOne({ _id: id })
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}