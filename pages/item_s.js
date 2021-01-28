import { connectToDatabase } from "../util/mongodb";
import Link from "next/link"

export default function IT({ item }) {
    return (
        <div>
            <h1>List of {item.length} items</h1>
            <ul>
                {item.map((items) => (
                    <li>
                        <h2>
                            <Link href={`/item/${items._id}`}>{items.product_name}</Link>
                        </h2>
                        <h3>Code: {items.code}</h3>
                        <p>Brand: {items.brand} Model: {items.model}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const item = await db
        .collection("item")
        .find({})
        .sort({})
        .limit(20)
        .toArray();

    return {
        props: {
            item: JSON.parse(JSON.stringify(item)),
        },
    };
}