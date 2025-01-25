import {Department} from '../models/departModel.js'
import mongoose, {isValidObjectId} from 'mongoose'

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

const getDepartment = async (req, res) => {
    try {
        const {id} = req.params

        if(!isValidObjectId(id)) {
            return res.status(402).json({ success: false, message: "dept id is missing or invalid!" });
        }

        const department = await Department.findById(id)

        return res.status(200).json({success: true, department})

    } catch (error) {
        return res.status(500).json({ success: false, error: "get dept with id Server error" });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params
        const {dep_name, description} = req.body

        if(!isValidObjectId(id)) {
            return res.status(402).json({ success: false, message: "dept id is missing or invalid!" });
        }

        const department = await Department.findByIdAndUpdate(id, {
            dep_name,
            description
        })

        return res.status(200).json({success: true, department})
    
    } catch (error) {
        return res.status(500).json({ success: false, error: "update dept with id Server error" });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params

        const deletedep = await Department.findById(id)

        await deletedep.deleteOne()

        return res.status(200).json({success: true})

    } catch (error) {
        return res.status(500).json({ success: false, error: "delete dept with id Server error" });
    }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}