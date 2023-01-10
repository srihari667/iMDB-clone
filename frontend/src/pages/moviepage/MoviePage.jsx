import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Review from '../../components/review/Review'
import { getOneMovie } from '../../features/movieSlice'
import './moviePage.css'
const MoviePage = () => {
  const { id } = useParams()
  const { movie } = useSelector((state) => state.movies)
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOneMovie(id))
  }, [id])

  return (
    <Container className='movie py-5'>
      <div className='d-flex gap-5'>
        <div>
          <img src={movie.image} alt={movie.title} className='movie__poster' />
        </div>
        <div className='movie__details flex-grow-1'>
          <h1 className='movie__title'>{movie.title}</h1>
          <p>{movie.duration}</p>
          <div className='movie__details2'>
            <p className='movie__rating'>
              <Rating
                initialValue={
                  movie.reviews &&
                  movie.reviews.reduce((pre, ele) => (pre += ele.rating), 0) /
                    movie.reviews.length
                }
                allowFraction={true}
                size={20}
                readonly={true}
              />
              <span className='ms-3'>
                {movie.reviews &&
                  movie.reviews.reduce((pre, ele) => (pre += ele.rating), 0) /
                    movie.reviews.length}
              </span>
            </p>
          </div>
          <div className='movie__desc'>
            <p>{movie.description}</p>
          </div>
          <p>Director : {movie.director}</p>
          <p>Producer : {movie.producer}</p>
        </div>
      </div>
      <div className='actor'>
        <h3 className='mb-4'>Actors</h3>
        <div className='d-flex flex-wrap gap-5'>
          {movie.actors &&
            movie.actors.map((ele) => {
              return (
                <div className='actor__details'>
                  <img src={ele.image} className='actor__image' />
                  <span className='fs-5 ms-4'>{ele.name}</span>
                </div>
              )
            })}
        </div>
      </div>
      <div className='mt-5'>
        <h3 className='mb-4'>Reviews</h3>
        {movie.reviews &&
          movie.reviews.map((ele) => {
            return (
              <>
                <div>
                  <h5>{ele.user && ele.user.name}</h5>
                  <p>{ele.comment}</p>
                </div>
                <hr />
              </>
            )
          })}
      </div>
      {user && user.role === 'user' && (
        <div className='review mt-5'>
          <Review id={movie.id} />
        </div>
      )}
    </Container>
  )
}

export default MoviePage
