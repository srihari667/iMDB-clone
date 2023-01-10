const jwt = require('jsonwebtoken')
const { userModel } = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const protectUser = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    if (token) {
      const result = await jwt.verify(token, process.env.JWT_SECRET)

      const getUser = await userModel.findById(result.id).select('-password')
      req.user = getUser
      if (req.user.role === 'user') {
        next()
      } else {
        res.status(400)
        throw new Error('you are not a user')
      }
    } else {
      res.status(400)
      throw new Error('token not available')
    }
  }
})

module.exports = { protectUser }
