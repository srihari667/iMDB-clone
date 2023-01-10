import React from 'react'

import './cards.css'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
const Cards = ({ movie }) => {
  return (
    <>
      {
        <Link
          to={`/movies/${movie._id}`}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <Card className='cards '>
            <img className='cards__img' src={`${movie ? movie.image : ''}`} />
            <div className='cards__overlay'>
              <div className='card__title'>{movie ? movie.title : ''}</div>
              <div className='card__runtime'>
                {movie ? movie.releaseDate : ''}
              </div>
              <div className='card__description'>
                {movie ? movie.description.slice(0, 118) + '...' : ''}
              </div>
            </div>
          </Card>
        </Link>
      }
    </>
  )
}

export default Cards
