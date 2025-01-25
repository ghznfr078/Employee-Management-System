import {Employee} from '../models/employeeModel.js'
import {Department} from '../models/departModel.js'
import { Leave } from '../models/leaveModel.js'

const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments()

        const totalDepartments = await Department.countDocuments()

        const totalSalaries = await Employee.aggregate([
            {$group: {_id: null, totalSalary: {$sum: '$salary'}}}
        ])

        const employeesAppliedForLeave = await Leave.distinct('employeeId')

        const leaveStatus = await Leave.aggregate([
            {$group: {
                _id: '$status',
                count: {$sum: 1}
            }}
        ])

        const leaveSummary = {
            appliedFor: employeesAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === 'Approved')?.count || 0,
            rejected: leaveStatus.find(item => item._id === 'Rejected')?.count || 0,
            pending: leaveStatus.find(item => item._id === 'Pending')?.count || 0
        }

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })

    } catch (error) {
        return res.status(500).json({success: false, error: "dashboard summary server error"})
    }
}

export {getSummary}


// import { Employee } from "../models/employeeModel.js";
// import { Department } from "../models/departModel.js";
// import { Leave } from "../models/leaveModel.js";

// const getSummary = async (req, res) => {
//   try {
//     // Count total employees
//     const totalEmployees = await Employee.countDocuments();

//     // Count total departments
//     const totalDepartments = await Department.countDocuments();

//     // Sum total salaries
//     const totalSalaries = await Employee.aggregate([
//       { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
//     ]);

//     // Find distinct employees who applied for leave
//     const employeesAppliedForLeave = await Leave.distinct("employeeId");

//     // Group leave data by status
//     const leaveStatus = await Leave.aggregate([
//       {
//         $group: {
//           _id: "$status", // Group by leave status
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // Prepare the leave summary
//     const leaveSummary = {
//       appliedFor: employeesAppliedForLeave.length,
//       approved:
//         leaveStatus.find((item) => item._id === "Approved")?.count || 0,
//       rejected:
//         leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
//       pending:
//         leaveStatus.find((item) => item._id === "Pending")?.count || 0,
//     };

//     // Send the response
//     return res.status(200).json({
//       success: true,
//       totalEmployees,
//       totalDepartments,
//       totalSalary: totalSalaries[0]?.totalSalary || 0,
//       leaveSummary,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Dashboard summary server error" });
//   }
// };

// export { getSummary };
