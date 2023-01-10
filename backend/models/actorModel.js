const mongoose = require('mongoose')

const actorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
)

const actorModel = mongoose.model('actor', actorSchema)

module.exports = { actorModel }
