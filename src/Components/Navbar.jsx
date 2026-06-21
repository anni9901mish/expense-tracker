import React from "react";
import { motion } from "framer-motion";
import { Wallet, LogOut } from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
      sticky top-0 z-50
      backdrop-blur-xl
      bg-white/10
      border-b border-white/20
      shadow-2xl
      "
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div
            className="
            p-3 rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            shadow-lg
            "
          >
            <Wallet size={28} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              ExpenseTracker
            </h1>

            <p className="text-xs text-gray-300">
              Smart Finance Dashboard
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <div
            className="
            px-4 py-2 rounded-2xl
            bg-white/10
            border border-white/20
            text-white
            "
          >
            👋 {user?.name || "User"}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="
            p-3 rounded-xl
            bg-red-500/20
            border border-red-400/30
            text-red-300
            "
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;