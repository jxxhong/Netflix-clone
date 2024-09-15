import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css'

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await axios.get(requests.fechNowPlaying);
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_reponse: 'videos' },
    });
    setMovie(movieDetail);
  }

  const truncate =(str, n) =>{
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover'
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'> {movie.title || movie.name || movie.original_name} </h1>

        <div className='banner_buttons'>
          <button className='banner_button play'>Play</button>
          <button className='banner_button info'>More Information</button>
        </div>

        <h1 className='banner_description'>{truncate(movie.overview, 100)}</h1>
      </div>
      <div className='banner_fadeBottom' />
    </header>
  )
}
