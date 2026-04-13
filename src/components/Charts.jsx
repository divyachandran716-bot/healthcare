import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Charts() {
  const pieData = {
    labels: ["Recovered", "Critical", "Stable"],
    datasets: [
      {
        data: [420, 30, 50],
        backgroundColor: ["#22c55e", "#ef4444", "#3b82f6"],
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Patients",
        data: [50, 80, 60, 100],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Patient Status</h3>
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Monthly Patients</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}