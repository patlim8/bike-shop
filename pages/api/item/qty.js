import { ObjectId } from 'bson';
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  console.log("item QTY API method ++++++ " + req.method)

  if (req.method === 'GET') {
    res.send("Item Qty API")
  } else if (req.method === 'PUT') {
    /* Update Item's qty */
    let data = req.body
    // let data1 = req.body

    // var ObjectID = require('mongodb').ObjectID;
    let { product_name, code, brand, model, avi_model, purchase_price, qty, minStock, barcode_id, date } = data;
    console.log("req body ใน PUT ========", { data })
    console.log("object id ==== ", ObjectId(data._id))
    let _id = ObjectId(data._id)
    delete data._id
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('item')
      .update(
        { _id: _id },
        {
          $inc: {
            qty: - Number(data.qty)
          }
        },
        (err, result) => {
          if (err) {
            console.log("Update Error", err)
            res.json(err)
          } else {
            console.log('Newly Updated (expect 1):', result)
            res.json({
              message: 'Quantity has been updated has been updated.',
              data: data
            });
          }
        }
      )
    // res.json({ message: 'Update data', data: data , _id: data._id});
  }
}