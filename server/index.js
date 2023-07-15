const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const port = 3000; // Change this to your desired port number


const url = 'mongodb://localhost:27017'; // Change this if your MongoDB server is running on a different URL
const dbName = 'contracts'; // Change this to your preferred database name

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  const db = client.db(dbName);
  console.log('Connected to the database');

  // Add your API routes and logic here

app.post('/contracts', (req, res) => {
  const contract = req.body; // Assuming the contract data is sent in the request body

  db.collection('contracts').insertOne(contract, (err, result) => {
    if (err) {
      console.error('Failed to store the contract:', err);
      res.status(500).send('Failed to store the contract');
      return;
    }

    res.status(201).json(result.ops[0]);
  });
});

app.get('/contracts', (req, res) => {
  db.collection('contracts').find().toArray((err, contracts) => {
    if (err) {
      console.error('Failed to retrieve contracts:', err);
      res.status(500).send('Failed to retrieve contracts');
      return;
    }

    res.json(contracts);
  });
});



  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
