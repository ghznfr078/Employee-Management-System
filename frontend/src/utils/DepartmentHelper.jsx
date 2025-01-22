import { useNavigate } from "react-router-dom"
import axios from "axios"

 export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.sno
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: 'Action',
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({_id, onDepartDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?")
        if(confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                  }
                })
                if(response.data.success) {
                    onDepartDelete(id)
                } 
              } catch (error) {
                if (error.response) {
                  alert(error.response.data.error || "An error occurred");
              } else {
                  alert("Network error");
              }
              }
        }
    }
    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-800" 
            onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-800"
            onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}