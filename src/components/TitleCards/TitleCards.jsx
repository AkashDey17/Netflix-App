import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_Data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom'

const TitleCards = ({title , category}) => {
  const [apiData , setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method : 'GET',
    headers : {
      accept : 'application/json',
      Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWUwN2IxZTAwYjQxNjcwNzgxMDFlMzlkMjNjNTg0YyIsIm5iZiI6MTcyMzE0MzgyOC43OTY2MTksInN1YiI6IjY2YjUxNTc3N2FjNzhhZWEzM2M1ZDIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5r5RmHUtHu6K_agz36VZdH-tKxoAA6vdwrzq4Sr8DBg' 
    }
  };
  const handleWheel = (event) => {
   event.preventDefault();
   cardsRef.current.scrollLeft += event.deltaY;
  } 
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.log(err));


    // cardsRef.current.addEventListener('wheel' , handleWheel)
  },[])
  return (
    <div className='title-cards'>
      <h2>{title ? title :"Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.map((card , index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index} ref={cardsRef}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
