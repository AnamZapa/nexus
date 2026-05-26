import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { carrera: "Software", cantidad: 120 },
  { carrera: "Diseño", cantidad: 80 },
  { carrera: "Psicología", cantidad: 95 },
  { carrera: "Derecho", cantidad: 60 }
];

const ApplicantsBarChart = () => {
  return (
    <div className="chart-card">

      <h3>Postulaciones por Carrera</h3>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="carrera" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="cantidad" radius={[10,10,0,0]} />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ApplicantsBarChart;