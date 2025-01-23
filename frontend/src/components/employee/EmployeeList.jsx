import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success) {
          let sno = 1
            const data = await response.data.employees.map((emp) => (
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob: new Date(emp.dob).toDateString(),
                profileImage: emp.userId.profileImage,
                action: (<EmployeeButtons Id={emp._id} />)
              }
            ))
            setEmployees(data)
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || "An error occurred");
      } else {
          alert("Network error");
      }
      } finally {
        setEmpLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  return (
    <>
    
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text"
        placeholder='Search By Dep Name'
        
        className='px-4 py-0.5 border'/>
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Employee</Link>
      </div>
      <div>
        <DataTable columns={columns} data />
      </div>
    </div>
     </>
  )
}

export default EmployeeList
