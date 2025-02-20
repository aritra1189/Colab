import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()


const connectdb=async()=>{
    try{
         await mongoose.connect(`${process.env.mongoURI}`)
         console.log(`\nMongoDB connected!! Database Host: ${mongoose.connection.host}`);
    }
    catch(error){
        console.log("Mongodb connection error",error);
        process.exit(1)
    }
}

export default connectdb