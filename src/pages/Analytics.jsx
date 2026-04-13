import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

export default function Analytics() {
  const { user } = useAuth();

  // Dummy Data
  const pieData = [
    { name: "Elective", value: 35 },
    { name: "Urgent", value: 31 },
    { name: "Emergency", value: 32 },
  ];

  const COLORS = ["#3b82f6", "#f87171", "#fbbf24"];

  const barData = [
    { age: "18-24", male: 111, female: 150 },
    { age: "25-34", male: 161, female: 179 },
    { age: "35-44", male: 236, female: 286 },
    { age: "50-64", male: 282, female: 308 },
    { age: "65-79", male: 255, female: 278 },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role={user.role} />

      {/* Main */}
      <div className="flex-1 bg-gray-100 p-6">

        <Navbar />

        {/* Header */}
        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="text-xl font-bold">
            HEALTH AND MEDICAL ANALYSIS
          </h1>

          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Patients Demographics
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">
              Key Trends
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">
              Treatment & Cost
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {[
            ["Admitted Patients", "2,785", "+2.8%"],
            ["Rooms / Bedspace", "398", "-3%"],
            ["Avg Billing", "$25,350", "-2.7%"],
            ["Doctors", "2,666", "+2.1%"],
            ["Avg LOS", "15.6", "+1.1%"],
            ["Avg Age", "51.95", "+1.2%"],
          ].map((card, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="text-xs text-gray-500">{card[0]}</p>
              <h2 className="text-xl font-bold">{card[1]}</h2>
              <p className={card[2].includes("+") ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                {card[2]}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-6">

          {/* Condition */}
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
              className="w-20 mx-auto mb-3"
            />
            <p className="text-sm text-gray-600">
              Hypertension increases risk of heart disease and stroke.
            </p>

            <div className="mt-3 text-sm">
              <p className="text-green-500">Normal: 0%</p>
              <p className="text-yellow-500">Inconclusive: 0%</p>
              <p className="text-red-500">Abnormal: 100%</p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Admission Type</h3>
            <PieChart width={250} height={200}>
              <Pie data={pieData} dataKey="value" outerRadius={70}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Age Group</h3>
            <BarChart width={300} height={200} data={barData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="female" fill="#9ca3af" />
              <Bar dataKey="male" fill="#3b82f6" />
            </BarChart>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* Medications */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Recommended Medications</h3>

            {[
              ["Aspirin", 90],
              ["Penicillin", 80],
              ["Paracetamol", 75],
              ["Ibuprofen", 70],
            ].map((med, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>{med[0]}</span>
                  <span>{med[1]}%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: `${med[1]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Hospital Data</h3>

            <table className="w-full text-xs">
              <thead className="text-gray-500">
                <tr>
                  <th>Hospital</th>
                  <th>Diabetes</th>
                  <th>Hypertension</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["City Hospital", 100, 200, 300],
                  ["Metro Hospital", 80, 150, 230],
                  ["Global Health", 60, 120, 180],
                ].map((row, i) => (
                  <tr key={i} className="border-t text-center">
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td className="font-bold">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}