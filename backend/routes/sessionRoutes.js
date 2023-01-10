const express = require('express')
const {
  getMeREAD,
  getMeDelete,
  loginFunction,
  registerfunction,
  getMeUpdatePassword,
  getusers,
} = require('../controllers/sessionControllers')
const { protect } = require('../middlewares/authmiddleware')
const { protectAdmin } = require('../middlewares/authmiddlewareadmin')
const Routes = express.Router()
//public routes
Routes.route('/login').post(loginFunction)
Routes.route('/register').post(registerfunction)

//Protected or Private routes FOR CRUD OPERATIONS OF USER INFORMATION
Routes.route('/getMe').get(protect, getMeREAD)
Routes.route('/getMe/:id').put(protect, getMeUpdatePassword).delete(protect, getMeDelete)

//protected admin
// Routes.route('/getAllUsers').get(protectAdmin, getuser)

Routes.route('/getAllRoutes').get(protectAdmin, getusers)
module.exports = Routes
