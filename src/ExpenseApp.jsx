import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SummaryCards from "./Components/SummaryCards";
import ExpenseForm from "./Components/ExpenseForm";

const ExpenseApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(25000);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setExpenses(res.data);
  };

  const fetchIncome = async () => {
    const res = await axios.get("http://localhost:5000/api/income", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setIncome(res.data.amount);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchExpenses();
    fetchIncome();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e1b4b] text-white relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />

        <SummaryCards
          expenses={expenses}
          income={income}
          setIncome={setIncome}
          token={token}
        />

        <div className="mt-10">
          <ExpenseForm
            expenses={expenses}
            setExpenses={setExpenses}
            fetchExpenses={fetchExpenses}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseApp;