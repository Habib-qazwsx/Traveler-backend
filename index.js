const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
var ObjectId = require("mongodb").ObjectId;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdffr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("database connected successfully");
    const database = client.db("booking_packages");
    const packagesCollection = database.collection("packages");
    const bookingCollection = database.collection("booking");
    const usersCollection = database.collection("users");

    //get packages api

    app.get("/packages", async (req, res) => {
      // console.log('get Packages');
      const cursor = packagesCollection.find({});
      const packages = await cursor.toArray();

      res.json(packages);
    });

    app.post("/booking", async (req, res) => {
      const booking = await req.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      console.log("added succes", result);
      res.json(result);
    });

    //get booking packages
    app.get("/mypackages/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = bookingCollection.find({ email: email });
      const myPackages = await cursor.toArray();

      res.json(myPackages);
    });

    //delete booking

    app.delete('/mypackages/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id:id};
        const result = await bookingCollection.deleteOne(query);
        console.log(id, query);
        res.json(result);
    });

    //get users
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      console.log('user geted');
      res.send(users);
    });

    //post users
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const oldUser = await usersCollection.findOne({ email: newUser.email });

      if (oldUser) {
          res.json(oldUser);
          console.log('old user');
      }
      else {
          const result = await usersCollection.insertOne(newUser);
          console.log('added new user');
          res.json(result);
      }  
    });
    }
    finally {
    // await client.close();
  }
  }
  
  

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running my server");
});

app.listen(port, () => {
  console.log("Running Server on Port", port);
});
