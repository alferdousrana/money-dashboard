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

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Layout>
      <Topbar onLogout={logout} userEmail={user.email} />

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

        <ExpenseChart transactions={transactions} />
      </section>

      <TransactionTable
        transactions={transactions}
        onEdit={setEditingTransaction}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;