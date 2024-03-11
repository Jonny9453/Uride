'use server'

require('dotenv').config()
const Username=process.env.USER;
const Password=process.env.PASSWORD
const URI=`mongodb+srv://${Username}:${Password}@myatlasclusteredu.08pvwoa.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`


export async function create(user){
    const { MongoClient } = require("mongodb");
    // Replace the uri string with your MongoDB deployment's connection string.
    const uri =URI;
    const client = new MongoClient(uri);
    async function run() {
      try {
        await client.connect();
      // database and collection code goes here
        const db = client.db("uber");
        const coll = db.collection("user_profile");
    
        // Create a unique index on the 'email' field
        const indexResult = await coll.createIndex({ email: 1 }, { unique: true });
        console.log('Unique index created:', indexResult);

         const existingUser = await coll.findOne({ email: user.email });
        if(existingUser){
          console.log('User with the same email already exists');
            return null;
        }
        const docs = [
           user
          ];
          
          const result = await coll.insertMany(docs);
          console.log('User inserted with ID:', result.insertedIds);
    
       
    
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
}


export async function update(totalCharge,user,location){
  const object={charge:totalCharge, location:location}
  console.log("mayank")
  const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =URI;


const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("uber");
    const coll = db.collection("user_profile");
    // coll.createIndex({ email: 1 }, { totalCharge: "array" })
    // update code goes here
    const filter = {email:user.email};
    const updateDoc = { $push: { totalCharge: object } }; // Use $inc for adding to existing array

    const result = await coll.findOneAndUpdate(filter, updateDoc, { upsert: true });

    // display the results of your operation
    console.log("Number of documents updated: " + result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

} 



export async function find(user){
 
  const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =URI;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("uber");
    const coll = db.collection("user_profile");

    // find code goes here
    const cursor = await coll.find({ email:user});

    // iterate code goes here
    
    const object = await cursor.next();
    
    if (object) {
      return object.totalCharge; // Return the object if found
    } else {
      // Handle the case where no object is found
      return null; // Or throw an error, provide a default value, etc.
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  
}

const data= run().catch(console.dir);
 return data;
}





