const mongoose = require('mongoose')
const DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongo Connected ${conn.connection.host}`.bgBlue.yellow.bold)
  } catch (error) {
    console.log('error while connecting Mongo')
  }
}

module.exports = { DB }
