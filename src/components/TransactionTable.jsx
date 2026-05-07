import React from "react";
import "./TransactionTable.css";

function TransactionTable({ transactions, onEdit, onDelete }) {

  const handlePrint = () => {
    const printContents =
      document.getElementById("transaction-print").innerHTML;

    const printWindow = window.open("", "", "width=900,height=650");

    printWindow.document.write(`
      <html>
        <head>
          <title>Transaction Report</title>

          <style>
            body{
              font-family: Arial, sans-serif;
              padding:20px;
              color:#111827;
            }

            h2{
              text-align:center;
              margin-bottom:20px;
            }

            table{
              width:100%;
              border-collapse:collapse;
            }

            th, td{
              border:1px solid #d1d5db;
              padding:10px;
              text-align:left;
              font-size:14px;
            }

            th{
              background:#f3f4f6;
            }

            .income-text{
              color:green;
              font-weight:bold;
            }

            .expense-text{
              color:red;
              font-weight:bold;
            }

            @page{
              size:A4;
              margin:15mm;
            }
          </style>
        </head>

        <body>
          <h2>Transaction History</h2>

          ${printContents}

        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="table-card">

      {/* Header */}
      <div className="table-header">
        <h3>Transaction History</h3>

        <button className="print-btn" onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      {/* Printable Area */}
      <div id="transaction-print">

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
                      item.type === "income"
                        ? "badge income"
                        : "badge expense"
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
                    item.type === "income"
                      ? "amount income-text"
                      : "amount expense-text"
                  }
                >
                  {item.type === "income" ? "+" : "-"}৳{item.amount}
                </td>

                <td className="no-print">
                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => onEdit(item)}
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(item.id)}
                    >
                      🗑️
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default TransactionTable;