const axios =require('axios');

const weatherCache={};

async function handleWeather(req,res){
    let lat =req.query.lat;
    let lon=req.query.lon;
    let searchQuery=req.query.searchQuery;
    // const city = weatherData.find(ele=> ele.city_name.toLowerCase() === searchQuery.toLowerCase());

    if(weatherCache[searchQuery]!==undefined){

      res.status(200).send(weatherCache[searchQuery]);

    }else{
      const city =await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
      // console.log(city.data);
      try{
      const weatherArr = city.data.data.map(items =>new Forecast(items));
      weatherCache[searchQuery]=weatherArr;
      res.status(200).send(weatherArr);
      }catch(error){
      
      handleError(error,res);
      }
    }
   
    };

    class Forecast{
        constructor(day){
      this.description= day.weather.description;
      this.date= day.valid_date;
        }
      };

      function handleError(error,res){
        res.status(500).send("Error in Data Base");
        
        };

        module.exports={handleWeather};