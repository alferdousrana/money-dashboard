function Topbar() {
  return (
    <header className="topbar">
      <h3>Financial Dashboard</h3>

      <div className="topbar-actions">
        <input type="text" placeholder="Search transactions..." />
        <span>🔔</span>
        <span>⚙️</span>
      </div>
    </header>
  );
}

export default Topbar;