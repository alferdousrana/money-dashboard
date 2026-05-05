function Topbar({ onLogout, userEmail }) {
  return (
    <header className="topbar">
      <div>
        <h3>Financial Dashboard</h3>
        <small>{userEmail}</small>
      </div>

      <div className="topbar-actions">
        <input type="text" placeholder="Search transactions..." />
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;