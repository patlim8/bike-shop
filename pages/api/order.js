import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("order API method " + req.method)

  //(How to data from other api to here and store it as data)

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
    let { code, unit, price } = data;

    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order')
      .updateOne(
        {
          code: code,
          unit: unit,
          price: price
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  } else if (req.method === 'PUT') {
    let data = req.body
    let { code, unit, price } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order')
      .updateOne({code: code}, { $set: data },
        {
          new: true,
          runValidators: true
        },
      )
    res.json({message: 'Update data', data: data });
  } else if (req.method === 'DELETE') {
    let data = req.body
    let { product_name } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order')
      .deleteOne({ code: code})
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}