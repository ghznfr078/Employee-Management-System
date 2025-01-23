import path from "path"
import { Employee } from "../models/employeeModel.js"
import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body
    
        const user = await User.findOne({email})
    
        if(user) {
            return res.status(400).json({success: false, error: "user already registered in emp"})
        }
    
        const hashpassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            name,
            email,
            profileImage: req.file ? req.file.filename : "",
            password: hashpassword,
            role
        })
    
        const savedUser = await newUser.save()
    
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        })
        
        
    
        const savedEmployee = await newEmployee.save()
        console.log(savedEmployee);

        return res.status(201).json({success: true, message: "employee created"})
    } catch (error) {
        return res.status(500).json({success: false, message: "server error in adding employee"})
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')

        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({ success: false, message: "get employee Server error" });
    }
}

export {addEmployee, upload, getEmployees}