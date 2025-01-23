import axios from "axios";
import { useNavigate } from "react-router-dom";


export const fetchDepartments = async () => {
    let departments
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success) {
        departments = response.data.departments
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "An error occurred");
    } else {
        alert("Network error");
    }
    }
    return departments
  }


  export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate()

    
    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-800" 

            onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                View
            </button>

            <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
                Edit
            </button>

            <button className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-800"
            >
                Salary
            </button>

            <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-800"
            >
                Leave
            </button>
        </div>
    )
}

export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.sno
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true
    },
    {
        name: 'Image',
        selector: (row) => row.profileIamge,
        sortable: true
    },
    {
        name: 'Department',
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: 'DOB',
        selector: (row) => row.dob,
        sortable: true
    },
    {
        name: 'Action',
        selector: (row) => row.action
    }
]