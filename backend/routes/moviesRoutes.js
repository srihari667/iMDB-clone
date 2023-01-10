const express = require('express')
const {
  getAllMovies,
  CreateMovie,
  ReadMovie,
  updateMovie,
  deleteMovie,
  movieReview,
  AddActors,
  getAmovie,
} = require('../controllers/movieControllers')
const { protectProducer } = require('../middlewares/authmiddlewareProducer')
const { protectUser } = require('../middlewares/authmiddlewareuser')
const Routes = express.Router()
//protected
Routes.route('/movie').get(protectProducer, ReadMovie).post(protectProducer, CreateMovie)
Routes.route('/movie/:id').put(protectProducer, updateMovie).delete(protectProducer, deleteMovie)
Routes.route('/:id').post(protectProducer, AddActors)
//public
Routes.route('/:id').get(getAmovie)
Routes.route('/').get(getAllMovies)
Routes.route('/Review/:id').get(protectUser, movieReview)
module.exports = Routes
