import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { createReview } from '../../features/movieSlice'

const Review = () => {
  const { id } = useParams()
  const [review, setReview] = useState({ rating: 0, comment: '' })
  const dispatch = useDispatch()
  const handleRating = (number) => {
    setReview({ ...review, rating: number })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createReview({ ...review, movie: id }))
    setReview({ rating: 0, comment: '' })
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label className='fs-5'>Enter Review</Form.Label>
          <div className='mb-3'>
            <Rating
              allowFraction={true}
              size={20}
              onClick={handleRating}
              initialValue={review.rating}
            />
          </div>
          <Form.Control
            as='textarea'
            rows={5}
            className='bg-dark text-white'
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            value={review.comment}
          />
        </Form.Group>
        <Button variant='dark' type='submit' className='rounded-0'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Review
