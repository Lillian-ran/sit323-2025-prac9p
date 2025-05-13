const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;

// MongoDB URI
const uri = `mongodb://${username}:${password}@mongo-0.mongo.default.svc.cluster.local:27017,mongo-1.mongo.default.svc.cluster.local:27017,mongo-2.mongo.default.svc.cluster.local:27017/?replicaSet=rs0&authSource=admin`;


console.log(" MongoDB...");
console.log(" Mongo URI:", uri);

let db;

// Try to connect MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('test');
    console.log('Successfully connect to MongoDB Replica Set');
  })
  .catch(err => {
    console.error('Failed to connect MongoDB :', err);
  });

// Example API
app.get('/', async (req, res) => {
  if (!db) {
    return res.status(503).send('Database has not been connected, please try again');
  }

  try {
    const result = await db.collection('demo').find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
