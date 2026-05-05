import { useState } from "react";
import { addTransaction } from "../firebase/transactions";

function TransactionForm({ onTransactionAdded }) {
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await addTransaction(form);
    onTransactionAdded();

    alert("Transaction added!");

    setForm({
      type: "income",
      category: "",
      amount: "",
      date: "",
      note: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
      />

      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note"
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;