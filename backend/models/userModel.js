const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { type: String, min: 4, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    role: {
      type: String,
      enum: ['admin', 'user', 'producer'],
      default: 'user',
    },
    approve: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }
