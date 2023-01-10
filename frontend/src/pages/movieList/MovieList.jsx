import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  deleteMovie,
  getAllProducerMovie,
  resetState,
} from '../../features/movieSlice'
import Alert from 'react-bootstrap/Alert'

const MovieList = () => {
  const { movies, deleteSuccess } = useSelector((state) => state.movies)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllProducerMovie())
  }, [deleteSuccess])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (!(user.role === 'producer' && user.approve === true)) {
      navigate('/')
    }
  }, [user])
  return (
    <Container>
      {deleteSuccess && (
        <Alert variant='success'>{'Film Edited Successfully'}</Alert>
      )}
      {user && (
        <Table striped bordered hover variant='dark' className='my-5'>
          <thead>
            <tr>
              <th>#</th>
              <th>Poster</th>
              <th>Movie Name</th>
              <th>Release Date</th>
              <th>Producer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies &&
              movies.map((ele, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={ele.image}
                        alt={ele.title}
                        style={{ maxHeight: '150px' }}
                      />
                    </td>
                    <td>{ele.title}</td>
                    <td>{ele.releaseDate}</td>
                    <td>{ele.producer}</td>
                    <td>
                      <Link to={`/movies/${ele._id}/edit`}>
                        <Button
                          className='rounded-0 me-2'
                          onClick={() => dispatch(resetState())}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        className='rounded-0'
                        onClick={() => dispatch(deleteMovie(ele._id))}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default MovieList
