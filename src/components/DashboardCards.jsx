function DashboardCards({ totalIncome, totalExpense, balance }) {
  return (
    <section className="cards">
      <div className="card balance-card">
        <p>Balance</p>
        <h2>৳{balance}</h2>
      </div>
      
      <div className="card income-card">
        <p>Total Income</p>
        <h2>৳{totalIncome}</h2>
      </div>

      <div className="card expense-card">
        <p>Total Expense</p>
        <h2>৳{totalExpense}</h2>
      </div>

      
    </section>
  );
}

export default DashboardCards;