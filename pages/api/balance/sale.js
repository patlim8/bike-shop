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
    

    // console.log("ที่ได้ +++++++++++++++++++", data)
    // }else{

    
    let {  totalprice_order, fix_service_price,  total, receive, change, type, date} = data;
    // console.log("Received Debit:", balance_debit)
    // console.log("Received Date:", balance_date)
    const { db } = await connectToDatabase();
    
      await db
        .collection('balance')
        .insertOne(
          {
          
            totalprice_order: Number(totalprice_order), 
            fix_service_price: Number(fix_service_price),  
            total: Number(total), 
            receive: Number(receive), 
            change: Number(change), 
            type: type, 
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
    



  }  else if (req.method === 'PUT') {
    console.log("balance update ++++++++++", req.body)
    let data = req.body
    let data1 = req.body
    let data2 = req.body

    // if(data.type === "Buy"){
    let { id, product_name, type,  qty, unit_price, expense, date} = data1;

    console.log("ที่ได้ +++++++++++++++++++", data)
    // }else{

    
    let { id2, totalprice_order, fix_service_price,  total, receive, change, type2, date2} = data2;
    // }
    // let { id, price, fix_service_price, total_price, receive, change } = data;
    const { db } = await connectToDatabase();

    if(data.type === "Buy"){
      let doc = await db
        .collection('balance')
        .updateOne({_id: id}, { $set: data1 },
          {
            new: true,
            runValidators: true,
            upsert: true
          },
        )
      res.json({message: 'Update data', data: data1 });
    }else{
      let doc = await db
        .collection('balance')
        .updateOne({_id: id2}, { $set: data2 },
          {
            new: true,
            runValidators: true,
            upsert: true
          },
        )
      res.json({message: 'Update data', data: data2 });
    }
  } else if (req.method === 'DELETE') {
    let data = req.body
    let { id } = data;
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('balance')
      .deleteOne({ _id: id })
    res.json({ delete: true, message: 'Delete data', data: {} })
  }
}