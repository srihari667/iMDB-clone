const asyncHandler = require('express-async-handler')
const { reviewModel } = require('../models/reviewModel')
const { userModel } = require('../models/userModel')
const { movieModel } = require('../models/movieModel')
const ReadReviews = asyncHandler(async (req, res, next) => {
  const result = await reviewModel.find()

  res.json(result)
})
const CreateReviews = asyncHandler(async (req, res, next) => {
  const { movie, rating, comment } = req.body
  console.log(movie, rating, comment)
  const user = req.user
  if (user) {
    const checkuser = await userModel.findOne({ id: user.id })
    const checkmovie = await movieModel.findOne({ id: movie })
    if (checkuser && checkmovie) {
      console.log(user.id)
      const result = await reviewModel.create({
        user: user.id,
        movie,
        rating,
        comment,
      })
      await movieModel.findByIdAndUpdate(
        { _id: movie },
        { $push: { reviews: result.id } }
      )
      if (result) {
        res.json(result)
      } else {
        res.status(500)
        throw new Error('something went wrong')
      }
    } else {
      res.status(400)
      throw new Error('user or movie is not available')
    }
  } else {
    res.status(400)
    throw new Error('user not available')
  }
})
const UpdateReviews = asyncHandler(async (req, res, next) => {
  const getuserID = req.user.id
  const { rating, comment } = req.body
  const getreview = req.params.id
  if (getuserID) {
    if (getreview) {
      if (rating && comment) {
      } else {
        res.status(400)
        throw new Error('upate data Not available')
      }
    } else {
      res.status(400)
      throw new Error('movie Not available')
    }
  } else {
    res.status(400)
    throw new Error('User Not available')
  }
})
const DeleteReviews = asyncHandler(async (req, res, next) => {
  const getUser = req.user.id
  const getReview = req.params.id
  if (getUser) {
    const checkuser = await reviewModel.findOne({ id: getReview })
    if (checkuser.user.toString() === getUser) {
      const result = await reviewModel.findByIdAndDelete(getReview)
      if (result) {
        res.json({ result, message: 'review deleted' })
      } else {
        res.status(500)
        throw new Error(' something went wrong')
      }
    } else {
      res.status(400)
      throw new Error(' you are not authorized')
    }
  } else {
    res.status(400)
    throw new Error('userNot available')
  }
})
module.exports = { ReadReviews, CreateReviews, UpdateReviews, DeleteReviews }
