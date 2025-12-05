import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



export default function TitleCards({title, category}) {
    const [apiData, setApiData] = useState([])

    const cardsRef = useRef();

    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTgzNmU2NzFmY2NkMTFhMDZmNTZiMDYxMTQ2ODg1YSIsIm5iZiI6MTY4NjQwNDY0MC42ODYsInN1YiI6IjY0ODQ3ZTIwYzlkYmY5MDExZGZiZWYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7AD3RQpyvdNJGqtuyQNqobhRs-x6hraij2g4PHUj-Pw'
  }
};



    const handleWheel = (event)=>{
        event.preventDefault;
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    },[])

  return (
    <div className='titleCards'>
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="card__list" ref={cardsRef}>
            {apiData.map((card, index)=>{
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={'https://image.tmdb.org/t/p/w500'+ card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}
        </div>
    </div>
  )
}
