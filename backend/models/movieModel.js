const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
  {
    title: { type: String, min: 4, required: true },
    releaseDate: { type: String, required: true },
    image: { type: String, required: true, min: 8 },
    duration: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'actor' }],
    director: { type: String, required: true },
    producer: { type: String, min: 4, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
  },
  { timestamps: true }
)

const movieModel = mongoose.model('movie', movieSchema)

module.exports = { movieModel }
