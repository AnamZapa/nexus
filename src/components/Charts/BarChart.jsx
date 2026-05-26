import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { carrera: "Software", cantidad: 120 },
  { carrera: "Diseño", cantidad: 80 },
  { carrera: "Derecho", cantidad: 60 }
];

const CustomBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={data}>
        <XAxis dataKey="carrera" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cantidad" />
      </BarChart>

    </ResponsiveContainer>
  );
};

export default CustomBarChart;