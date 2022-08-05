const axios =require('axios');

const moviesCache={}; 

async function handleMovies(req,res){

    let searchQuery=req.query.searchQuery;

if(moviesCache[searchQuery]!==undefined){

res.status(200).send(moviesCache[searchQuery]);

}else{

  const movieArr =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
    // console.log(movieArr.data.title);

    try{
     const cityMovies=movieArr.data.results.map(items =>new Movies(items)); 
    // console.log(cityMovies);
    moviesCache[searchQuery]=cityMovies;
    res.send(cityMovies);
    
    }catch(error){
    
      handleError(error,res);
    }

}
    
    };
    
    
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

    module.exports={handleMovies};