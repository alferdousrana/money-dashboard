import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "./firebase/auth";
import { deleteTransaction, getTransactions } from "./firebase/transactions";
import TransactionForm from "./components/TransactionForm";
import DashboardCards from "./components/DashboardCards";
import Layout from "./components/Layout";
import Topbar from "./components/Topbar";
import TransactionTable from "./components/TransactionTable";
import ExpenseChart from "./components/ExpenseChart";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function loadData() {
    const data = await getTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    if (user) {
      loadData();
      // Set default month to current month
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7);
      setSelectedMonth(currentMonth);
    }
  }, [user]);

  async function handleDelete(id) {
    const confirmDelete = confirm("Delete this transaction?");
    if (!confirmDelete) return;

    await deleteTransaction(id);
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
          />
        </div>

        <ExpenseChart transactions={filteredTransactions} />
      </section>

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={(transaction) => setEditingTransaction(transaction)}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;