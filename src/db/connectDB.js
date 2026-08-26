import mongoose from 'mongoose'
import 'dotenv/config'

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed",error.message);
        
    }
}

export default connectDB