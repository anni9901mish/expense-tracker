import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Receipt,
  AlertTriangle,
} from "lucide-react";

const SummaryCards = ({ expenses, income, setIncome, token }) => {
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const balance = Number(income || 0) - totalExpense;
  const isNegative = balance < 0;

  const handleIncomeChange = async (e) => {
    const value = Number(e.target.value);
    setIncome(value);

    try {
      await axios.post(
        "http://localhost:5000/api/income",
        { amount: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Income save error:", error);
    }
  };

  const cardStyle = `
    backdrop-blur-xl
    bg-white/10
    border border-white/20
    shadow-[0_8px_32px_rgba(31,38,135,0.37)]
    rounded-3xl
    p-6
  `;

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      {isNegative && (
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-6 bg-red-500/20 border border-red-400/30 text-red-300 p-4 rounded-2xl text-center font-bold backdrop-blur-xl"
        >
          <AlertTriangle className="inline mr-2" />
          Warning! Expenses are higher than income
        </motion.div>
      )}

      <motion.div whileHover={{ scale: 1.02 }} className={`${cardStyle} mb-8`}>
        <label className="block text-gray-300 mb-3 font-semibold">
          Monthly Income
        </label>

        <input
          type="number"
          value={income}
          onChange={handleIncomeChange}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white outline-none"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className={cardStyle}>
          <div className="flex items-center justify-between">
            <Wallet size={40} className="text-cyan-400" />
            <span className="text-cyan-300 text-sm">Balance</span>
          </div>

          <h2 className="text-gray-300 mt-4">Total Balance</h2>

          <p className={`text-4xl font-bold mt-2 ${isNegative ? "text-red-400" : "text-white"}`}>
            ₹{balance}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className={cardStyle}>
          <div className="flex items-center justify-between">
            <TrendingUp size={40} className="text-green-400" />
            <span className="text-green-300 text-sm">Income</span>
          </div>

          <h2 className="text-gray-300 mt-4">Monthly Income</h2>

          <p className="text-4xl font-bold text-green-400 mt-2">
            ₹{income}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className={cardStyle}>
          <div className="flex items-center justify-between">
            <Receipt size={40} className="text-red-400" />
            <span className="text-red-300 text-sm">Expense</span>
          </div>

          <h2 className="text-gray-300 mt-4">Total Expenses</h2>

          <p className="text-4xl font-bold text-red-400 mt-2">
            ₹{totalExpense}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SummaryCards;