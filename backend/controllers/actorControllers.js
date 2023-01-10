const asyncHandler = require('express-async-handler')
const { actorModel } = require('../models/actorModel')
const CreateActor = asyncHandler(async (req, res, next) => {
  const { name, image, gender, dob } = req.body
  if ((name, image, gender, dob)) {
    if (req.user.role === 'producer') {
      const checkdata = await actorModel.findOne({ name, image, gender, dob })
      if (checkdata) {
        res.status(400)
        throw new Error('actor is available already')
      } else {
        const result = await actorModel.create({ name, image, gender, dob })
        res.json(result)
      }
    } else {
      res.status(400)
      throw new Error('you are not a producer ')
    }
  } else {
    res.status(400)
    throw new Error('please fill out all the fields')
  }
})
const ReadActor = asyncHandler(async (req, res, next) => {
  const result = await actorModel.find()
  res.json(result)
})
module.exports = { CreateActor, ReadActor }
