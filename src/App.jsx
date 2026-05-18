import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "./firebase/auth";
import { deleteTransaction, getTransactions } from "./firebase/transactions";
import TransactionForm from "./components/TransactionForm";
import DashboardCards from "./components/DashboardCards";
import Layout from "./components/Layout";
import Topbar from "./components/Topbar";
import TransactionTable from "./components/TransactionTable";
import ExpenseChart from "./components/ExpenseChart";
import Calendar from "./components/Calendar";
import ActivityLog from "./components/ActivityLog";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activityLogs, setActivityLogs] = useState(() => {
    const stored = localStorage.getItem("activityLogs");
    return stored ? JSON.parse(stored) : [];
  });

  // Initialize with current month
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addActivityLog = useCallback((type, description = "") => {
    const newLog = {
      type,
      description,
      timestamp: new Date().toISOString(),
    };

    setActivityLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      localStorage.setItem("activityLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  }, []);

  const loadData = useCallback(async () => {
    const data = await getTransactions();
    setTransactions(data);
  }, []);

  useEffect(() => {
    if (user) {
      // Load transaction data
      loadData();
    }
  }, [user, loadData]);

  async function handleDelete(id) {
    const confirmDelete = confirm("Delete this transaction?");
    if (!confirmDelete) return;

    await deleteTransaction(id);
    addActivityLog("transaction_delete");
    await loadData();
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
  }

  if (authLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (!user) {
    return <Login />;
  }

  // Filter transactions by selected month
  const filteredTransactions = selectedMonth
    ? transactions.filter((item) => item.month === selectedMonth)
    : transactions;

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Layout>
      <Topbar onLogout={logout} userEmail={user.email} selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      <section className="hero">
        <div>
          <p className="eyebrow">Personal Finance</p>
          <h1>Money Dashboard</h1>
          <p>Track your income, expenses, balance, and monthly spending.</p>
        </div>
      </section>

      <DashboardCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <section className="content-grid">
        <div className="form-card">
          <h3>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h3>

          <TransactionForm
            onTransactionAdded={loadData}
            editingTransaction={editingTransaction}
            onCancelEdit={handleCancelEdit}
            onLogActivity={addActivityLog}
          />
        </div>

        <div className="right-sidebar">
          <ExpenseChart transactions={filteredTransactions} />
          <Calendar />
          <ActivityLog logs={activityLogs} />
        </div>
      </section>

      <section className="table-section">
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={(transaction) => setEditingTransaction(transaction)}
          onDelete={handleDelete}
        />
      </section>
    </Layout>
  );
}

export default App;