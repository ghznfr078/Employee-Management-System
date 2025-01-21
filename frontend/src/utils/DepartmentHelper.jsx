import { useNavigate } from "react-router-dom"


 export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.sno
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name
    },
    {
        name: 'Action',
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({_id}) => {
    const navigate = useNavigate()
    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-800" 
            onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-800">Delete</button>
        </div>
    )
}