function Topbar({ onLogout, userEmail, selectedMonth, onMonthChange }) {
  return (
    <header className="topbar">
      <div>
        <h3>Financial Dashboard</h3>
        <small>{userEmail}</small>
      </div>

      <div className="topbar-actions">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="month-selector"
          title="Filter by month"
        />
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;