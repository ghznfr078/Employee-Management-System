import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
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
        setFilteredLeaves(data);
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

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

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
              onChange={filterByInput}
            />
            <div className="flex space-x-3">
              <button
                onClick={() => filterByButton("Pending")}
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-800"
              >
                Pending
              </button>
              <button
                onClick={() => filterByButton("Approved")}
                className="px-2 py-1 bg-green-600 text-white hover:bg-green-800"
              >
                Approved
              </button>
              <button
                onClick={() => filterByButton("Rejected")}
                className="px-2 py-1 bg-red-600 text-white hover:bg-red-800"
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-6">
            {filteredLeaves.length > 0 ? (
              <DataTable columns={columns} data={filteredLeaves} pagination />
            ) : (
              <div className="text-gray-500 text-center">No leaves found.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveTable;
