import {Department} from '../models/departModel.js'

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body
        
        const newDep = await Department.create({
            dep_name,
            description
        })


        return res.status(201).json({success: true, department: newDep})

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Server error" });
    }
    
}

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()

        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({ success: false, message: "get dpt Server error" });
    }
}

export {addDepartment, getDepartments}