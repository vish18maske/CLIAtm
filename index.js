const { MongoClient } = require("mongodb");
let Joi =require('joi');

const uri = "mongodb://localhost:27017";
const databaseName = "atm-cli";

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Connection failed for some reason");
  }
  console.log("Connection established - All well");
  const db = client.db(databaseName);
});

