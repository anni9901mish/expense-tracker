import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import SummaryCards from "./Components/SummaryCards";
import ExpenseForm from "./Components/ExpenseForm";

const ExpenseApp = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <SummaryCards expenses={expenses} />

      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default ExpenseApp;