import mongoose, {Schema} from "mongoose";

const leaveSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['Sick Leave', 'Casual Leave', 'Annual Leave']
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: string,
        required: true,
    },
    status: {
        type: string,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected']
    }
}, {timestamps: true})

export const Leave = mongoose.model('Leave', leaveSchema)