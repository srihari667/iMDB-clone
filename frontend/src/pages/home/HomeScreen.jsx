import './home.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import React from 'react'
import Container from 'react-bootstrap/Container'
import { Carousel } from 'react-responsive-carousel'
import { BsFillStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Cards from '../../components/cards/Card'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllMovie } from '../../features/movieSlice'

const HomeScreen = () => {
  const { movies } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  console.log(movies)

  useEffect(() => {
    console.log('hi')
    dispatch(getAllMovie())
  }, [])

  return (
    <div className='pb-5'>
      <Container>
        {movies.length ? (
          <>
            <div className='my-5 d-flex flex-wrap'>
              {movies.map((ele, index) => {
                return (
                  <Cards
                    movie={{
                      ...ele,
                    }}
                  />
                )
              })}
            </div>
          </>
        ) : (
          <div className='mt-5'>
            <h2 className='text-center mt-5'>No movies To Show</h2>
          </div>
        )}
      </Container>
    </div>
  )
}

export default HomeScreen
