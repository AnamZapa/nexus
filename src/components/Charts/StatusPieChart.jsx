import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const data = [
  { name: "Aprobados", value: 700 },
  { name: "Pendientes", value: 320 },
  { name: "Rechazados", value: 230 }
];

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444"
];

const StatusPieChart = () => {
  return (
    <div className="chart-card">
      <h3>Estado de Solicitudes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;