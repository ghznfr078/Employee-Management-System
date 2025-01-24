import {Salary} from '../models/salaryModel.js'
import {Employee} from '../models/employeeModel.js'

const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(201).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "add salary server error"})
    }
}

const getSalary = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Try finding the salary using the provided ID
      let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
  
      // If no salary is found, try finding by linked employee ID
      if (!salary || salary.length === 0) {
        const employee = await Employee.findOne({ userId: id });
        if (employee) {
          salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
        }
      }
  
      // Return the salary details or an empty array if not found
      return res.status(200).json({ success: true, salary });
  
    } catch (error) {
      console.error('Error fetching salary:', error.message); // Log the error for debugging
      return res.status(500).json({ success: false, error: "Failed to retrieve salary data" });
    }
  };
  

export {addSalary, getSalary}