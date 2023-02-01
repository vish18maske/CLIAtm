

const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017";
const databaseName = "atmcli";

const client = new MongoClient(uri);
const db = client.db(databaseName)

module.exports = db;