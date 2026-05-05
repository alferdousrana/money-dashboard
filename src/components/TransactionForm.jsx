import { useEffect, useState } from "react";
import { addTransaction, updateTransaction } from "../firebase/transactions";

function TransactionForm({
  onTransactionAdded,
  editingTransaction,
  onCancelEdit,
}) {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type || "expense",
        category: editingTransaction.category || "",
        amount: editingTransaction.amount || "",
        date: editingTransaction.date || "",
        note: editingTransaction.note || "",
      });
    }
  }, [editingTransaction]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm({
      type: "expense",
      category: "",
      amount: "",
      date: "",
      note: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.category || !form.amount || !form.date) {
      alert("Please fill required fields");
      return;
    }

    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, form);
      alert("Transaction updated!");
      onCancelEdit();
    } else {
      await addTransaction(form);
      alert("Transaction added!");
    }

    onTransactionAdded();
    resetForm();
  }

  return (
    <form className="txn-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-row">
        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g. Food, Salary"
        />
      </div>

      <div className="form-row">
        <label>Amount (৳)</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div className="form-row">
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Note</label>
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Optional"
        />
      </div>

      <div className="form-actions">
        {editingTransaction && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              resetForm();
              onCancelEdit();
            }}
          >
            Cancel
          </button>
        )}

        <button className="submit-btn" type="submit">
          {editingTransaction ? "Update Transaction" : "+ Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
