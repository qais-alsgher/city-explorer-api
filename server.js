'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const axios=require('axios');

app.use(cors());

// console.log(app)
const port = process.env.PORT || 3001;

const weatherData= require('./data/weather.json');

app.get('/weather',(req,res)=>{

let searchQuery=req.query.searchQuery;

const city = weatherData.find(ele=> ele.city_name.toLowerCase() === searchQuery.toLowerCase());
// console.log(city);
try{
const weatherArr = city.data.map(items =>new Forecast(items));
console.log(weatherArr);
res.send(weatherArr);
}catch(error){

handleError(error,res);
}
}
);

function handleError(error,res){
res.status(500).send("the city dose not have data for weather for server");

}

class Forecast{
  constructor(day){
this.description= day.weather.description;
this.date= day.valid_date;
  }
}


app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})