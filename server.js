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

app.get('/weather',async(req,res)=>{
let lat =req.query.lat;
let lon=req.query.lon;

// const city = weatherData.find(ele=> ele.city_name.toLowerCase() === searchQuery.toLowerCase());
const city =await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
// console.log(city.data);
try{
const weatherArr = city.data.data.map(items =>new Forecast(items));
// console.log(weatherArr);
res.send(weatherArr);
}catch(error){

handleError(error,res);
}
}
);


app.get('/movies',async(req,res)=>{

let searchQuery=req.query.searchQuery;

const movieArr =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
// console.log(movieArr.data.title);


try{
 const cityMovies=movieArr.data.results.map(items =>new Movies(items)); 
// console.log(cityMovies);
res.send(cityMovies);

}catch(error){

  handleError(error,res);
}

});


class Movies{
constructor(movie){

  this.title = movie.title;
  this.overview =movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = movie.poster_path;
  this.popularity = movie.popularity;
  this.release_date = movie.release_date;

}
};


function handleError(error,res){
res.status(500).send("Error in Data Base");

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