import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    alert("Registration successful. Please login.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-3 w-full mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;