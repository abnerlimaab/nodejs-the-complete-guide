require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  console.log("Connecting to MongoDB...");
  await client.connect();
  console.log("Connected to MongoDB!");
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return;
}

const mongoConnect = (callback) =>
  run()
    .then(() => callback(client))
    .catch(console.dir)
    .finally(() => client.close());

module.exports = mongoConnect;
