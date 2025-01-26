import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user contains role information
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched!");
    } else {
      try {
        const response = await axios.put(
          "https://employee-management-system-nine-nu.vercel.app/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          // Conditional navigation based on user role
          if (user.role === "admin") {
            navigate("/admin-dashboard");
          } else if (user.role === "employee") {
            navigate("/employee-dashboard");
          }
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500"> {error} </p>
      <form onSubmit={handleSubmit}>
        {/* {Old Password} */}
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}
            placeholder="Insert Old Password"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            placeholder="Insert New Password"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Insert Confirm Password"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
