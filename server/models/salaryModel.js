import mongoose, {Schema} from "mongoose";

const salarySchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    basicSalary: {
        type: 'number',
        required: true
    },
    allowances: {
        type: 'number'
    },
    deductions: {
        type: 'number'
    },
    netSalary: {
        type: 'number'
    },
    payDate: {
        type: Date,
        required: true
    }
}, {timestamps: true})

export const Salary = mongoose.model('Salary', salarySchema)