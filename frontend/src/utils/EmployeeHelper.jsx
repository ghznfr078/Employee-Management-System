import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.error || "An error occurred");
    } else {
      alert("Network error");
    }
  }
  return departments;
};

// employees for salary form

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.error || "An error occurred");
    } else {
      alert("Network error");
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-800"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-800"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-800"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
      >
        Salary
      </button>

      <button
        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-800"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};

export const columns = [
  {
    name: "Sr No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];
