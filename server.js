'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());

// console.log(app)
const port = process.env.PORT || 3001;

const list = ['Mohammed', 'Malek', 'Bayan', 'Fatima', 'Waleed'];

app.get('/', (req, res) => {
  res.send('Hello, this the first server side')
})

app.get('/names', (req, res) => {
  res.send(list)
})

app.get('/userlist', (req, res) => {
  console.log(req.query.name);
  res.json({'listOfName': list})
})

app.get('/sendstatus', (req, res) => {
  res.status(200).json({'listOfName': list})
})

app.get('*', (req, res) => {
  res.json({'error': 'Page not found!'})
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})