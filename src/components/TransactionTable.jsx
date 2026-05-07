function TransactionTable({ transactions, onEdit, onDelete }) {
   const handlePrint = () => {
    window.print();
  };

  return (
    <div className="table-card print-area">
      <div className="table-header">
        <h3>Transaction History</h3>

        <button className="print-btn no-print" onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Note</th>
            <th>Amount</th>
             <th className="no-print">Actions</th>
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

              <td className="no-print">
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => onEdit(item)}>✏️</button>
                  <button className="delete-btn" onClick={() => onDelete(item.id)}>🗑️</button>
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