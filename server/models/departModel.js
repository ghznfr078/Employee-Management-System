import mongoose from "mongoose";
import {Employee} from './employeeModel.js'
import {Leave} from './leaveModel.js'
import {Salary} from './salaryModel.js'
import {User} from './userModel.js'

const departSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String}
}, {timestamps: true})

departSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function (next) {
      try {
        // Find employees in the department being deleted
        const employees = await Employee.find({ department: this._id });
        const employeeIds = employees.map((emp) => emp._id);
  
        // Delete employees in this department
        await Employee.deleteMany({ department: this._id });
  
        // Delete users associated with these employees
        const userIds = employees.map((emp) => emp.userId); // Assuming `Employee` references `User` by `userId`
        await User.deleteMany({ _id: { $in: userIds } });
  
        // Delete leaves and salaries associated with these employees
        await Leave.deleteMany({ employeeId: { $in: employeeIds } });
        await Salary.deleteMany({ employeeId: { $in: employeeIds } });
  
        next();
      } catch (error) {
        next(error);
      }
    }
  );
  

export const Department = mongoose.model('Department', departSchema)