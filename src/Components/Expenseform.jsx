import React, { useState } from "react";

const ExpenseForm = ({ expenses, setExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editId
          ? {
              ...expense,
              title,
              amount: Number(amount),
              category,
            }
          : expense
      );

      setExpenses(updatedExpenses);
      setEditId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date: new Date().toLocaleDateString(),
      };

      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
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

    const matchesCategory =
      filter === "All" || expense.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 pb-10">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editId ? "Edit Expense" : "Add New Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Expense Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className={`${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-3 rounded-lg transition-all`}
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>

      <div className="mt-6 bg-white p-5 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-3"
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
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Expenses</h2>

        {filteredExpenses.length === 0 ? (
          <p className="text-gray-500 bg-white p-4 rounded-xl shadow">
            No expenses found.
          </p>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white p-4 rounded-xl shadow-md mb-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {expense.title}
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-2 font-bold text-green-700">
                ₹{expense.amount}
              </p>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <p>{expense.category}</p>
                <p>{expense.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;