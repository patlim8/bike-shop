import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("item API method " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const item = await db
      .collection("item")
      .find({})
      .sort({})
      .limit(20)
      .toArray();
    res.json(balance);
  } else if (req.method === 'POST') {
    console.log("item REQ", req.body)
    let data = req.body;
    // data = JSON.parse(data);
    // let title = data.title;
    // let metacritic = data.metacritic;

    let { product_name, code, brand, model, avi_model, purchase_price, amount, limit_amount, barcode_id, date } = data;
    //let delete_product = document.getElementsByName('delete_item');

    // console.log("Received Debit:", balance_debit)
    // console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('item')
      .updateOne(
        {
          product_name: product_name,
          code: code,
          brand: brand,
          model: model,
          avi_model: avi_model,
          purchase_price: purchase_price,
          amount: amount,
          limit_amount: limit_amount,
          barcode_id: barcode_id,
          date: date
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  } else if (req.method === 'PUT') {
    let data = req.body
    let {product_name, code, brand, model, avi_model, purchase_price, amount, limit_amount, barcode_id, date} = data;
    console.log({data})
    const { db } = await connectToDatabase();
    let doc = await db
    .collection('item')
    .updateOne({product_name: product_name}, { $set: data },
      // Option 1: use updateOne {_id: ObjectID(id)}
      // Option 2: use findByIdAndUpdate, findByIdAndUpdate(ObjectID(id), {....})
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
      .collection('item')
      .deleteOne({ product_name: product_name})
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}