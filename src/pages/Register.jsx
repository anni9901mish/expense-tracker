import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, Wallet } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      window.location.href = "/login";
    } catch (err) {
      setError("User already exists or registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e1b4b] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-slate-900/60 border border-cyan-500/20 shadow-[0_0_45px_rgba(34,211,238,0.18)] rounded-3xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg mb-4">
            <Wallet className="text-white" size={36} />
          </div>

          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mt-2">
            Start tracking your money smartly
          </p>
        </div>

        {error && (
          <p className="mb-4 text-center text-red-300 bg-red-500/20 border border-red-400/20 p-3 rounded-2xl">
            {error}
          </p>
        )}

        <div className="relative mb-4">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" size={20} />
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white/10 border border-cyan-500/20 text-white placeholder:text-gray-400 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-cyan-400/60"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="relative mb-4">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-cyan-500/20 text-white placeholder:text-gray-400 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-cyan-400/60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 border border-cyan-500/20 text-white placeholder:text-gray-400 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        >
          <span className="flex items-center justify-center gap-2">
            <UserPlus size={20} />
            Register
          </span>
        </motion.button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-300 font-semibold">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;