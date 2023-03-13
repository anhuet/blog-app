const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const URL = process.env.MONGODB_URL
const dbConenct = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB is connected successfully')
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConenct
