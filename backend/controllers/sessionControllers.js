const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userModel } = require('../models/userModel')
const { body, validationResult } = require('express-validator')
/*




*/

// register function
const registerfunction = asyncHandler(async (req, res, next) => {
  const { name, email, password, approve, role } = req.body
  let passlength = password.length > 7

  if (name && email && passlength) {
    const checkUser = await userModel.findOne({ email: email })

    if (!checkUser) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const result = await userModel.create({
        name,
        email,
        password: hash,
        approve,
        role,
      })
      if (result) {
        res.send(result)
      } else {
        res.status(500)
        throw new Error('something went wrong')
      }
    } else {
      res.status(400)
      throw new Error('email already existed !!')
    }
  } else {
    res.status(400)
    throw new Error('please fill out the details correctly')
  }
})
/*




*/
//login function
const loginFunction = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  if (email && password) {
    let checkUser = await userModel.findOne({ email: email })
    if (checkUser) {
      console.log(checkUser)
      const checkpassword = await bcrypt.compare(password, checkUser.password)
      console.log(checkpassword)
      if (checkpassword) {
        res.json({
          email: checkUser.email,
          token: gentoken(checkUser.id),
          role: checkUser.role,
          // approve,
          approve: checkUser.approve,
        })
      } else {
        res.status(400)
        throw new Error('password didnt match')
      }
    } else {
      res.status(400)
      throw new Error('email not found')
    }
  } else {
    res.status(400)
    throw new Error('please fillout essential details')
  }
})
/*




*/
const getMeREAD = asyncHandler(async (req, res, next) => {
  res.json(req.user)
})
/*




*/
const getMeUpdatePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body
  const { id, name, email } = req.user
  console.log(password.length > 7)
  if ((name, email, password)) {
    const gensalt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, gensalt)
    console.log(password, await bcrypt.compare(password, hash))
    const userInfo = { name, email, password: hash }
    const result = await userModel.findByIdAndUpdate(id, userInfo, {
      new: true,
    })
    res.json({
      name: result.name,
      email: result.email,
      message: 'password updated',
    })
  } else {
    res.status(400)
    throw new Error('password length is not up to the mark')
  }
})
/*




*/
const getMeDelete = asyncHandler(async (req, res, next) => {
  res.json
})
/*





*/
const gentoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30D' })
}

const getusers = asyncHandler(async (req, res, next) => {
  const isAdmin = req.user.role
  if (isAdmin === 'admin') {
    const result = await userModel.find()
    if (result) {
      res.json(result)
    } else {
      res.status(500)
      throw new Error('something went Wrong')
    }
  } else {
    res.status(400)
    throw new Error('you are not an admin')
  }
})
module.exports = {
  registerfunction,
  loginFunction,
  getMeDelete,
  getMeREAD,
  getMeUpdatePassword,
  getusers,
}
