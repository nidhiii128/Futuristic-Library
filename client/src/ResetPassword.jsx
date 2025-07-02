import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/reset-password", {
        token,
        newPassword,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mt-1 border rounded text-blue-70"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mt-1 border rounded text-blue-70"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
