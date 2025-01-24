import { Leave } from "../models/leaveModel.js"
import {Employee} from "../models/employeeModel.js"

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body

        const employee = await Employee.findOne({userId})

        const newLeave = new Leave({
            employeeId: employee._id, leaveType, startDate, endDate, reason
        })

        await newLeave.save()

        return res.status(201).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "add leave server error"})
    }
}

const getLeaves = async (req, res) => {
    const {id} = req.params
    try {
        const employee = await Employee.findOne({userId: id})

        const leaves = await Leave.find({employeeId: employee._id})

        return res.status(200).json({success: true, leaves})
    } catch (error) {
        return res.status(500).json({success: false, error: "get leaves server error"})
    }


}


export {addLeave, getLeaves}