function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="table-card">
      <h3>Transaction History</h3>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Note</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>
                <span
                  className={
                    item.type === "income" ? "badge income" : "badge expense"
                  }
                >
                  {item.type}
                </span>
              </td>

              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>{item.note || "-"}</td>

              <td
                className={
                  item.type === "income" ? "amount income" : "amount expense"
                }
              >
                {item.type === "income" ? "+" : "-"}৳{item.amount}
              </td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => onEdit(item)}>
                    ✏️
                  </button>

                  <button className="delete-btn" onClick={() => onDelete(item.id)}>
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;