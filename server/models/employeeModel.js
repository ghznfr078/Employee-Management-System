import mongoose, {Schema} from "mongoose";

const employeeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    designation: {
        type: String
    },
    salary: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {timestamps: true})

export const Employee = mongoose.model('Employee', employeeSchema)