import mongoose from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI || ''

const runMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}

export default runMongo
