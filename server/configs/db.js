import mongoose from 'mongoose'

// fun to connect mongodb data base
const connectDB = async () =>{
    mongoose.connection.on('connected' , ()=> console.log('database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/offcampus`)
}

export default connectDB