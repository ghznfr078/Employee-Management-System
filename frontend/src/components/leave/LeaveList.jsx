import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]); // Default as empty array
  const [error, setError] = useState(null); // For error handling
  let sno = 1;
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/leave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves || []); // Ensure fallback to an empty array
      } else {
        throw new Error(response.data.message || "Failed to fetch leaves");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      setLeaves([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          className="px-4 py-2 border rounded"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/leaves/add-leave"
            className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700"
          >
            Add New Leave
          </Link>
        )}
      </div>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : leaves.length === 0 ? (
        <div className="text-gray-500 text-center">No leaves found.</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">Sr No</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason || "N/A"}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveList;
