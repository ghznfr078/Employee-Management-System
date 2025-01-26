import path from "path"
import { Employee } from "../models/employeeModel.js"
import { User } from "../models/userModel.js"
import {Department} from '../models/departModel.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import { uploadOnCloudinary } from "../utils/cloudinary.js"

// Memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage})


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
        } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in emp" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const file = req.file; // Get the file from the request

        // Upload the file to Cloudinary
        let profileImageUrl = '';
        if (file) {
            const cloudinaryResponse = await uploadOnCloudinary(file);
            if (cloudinaryResponse) {
                profileImageUrl = cloudinaryResponse.secure_url; // Save Cloudinary URL
            } else {
                return res.status(400).json({ success: false, error: 'Failed to upload image' });
            }
        }

        const newUser = new User({
            name,
            email,
            profileImage: profileImageUrl,
            password: hashPassword,
            role
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        const savedEmployee = await newEmployee.save();

        return res.status(201).json({ success: true, message: "Employee created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error in adding employee" });
    }
};


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')

        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({ success: false, message: "get employee Server error" });
    }
}

const getEmployee = async (req, res) => {
    try {
        const {id} = req.params
        let employee;

        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department')

        if(!employee) {
            employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department')
        }

        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({ success: false, message: "get employee Server error" });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params
        const {name, maritalStatus, designation, department, salary} = req.body

        const employee = await Employee.findById(id)

        if(!employee) {
            return res.status(404).json({ success: false, error: "employee not found!" });
        }

        const user = await User.findById({_id: employee.userId})

        if(!user) {
            return res.status(404).json({ success: false, error: "user not found!" });
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})

        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation,
            salary,
            department
        })

        if(!updateEmployee || !updateUser) {
            return res.status(500).json({ success: false, error: "document not found" });
        }

        return res.status(200).json({success: true, message: "employee updated!"})
    } catch (error) {
        return res.status(500).json({ success: false, error: "update employee Server error" });
    }
}
 
const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params
    try {
        const employees = await Employee.find({department: id})

        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({ success: false, message: "get employeeByDepId Server error" });
    }
}

export {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId}