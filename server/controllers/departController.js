import {Department} from '../models/departModel.js'

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body
        
        const newDep = await Department.create({
            dep_name,
            description
        })


        return res.status(201).json({success: true, newDep})

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Server error" });
    }
    
}

export {addDepartment}