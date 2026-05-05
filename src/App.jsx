import { useEffect, useState } from "react";
import { deleteTransaction, getTransactions } from "./firebase/transactions";
import TransactionForm from "./components/TransactionForm";
import DashboardCards from "./components/DashboardCards";
import Layout from "./components/Layout";
import Topbar from "./components/Topbar";
import TransactionTable from "./components/TransactionTable";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  async function loadData() {
    const data = await getTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = confirm("Delete this transaction?");

    if (!confirmDelete) return;

    await deleteTransaction(id);
    await loadData();
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
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
      {/* <Topbar /> */}

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