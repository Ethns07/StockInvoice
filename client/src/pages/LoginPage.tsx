import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6"> Login </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1" > Username </label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter username" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" > Password </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password" />
          </div>

          {/* Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" > Sign In </button>
        </form>
        <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/register" className="text-blue-600">Create an account</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
