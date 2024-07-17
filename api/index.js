// tmdb movie api is here
const  baseUrl = "https://api.themoviedb.org/3"


// credential for api
const credential = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2IzNzczMjA2ZWI2ZmY1NWIxNDEzMWNhYzM3ZmUxZSIsIm5iZiI6MTcyMTE0ODkzNS42ODU4MzUsInN1YiI6IjY2OTZhNTMyN2MyYzlmY2E0NzdiOGY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZGgcXwbVeo6rTl13XXo89kKyR12d9c3QEEEJV1UHyo0'
    }
  };


// image url
export const  imageUrl = 'https://image.tmdb.org/t/p/w500'


// ======= trending related Api ===== //
export const fetchTrending = async () => {
    try {
        const response = await fetch(`${baseUrl}/movie/popular?language=en-US&page=1`, credential)
        const data = await response.json()
        const tending =  data.results
        return tending
    }
    catch(err) {
        console.log(err)
    }
}



// ====== upcoming related Api ===== //
export const  fetchUpcoming = async () => {
    try {
        const response = await fetch(`${baseUrl}/movie/upcoming`, credential)
        const data = await response.json()
        const upcoming =  data.results
        return upcoming
    }
    catch(err) {
        console.log(err)
    }
}


// ======= top rated related Api ===== //
export const fetchTopRated = async () => {
    try {
        const response = await fetch(`${baseUrl}/movie/top_rated`, credential)
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}


// ===== now playing related Api ===== //
export const fetchNowPlaying = async () => {
    try {
        const response = await fetch(`${baseUrl}/movie/now_playing?language=en-US&page=1`, credential)
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}



// ===== movie details related Api ===== //

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/movie/${id}?language=en-US`, credential)
        const data = await response.json()

        return data
    }
    catch(err) {
        console.log(err)
    }
}



export const fetchMovieCereditApi = async(id)=>{
    const response = await fetch(`${baseUrl}/movie/${id}/credits`, credential)
    const data = await response.json()
    return data.cast
}



export const fetchSemilarMovies = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/movie/${id}/similar`, credential)
        const data = await response.json()
        return data.results
    }
    catch(err){
        console.log(err)
    }
}



// person related Api
export const  fetchPresonData = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/person/${id}`, credential)
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}


export const fetchPersonMovie = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/person/${id}/movie_credits`, credential)
        const data = await response.json()
        return data.cast
    }
    catch(err) {
        console.log(err)
    }
}


export const  serachMovieApi = async (query) => {
    try {
        const response = await fetch(`${baseUrl}/search/movie?query=${query}`, credential)
        const data = await response.json()
       
        return data.results
    }
    catch(err) {
        console.log(err)
    }
}