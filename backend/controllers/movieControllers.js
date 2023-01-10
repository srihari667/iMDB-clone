const asyncHandler = require('express-async-handler')
const { movieModel } = require('../models/movieModel')
const { userModel } = require('../models/userModel')
const CreateMovie = asyncHandler(async (req, res, next) => {
  console.log(req.user.role)
  if (req.user.role === 'producer') {
    const checkmovie = await movieModel.findOne({ title: req.body.title })

    if (!checkmovie) {
      const result = await movieModel.create({
        ...req.body,
        producer: req.user.name,
      })
      if (result) {
        res.status(200)
        res.json({ result, message: 'movie Created' })
      } else {
        res.status(500)
        throw new Error('something went Wrong')
      }
    } else {
      res.status(400)
      throw new Error('movie Already exists!!')
    }
  } else {
    res.status(400)
    throw new Error('You are not a producer to add movie')
  }
})
const ReadMovie = asyncHandler(async (req, res, next) => {
  const producer = req.user.name
  if (producer) {
    const listMovies = await movieModel.find({ producer: producer })
    res.json(listMovies)
  } else {
    res.status(400)
    throw new Error('producer is not available')
  }
})
const updateMovie = asyncHandler(async (req, res, next) => {
  console.log(req.user.role)
  if (req.user.role === 'producer') {
    const checkmovie = await movieModel.findById(req.params.id)

    if (checkmovie) {
      const result = await movieModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      )
      if (result) {
        res.status(200)
        res.json({ result, message: 'movie modified' })
      } else {
        res.status(500)
        throw new Error('something went Wrong')
      }
    } else {
      res.status(400)
      throw new Error('movie is not available!!')
    }
  } else {
    res.status(400)
    throw new Error('You are not a producer to add movie')
  }
})
const deleteMovie = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'producer') {
    const checkdata = await movieModel.findOne({ id: req.params.id })
    console.log(checkdata)
    if (checkdata) {
      const result = await movieModel.findByIdAndDelete(req.params.id)
      if (result) {
        res.json({ result, message: 'movie deleted' })
      } else {
        res.status(400)
        throw new Error('something went wrong')
      }
    } else {
      res.status(400)
      throw new Error('movie not found')
    }
  }
})
const getAllMovies = asyncHandler(async (req, res, next) => {
  let results = await movieModel.find()
  res.json(results)
})

const movieReview = asyncHandler(async (req, res, next) => {
  res.json({ name: 'movieReview' })
})

const AddActors = asyncHandler(async (req, res, next) => {
  res.json({ name: 'add actors' })
})

const getAmovie = asyncHandler(async (req, res, next) => {
  const params = req.params.id

  console.log(params)

  if (params) {
    let check = await movieModel
      .findById(params)
      .populate({ path: 'reviews', populate: { path: 'user', select: 'name' } })
      .populate({ path: 'actors' })
    console.log(check)
    if (params) {
      res.json(check)
    } else {
      res.status(400)
      throw new Error('parameter which you have sent is incorrect')
    }
  } else {
    res.status(400)
    throw new Error('please send the parameter')
  }
})
module.exports = {
  CreateMovie,
  ReadMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  movieReview,
  AddActors,
  getAmovie,
}
