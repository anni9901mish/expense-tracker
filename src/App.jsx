import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(25000);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const savedIncome = JSON.parse(localStorage.getItem("income"));

    if (savedExpenses) setExpenses(savedExpenses);
    if (savedIncome) setIncome(savedIncome);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));
  }, [expenses, income]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SummaryCards expenses={expenses} income={income} setIncome={setIncome} />
      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default App;