'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const axios=require('axios');
const {handleWeather}=require('./modules/weather');
const { handleMovies } = require('./modules/Movies');
app.use(cors());

// console.log(app)
const port = process.env.PORT || 3001;

// const weatherData= require('./data/weather.json');

app.get('/weather',handleWeather)

app.get('/movies',handleMovies)

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})