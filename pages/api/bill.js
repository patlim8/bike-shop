// import { ObjectID } from "mongodb";
import { ObjectId } from 'bson';
// import { ObjectId} from "bson";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("item API method ++++++ " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const item = await db
      .collection("billHistory")
      .find({})
      .sort({})
      .limit(20)
      .toArray();
    res.json(item);
  } else
    if (req.method === 'POST') {
      console.log("ADDING ", req.body)
      let data = req.body;
      // data = JSON.parse(data);
      // let title = data.title;
      // let metacritic = data.metacritic;

      // let { _id, product_name, code, brand, model, avi_model, purchase_price, qty, minStock, barcode_id, date } = data;


      // จะได้ objectID ถ้าใช้โค้ดล่าง อันบนเหมือนจะสร้าง _id เองได้
      let {orderID,date, productList, total, receive, change } = data;

      const { db } = await connectToDatabase();
      await db
        .collection('billHistory')
        .insertOne(
          {
            // _id: ObjectId(_id)
            // _id: _id
            orderID: orderID,
            date: date, 
            productList: productList, 
            total: total, 
            receive: receive, 
            change: change
          },
          // callback
          (err, result) => {
            if (err) {
              console.log(err)
              res.json(err)
            } else {
              console.log('Newly inserted ID', result.insertedId)
              res.json({
                message: 'New bill updated',
                _id: result.insertedId
              });
            }
          }
        ) // if update non-existing record, insert instead.
    } 
}