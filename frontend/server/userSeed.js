import connectToDb from "./db/db.js";
import { User } from "./models/userModel.js";
import bcrypt from 'bcrypt'


const userRegister = async () => {
    connectToDb()
    try {
        const hashedPassword = await bcrypt.hash('admin', 10)
        const newUser = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin'
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
    }
}

userRegister()