import React, { useEffect, useState } from 'react'
import './Player.css';
import back_arrow_icon  from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

export default function Player() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  })

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTgzNmU2NzFmY2NkMTFhMDZmNTZiMDYxMTQ2ODg1YSIsIm5iZiI6MTY4NjQwNDY0MC42ODYsInN1YiI6IjY0ODQ3ZTIwYzlkYmY5MDExZGZiZWYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7AD3RQpyvdNJGqtuyQNqobhRs-x6hraij2g4PHUj-Pw'
  }
};



  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player__info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}
