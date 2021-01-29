import { connectToDatabase } from "../util/mongodb";
import { useRouter } from "next/router";
import { ObjectID } from "mongodb";

export default function Items({ item }) {
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>ชื่อสินค้า</th>
                        <th>รหัสสินค้า</th>
                        <th>ยี่ห้อสินค้า</th>
                        <th>รุ่นสินค้า</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>1</td>
                        <td>{item.product_name}</td>
                        <td>{item.code}</td>
                        <td>{item.brand}</td>
                        <td>{item.model}</td>
                    </tr>
              ))
            </tbody>
            </Table>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { db } = await connectToDatabase();
    const { item_id } = query;
    console.log(item_id)

    const item = await db
        .collection("item")
        .findOne(ObjectID(item_id))
    //   .sort({})
    //   .limit(20)
    //   .toArray();

    return {
        props: {
            item: JSON.parse(JSON.stringify(item)),
        },
    };
}