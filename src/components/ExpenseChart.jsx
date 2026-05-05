import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter((item) => item.type === "expense");

  const chartData = expenses.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.name === item.category);

    if (existing) {
      existing.value += item.amount;
    } else {
      acc.push({
        name: item.category,
        value: item.amount,
      });
    }

    return acc;
  }, []);

  return (
    <div className="chart-card">
      <h3>Expense Overview</h3>

      {chartData.length === 0 ? (
        <p className="empty-text">No expense data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `৳${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;