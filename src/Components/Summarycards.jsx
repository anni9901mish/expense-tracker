import React from "react";

const SummaryCards = ({ expenses, income, setIncome }) => {
  const totalExpense = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  const balance = income - totalExpense;
  const isNegative = balance < 0;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {isNegative && (
        <div className="mb-6 bg-red-600 text-white p-4 rounded-xl shadow-lg text-center font-bold animate-bounce">
          🚨 Warning! Your expenses are higher than your income.
        </div>
      )}

      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <label className="block text-gray-600 mb-2 font-semibold">
          Monthly Income
        </label>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
            isNegative
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`shadow-lg rounded-2xl p-6 transition-all duration-300 ${
            isNegative
              ? "bg-red-200 border-2 border-red-600 animate-pulse"
              : "bg-white"
          }`}
        >
          <h2
            className={`text-lg ${
              isNegative ? "text-red-700" : "text-gray-500"
            }`}
          >
            Total Balance
          </h2>

          <p
            className={`text-3xl font-bold mt-2 ${
              isNegative ? "text-red-800" : "text-black"
            }`}
          >
            ₹{balance}
          </p>

          {isNegative && (
            <p className="mt-3 text-red-700 font-semibold">
              ⚠️ Budget Exceeded!
            </p>
          )}
        </div>

        <div className="bg-green-100 shadow-lg rounded-2xl p-6">
          <h2 className="text-green-700 text-lg">Income</h2>
          <p className="text-3xl font-bold mt-2 text-green-800">
            ₹{income}
          </p>
        </div>

        <div
          className={`shadow-lg rounded-2xl p-6 ${
            isNegative
              ? "bg-red-300 border-2 border-red-600"
              : "bg-red-100"
          }`}
        >
          <h2 className="text-red-700 text-lg">Expenses</h2>
          <p className="text-3xl font-bold mt-2 text-red-800">
            ₹{totalExpense}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;