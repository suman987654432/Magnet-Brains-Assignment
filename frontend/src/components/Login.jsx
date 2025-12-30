import { useState } from "react";

const Login = ({ onClose, onLoginSuccess }) => {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!input.email || !input.password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      // Debug: log status and response
      console.log("Login response status:", res.status);
      console.log("Login response data:", data);
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
      // Store user info in localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userEmail", input.email);
      alert(data.message);
      if (onLoginSuccess) onLoginSuccess(); // <-- call after successful login
      onClose();
    } catch (err) {
      // Debug: log error
      console.error("Login error:", err);
      alert("Error logging in");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={input.email}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={input.password}
              onChange={handleInput}
              required
            />
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
