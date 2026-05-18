import "./ActivityLog.css";

function ActivityLog({ logs }) {
    // Get the last 3 logs
    const recentLogs = logs.slice(-1).reverse();

    const getLogIcon = (type) => {
        switch (type) {
            case "income_add":
                return "💰";
            case "expense_add":
                return "🛒";
            case "transaction_delete":
                return "🗑️";
            case "transaction_edit":
                return "✏️";
            case "login":
                return "🔑";
            default:
                return "📝";
        }
    };

    const getLogLabel = (type) => {
        switch (type) {
            case "income_add":
                return "Income Added";
            case "expense_add":
                return "Expense Added";
            case "transaction_delete":
                return "Transaction Deleted";
            case "transaction_edit":
                return "Transaction Edited";
            case "login":
                return "Login";
            default:
                return "Activity";
        }
    };

    const getLogTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    };

    return (
        <div className="activity-log-card">
            <h3>Recent Activity</h3>

            <div className="activity-list">
                {recentLogs.length === 0 ? (
                    <p className="empty-log">No recent activity</p>
                ) : (
                    recentLogs.map((log, index) => (
                        <div key={index} className="activity-item">
                            <div className="activity-icon">{getLogIcon(log.type)}</div>
                            <div className="activity-info">
                                <p className="activity-label">{getLogLabel(log.type)}</p>
                                <p className="activity-time">{getLogTime(log.timestamp)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ActivityLog;
