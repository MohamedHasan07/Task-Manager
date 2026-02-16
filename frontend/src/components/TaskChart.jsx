import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function TaskChart({ pending = 0, completed = 0 }) {

  const total = pending + completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  // percentage label inside pie
  const renderLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  if (total === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        No tasks available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">

      <h2 className="text-xl font-semibold mb-4">Task Progress</h2>

      <PieChart width={320} height={280}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  );
}
