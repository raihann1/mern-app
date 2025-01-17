import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "MongoDB connection successful!"
  );
} catch(err) {
  console.error(err);
  console.log("test");
}

let db = client.db("appointments");

export default db;