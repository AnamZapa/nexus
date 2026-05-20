import AdminLayout from "../layouts/AdminLayout";
import ApplicantsBarChart from "../components/Charts/ApplicantsBarChart";
import StatusPieChart from "../components/Charts/StatusPieChart";
import MonthlyLineChart from "../components/Charts/BarChart";
import { BarChart } from "recharts";

const Analytics = () => {
  return (
    <AdminLayout>

      <div className="analytics-page">

        <h1>Analítica Institucional</h1>

        <div className="charts-grid">

          <ApplicantsBarChart />

          <StatusPieChart />

        </div>

        <BarChart />

      </div>

    </AdminLayout>
  );
};

export default Analytics;