import { useEffect, useState } from "react";
import { getTransactions } from "./firebase/transactions";
import TransactionForm from "./components/TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);

  async function loadData() {
    const data = await getTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <main>
      <h1>Money Dashboard</h1>

      <TransactionForm onTransactionAdded={loadData} />

      <section>
        <h2>Total Income: ৳{totalIncome}</h2>
        <h2>Total Expense: ৳{totalExpense}</h2>
        <h2>Balance: ৳{balance}</h2>
      </section>

      <h2>Transactions</h2>

      {transactions.map((item) => (
        <div key={item.id}>
          <p>
            {item.type} - {item.category} - ৳{item.amount}
          </p>
        </div>
      ))}
    </main>
  );
}

export default App;