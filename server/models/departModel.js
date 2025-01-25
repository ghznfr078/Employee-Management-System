import mongoose from "mongoose";
import {Employee} from './employeeModel.js'
import {Leave} from './leaveModel.js'
import {Salary} from './salaryModel.js'

const departSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String}
}, {timestamps: true})

departSchema.pre('deleteOne', {
    document: true,
    query: false
}, 
async function (next) {
    try {
        const employees = await Employee.find({department: this._id})
        const empIds = employees.map(emp => emp._id)

        await Employee.deleteMany({department: this._id})

        await Leave.deleteMany({employeeId: {$in: empIds}})

        await Salary.deleteMany({employeeId: {$in: empIds}})
        next()
    } catch (error) {
        next(error)
    }
}
)

export const Department = mongoose.model('Department', departSchema)