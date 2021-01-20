import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  console.log("Movies API method " + req.method)

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();
    res.json(movies);
  } else if (req.method === 'POST') {
    console.log("Movies REQ", req.body)
    let data = req.body;
    let { title, metacritic } = data;

    console.log("Received Title:", title)
    console.log("Received Score:", metacritic)
    const { db } = await connectToDatabase();
    let doc = await db
      .collection('movies')
      .updateOne(
        {
          title: title,
          metacritic: metacritic
        },
        { $set: data },
        { upsert: true }
      ) // if update non-existing record, insert instead.

    res.json({ message: 'OK' });
  }
}