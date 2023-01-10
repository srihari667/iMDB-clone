import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { register } from '../../features/userSlice'

const RegisterScreen = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    approve: true,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register(input))
  }
  return (
    <Container>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='col-11 col-md-8 col-lg-5 border p-5 rounded-3 bg-dark'>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                name='name'
                onChange={onChange}
                value={input.name}
                className='bg-dark text-white'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={onChange}
                value={input.email}
                className='bg-dark text-white'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                onChange={onChange}
                value={input.password}
                className='bg-dark text-white'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                inline
                label='user'
                name='group1'
                type={'radio'}
                onClick={(e) => {
                  if (e.target.checked) setInput({ ...input, role: 'user' })
                }}
              />
              <Form.Check
                inline
                label='producer'
                name='group1'
                type={'radio'}
                onClick={(e) => {
                  if (e.target.checked) setInput({ ...input, role: 'producer' })
                }}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='my-3 rounded-0 w-100'
            >
              Submit
            </Button>
          </Form>
          <p className='text-center'>
            Existing User ? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default RegisterScreen
