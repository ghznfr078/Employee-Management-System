import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred while fetching data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Employee ID"
              className="px-4 py-0.5 border"
            />
            <div className="flex space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-800">
                Pending
              </button>
              <button className="px-2 py-1 bg-green-600 text-white hover:bg-green-800">
                Approved
              </button>
              <button className="px-2 py-1 bg-red-600 text-white hover:bg-red-800">
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={leaves} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveTable;
