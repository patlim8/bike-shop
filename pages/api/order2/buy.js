import { connectToDatabase } from "../../../util/mongodb";

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
    let { product_name, type,  qty, unit_price, expense, date} = data;

    // console.log("ที่ได้ +++++++++++++++++++", data)
    // }else{


    // console.log("Received Debit:", balance_debit)
    // console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();

        await db
        .collection('order2')
        .insertOne(
            {
            
            product_name: product_name,
            type: type,
            qty: Number(qty),
            unit_price: Number(unit_price), // ก่อนเอาขึ้น database ต้องเอามาทำ % ก่อน (เฉพาะขาย ไม่ใช่ buy)
            expense: Number(expense),
            date: date
            
            
            },
            (err,result) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log('Newly inserted ID', result.insertedId)
                res.json({
                message: 'order2 added',
                _id: result.insertedId,
                data: data
                });        
            }
            }
        )
    


  }  
   else if (req.method === 'DELETE') {
    let data = req.body
    let { id } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('order2')
      .deleteOne({ _id: id })
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}