import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  console.log("balance API method " + req.method)

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
    console.log("balance REQ", req.body)
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
        .collection('balance')
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
                message: 'balance added',
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
      .collection('balance')
      .deleteOne({ _id: id })
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}