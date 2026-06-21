import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  Receipt,
  IndianRupee,
} from "lucide-react";

const ExpenseForm = ({ expenses, setExpenses, fetchExpenses, token }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const inputStyle =
    "w-full bg-white/10 border border-cyan-500/20 text-white placeholder:text-gray-400 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all";

  const glassCard =
    "backdrop-blur-xl bg-slate-900/60 border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)] rounded-3xl";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/expenses/${editId}`,
        { title, amount: Number(amount), category },
        authHeader
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/expenses",
        { title, amount: Number(amount), category },
        authHeader
      );
    }

    await fetchExpenses();

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`, authHeader);
    await fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = filter === "All" || expense.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        whileHover={{ scale: 1.01 }}
        className={`${glassCard} p-6`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg">
            <PlusCircle className="text-white" size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {editId ? "Edit Expense" : "Add New Expense"}
            </h2>
            <p className="text-gray-400 text-sm">
              Track your spending with style
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
          />

          <input
            type="number"
            placeholder="Expense Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputStyle}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputStyle} bg-slate-900`}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className={`
              md:col-span-3
              bg-gradient-to-r
              ${editId ? "from-yellow-500 to-orange-500" : "from-cyan-500 to-purple-600"}
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-[0_0_25px_rgba(34,211,238,0.35)]
              transition-all
            `}
          >
            <span className="flex items-center justify-center gap-2">
              <PlusCircle size={20} />
              {editId ? "Update Expense" : "Add Expense"}
            </span>
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`${glassCard} mt-6 p-5`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
            />

            <input
              type="text"
              placeholder="Search expense..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputStyle} pl-12`}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${inputStyle} bg-slate-900`}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </motion.div>

      <div className="mt-8">
        <div className="flex items-center gap-3 mb-5">
          <Receipt className="text-cyan-400" size={26} />
          <h2 className="text-2xl font-bold text-white">Expenses</h2>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className={`${glassCard} p-6 text-gray-300 text-center`}>
            No expenses found.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, rotateX: 2 }}
                className={`${glassCard} p-5`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/20">
                        <Receipt size={20} className="text-cyan-300" />
                      </div>

                      <div>
                        <h3 className="font-bold text-xl text-white">
                          {expense.title}
                        </h3>

                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-400/20">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <p className="flex items-center justify-end text-2xl font-bold text-cyan-300">
                        <IndianRupee size={20} />
                        {expense.amount}
                      </p>

                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(expense)}
                      className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-400/20 text-yellow-300"
                    >
                      <Pencil size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(expense.id)}
                      className="p-3 rounded-xl bg-red-500/20 border border-red-400/20 text-red-300"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;