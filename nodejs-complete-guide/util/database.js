require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let _db;

async function run() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.info("You successfully connected to MongoDB!");
  _db = client.db();
}

const mongoConnect = (callback) =>
  run()
    .then(() => callback())
    .catch((err) => {
      throw err;
    })
    .finally(() => client.close());

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

