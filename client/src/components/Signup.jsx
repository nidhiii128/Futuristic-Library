import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSendOtp = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setOtpSent(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      alert("Failed to send OTP");
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, otp: enteredOtp }),
      });

      const data = await res.json();
      if (res.ok && data.message === "OTP verified successfully") {
        alert("OTP Verified!");
        setOtpVerified(true);
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("OTP verification failed");
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();
      if (res.ok && data.message === "User created successfully") {
        alert("Signup Successful!");
        navigate("/login");
      } else {
        alert(data.message || "Unexpected response. Try again.");
      }
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Create Account</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mt-1 border rounded text-blue-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={otpSent}
          />
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Send OTP
            </button>
          )}
        </div>

        {otpSent && !otpVerified && (
          <div>
            <label className="text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP"
              className="w-full p-3 mt-1 border rounded text-blue-700"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </div>
        )}

        {otpVerified && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 mt-1 border rounded text-blue-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-3 mt-1 border rounded text-blue-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
