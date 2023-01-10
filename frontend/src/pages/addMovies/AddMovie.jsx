import './addMovie.css'

import React from 'react'
import Container from 'react-bootstrap/Container'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import Alert from 'react-bootstrap/Alert'
import { addActors, getActors } from '../../features/actorsSlice'
import { addMovie, editMovie, getOneMovie } from '../../features/movieSlice'

const AddMovie = () => {
  const [showAddActor, setShowAddActor] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, error } = useSelector((state) => state.user)
  const { actors } = useSelector((state) => state.actors)
  const { movie, addSuccess, updateSuccess } = useSelector(
    (state) => state.movies
  )

  const [input, setInput] = useState({
    title: id ? movie.title : '',
    director: id ? movie.director : '',
    releaseDate: id ? movie.releaseDate : '',
    duration: id ? movie.duration : '',
    description: id ? movie.description : '',
    image: id ? movie.image : '',
  })

  const [movieActors, setMovieActors] = useState([])
  const [selectActor, setSelectActor] = useState('')

  useEffect(() => {
    if (id) {
      dispatch(getOneMovie(id))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setInput({
        title: movie.title,
        director: movie.director,
        releaseDate: movie.releaseDate,
        duration: movie.duration,
        description: movie.description,
        image: movie.image,
      })
      setMovieActors(movie.actors ? movie.actors.map((ele) => ele._id) : [])
    }
  }, [id, movie])

  useEffect(() => {
    dispatch(getActors())
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (!(user.role === 'producer' && user.approve === true)) {
      navigate('/')
    }
  }, [user])

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (id) {
      dispatch(
        editMovie({
          id,
          movie: {
            ...input,
            actors: [...movieActors],
          },
        })
      )
    } else {
      dispatch(addMovie({ ...input, actors: [...movieActors] }))
    }
  }
  return (
    <Container className='py-5'>
      {error && <Alert variant='danger'>{error}</Alert>}
      {addSuccess && (
        <Alert variant='success'>{'Film Added Successfully'}</Alert>
      )}
      {updateSuccess && (
        <Alert variant='success'>{'Film Edited Successfully'}</Alert>
      )}
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            name='title'
            onChange={onChange}
            value={input.title}
            className='bg-dark text-white'
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Director</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Director'
            name='director'
            onChange={onChange}
            value={input.director}
            className='bg-dark text-white'
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter Release Date'
            name='releaseDate'
            onChange={onChange}
            value={input.releaseDate}
            className='bg-dark text-white'
            required={true}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter duration'
            name='duration'
            onChange={onChange}
            value={input.duration}
            className='bg-dark text-white'
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter description'
            name='description'
            onChange={onChange}
            value={input.description}
            className='bg-dark text-white'
            as={'textarea'}
            rows={5}
            required={true}
          />
        </Form.Group>

        <div className='actor__selector'>
          <Form.Group className='mb-3'>
            <Form.Label>Select Actors</Form.Label>
            <div className='mb-2'>
              {actors
                .filter((ele) => movieActors.includes(ele._id))
                .map((ele) => {
                  return (
                    <span className='small border rounded-pill px-1 mx-1  border-secondary'>
                      {ele.name}
                    </span>
                  )
                })}
            </div>
            <Form.Control
              type='search'
              placeholder='Enter Actor Name'
              name='actorName'
              onChange={(e) => setSelectActor(e.target.value.trim())}
              value={selectActor}
              className='bg-dark text-white'
            />
          </Form.Group>
          <div
            className='actor__list'
            style={{ maxHeight: '120px', overflow: 'auto' }}
          >
            {selectActor.length >= 1 &&
              (actors.filter((actor) =>
                actor.name.toLowerCase().includes(selectActor.toLowerCase())
              ).length > 0 ? (
                actors
                  .filter((actor) =>
                    actor.name.toLowerCase().includes(selectActor.toLowerCase())
                  )
                  .map((ele, index) => {
                    return (
                      <div key={`act-${index}`}>
                        <Button
                          className='rounded-0 w-100'
                          variant='secondary'
                          onClick={() => {
                            setMovieActors([...movieActors, ele._id])
                          }}
                        >
                          {ele.name}
                        </Button>
                      </div>
                    )
                  })
              ) : (
                <div>
                  <Button
                    className='rounded-0 w-100'
                    variant='secondary'
                    onClick={() => setShowAddActor(true)}
                  >
                    Add New Actor
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <Form.Group className='mb-3'>
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image Link'
            name='image'
            onChange={onChange}
            value={input.image}
            className='bg-dark text-white'
            required={true}
          />
        </Form.Group>

        {input.image && (
          <div>
            <img
              src={input.image || ''}
              alt='enter Image'
              style={{ maxHeight: '250px' }}
            />
          </div>
        )}

        <Button
          variant='primary'
          type='submit'
          className='my-3 rounded-0 w-100'
        >
          Submit
        </Button>
      </Form>
      <AddActor show={showAddActor} setShow={setShowAddActor} />
    </Container>
  )
}

function AddActor({ show, setShow }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: '',
    image: '',
    gender: 'male',
    dob: '',
  })
  const [error, setError] = useState('')
  const handleClose = () => setShow(false)
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!input.name) {
      setError('Enter Name')
    } else if (!input.image) {
      setError('Enter Image Link')
    } else if (!input.dob) {
      setError('Enter DOB')
    } else {
      dispatch(addActors(input))
      handleClose()
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Actor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert>{error}</Alert>}
          <Form.Group className='mb-3'>
            <Form.Label>Actor Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Actor Name'
              name='name'
              onChange={onChange}
              value={input.name}
              required={true}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type='date'
              placeholder='Enter DOB'
              name='dob'
              onChange={onChange}
              value={input.dob}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image Link'
              name='image'
              onChange={onChange}
              value={input.image}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Check
              inline
              label='male'
              name='group1'
              type={'radio'}
              onClick={(e) => {
                if (e.target.checked) setInput({ ...input, role: 'male' })
              }}
            />
            <Form.Check
              inline
              label='female'
              name='group1'
              type={'radio'}
              onClick={(e) => {
                if (e.target.checked) setInput({ ...input, role: 'female' })
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddMovie
