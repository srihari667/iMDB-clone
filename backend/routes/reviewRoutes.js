const express = require('express')
const {
  ReadReviews,
  CreateReviews,
  UpdateReviews,
  DeleteReviews,
} = require('../controllers/reviewController')
const { protectUser } = require('../middlewares/authmiddlewareuser')

const Routes = express.Router()
//public routes
Routes.route('/rev').get(ReadReviews).post(protectUser, CreateReviews)
Routes.route('/rev/:id').put(protectUser, UpdateReviews).delete(protectUser, DeleteReviews)
//protected admin
// Routes.route('/getAllUsers').get(protectAdmin, getuser)

module.exports = Routes
