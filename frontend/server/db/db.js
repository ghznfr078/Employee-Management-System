import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const DB_NAME = "EMS"
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`).then(() => {
        console.log("Db connected successfully")
       }).catch(() => {
        console.log("Error while connecting db!");
       })
    } catch (error) {
        console.log(error);
    }
}

export default connectToDb