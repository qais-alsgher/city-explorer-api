const axios =require('axios');
async function handleWeather(req,res){
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