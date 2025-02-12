import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Steps: 1-Enter Phone, 2-Enter OTP, 3-Reset Password
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  const handlePhoneSubmit = async () => {
    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setGeneratedOtp(data.otp); // Store OTP for comparison
      alert(`Your OTP: ${data.otp}`); // Show OTP in alert
      setStep(2);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOtpSubmit = () => {
    if (otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }
    setStep(3);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Password successfully reset! Redirecting to login...");
      navigate("/login"); // Redirect to login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-orange-700 to-yellow-400">
      <div className="bg-gray-900 border-4 border-white p-6 shadow-lg shadow-black rounded-md w-96 text-orange-500">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <p className="text-gray-600 text-center text-white">Enter your registered phone number.</p>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 mt-4 w-full bg-gray-950 text-green-500 font-bold"
            />
            <button onClick={handlePhoneSubmit} className="mt-4 px-6 py-2 bg-orange-500 hover:bg-black text-white w-full">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-600 text-center">Enter the OTP sent to your phone.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 mt-4 w-full"
            />
            <button onClick={handleOtpSubmit} className="mt-4 px-6 py-2 bg-green-600 text-white w-full">
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-gray-600 text-center">Enter your new password.</p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 mt-4 w-full"
            />
            <button onClick={handlePasswordSubmit} className="mt-4 px-6 py-2 bg-orange-600 text-white w-full">
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
