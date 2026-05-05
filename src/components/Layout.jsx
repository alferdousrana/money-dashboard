function Layout({ children }) {
  return (
    <div className="app-layout">
      {/* <aside className="sidebar">
        <div className="brand">
          <h2>FinFlow</h2>
          <p>Money Management</p>
        </div>

        <nav className="nav-menu">
          <a className="active">▦ Dashboard</a>
          <a>▤ Transactions</a>
          <a>↥ Import</a>
        </nav>

        <div className="profile-card">
          <div className="avatar">A</div>
          <div>
            <strong>Al Fardous</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </aside> */}

      <div className="main-area">{children}</div>
    </div>
  );
}

export default Layout;