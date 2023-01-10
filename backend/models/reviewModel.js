const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
)

const reviewModel = mongoose.model('review', reviewSchema)

module.exports = { reviewModel }
