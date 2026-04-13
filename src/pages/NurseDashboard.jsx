// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import PatientList from "../components/PatientList";
// import PatientProfile from "../components/PatientProfile";

// export default function NurseDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   //  Load from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("patients")) || [];
//     setPatients(stored);
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar role="nurse" />

//       <div className="flex-1 p-6 bg-gray-100">
//         <Navbar />

//         <h2 className="text-xl font-bold mt-4">Nurse Dashboard</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/*  Patient List */}
//           <PatientList
//             patients={patients}
//             setPatients={setPatients}
//             onSelect={setSelectedPatient}
//           />

//           {/*  Patient Profile */}
//           {selectedPatient ? (
//             <PatientProfile patient={selectedPatient} />
//           ) : (
//             <div className="bg-white p-6 rounded shadow text-gray-500">
//               Select a patient to view profile
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }















// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import PatientList from "../components/PatientList";
// import PatientProfile from "../components/PatientProfile";

// export default function NurseDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   // Load patients
//   const loadPatients = () => {
//     try {
//       const stored = JSON.parse(localStorage.getItem("patients"));
//       setPatients(Array.isArray(stored) ? stored : []);
//     } catch {
//       setPatients([]);
//     }
//   };

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   // Refresh
//   const refreshPatients = () => {
//     loadPatients();
//   };

//   // Delete patient
//   const handleDeletePatient = (id) => {
//     const updated = patients.filter((p) => p.id !== id);
//     setPatients(updated);
//     localStorage.setItem("patients", JSON.stringify(updated));

//     if (selectedPatient?.id === id) {
//       setSelectedPatient(null);
//     }
//   };

//   // =======================
//   // 📊 STATUS COUNTERS
//   // =======================
//   const admittedCount = patients.filter(
//     (p) => p.status === "Admitted"
//   ).length;

//   const icuCount = patients.filter(
//     (p) => p.status === "ICU"
//   ).length;

//   const dischargedCount = patients.filter(
//     (p) => p.status === "Discharged"
//   ).length;

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar role="nurse" />

//       <div className="flex-1 p-6 bg-gray-100">
//         <Navbar />

//         <h2 className="text-xl font-bold mt-4">Nurse Dashboard</h2>

//         {/* =======================
//             📊 STATUS CARDS
//         ======================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//           <div className="bg-green-100 p-4 rounded shadow">
//             <h3 className="text-green-700 font-semibold">Admitted</h3>
//             <p className="text-2xl font-bold">{admittedCount}</p>
//           </div>

//           <div className="bg-red-100 p-4 rounded shadow">
//             <h3 className="text-red-700 font-semibold">ICU</h3>
//             <p className="text-2xl font-bold">{icuCount}</p>
//           </div>

//           <div className="bg-gray-200 p-4 rounded shadow">
//             <h3 className="text-gray-700 font-semibold">Discharged</h3>
//             <p className="text-2xl font-bold">{dischargedCount}</p>
//           </div>

//         </div>

//         {/* =======================
//             PATIENT SECTION
//         ======================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

//           <PatientList
//             patients={patients}
//             setPatients={setPatients}
//             onSelect={setSelectedPatient}
//             onRefresh={refreshPatients}
//             onDelete={handleDeletePatient}
//           />

//           {selectedPatient ? (
//             <PatientProfile patient={selectedPatient} />
//           ) : (
//             <div className="bg-white p-6 rounded shadow text-gray-500">
//               Select a patient to view profile
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function NurseDashboard() {
  const [patients, setPatients] = useState([]);

  // =========================
  // 🔄 LIVE SYNC FIX
  // =========================
  useEffect(() => {
    const loadPatients = () => {
      const stored = JSON.parse(localStorage.getItem("patients")) || [];
      setPatients(stored);
    };

    loadPatients();

    // auto refresh every 2 seconds
    const interval = setInterval(loadPatients, 2000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // 📊 GROUP DATA
  // =========================
  const admitted = patients.filter(
    (p) => p.status === "Admitted"
  ).length;

  const icu = patients.filter(
    (p) => p.status === "ICU"
  ).length;

  const discharged = patients.filter(
    (p) => p.status === "Discharged"
  ).length;

  // =========================
  // 📊 SAFE CHART DATA
  // =========================
  const safeData = [
    { name: "Admitted", value: admitted || 0 },
    { name: "ICU", value: icu || 0 },
    { name: "Discharged", value: discharged || 0 }
  ];

  const COLORS = ["#22c55e", "#ef4444", "#6b7280"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar role="nurse" />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Navbar />

        <h1 className="text-xl font-bold mt-4">
          📊 Hospital Dashboard
        </h1>

        {/* =========================
            📊 STATUS CARDS
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          <div className="bg-green-100 p-4 rounded shadow">
            🟢 Admitted
            <h2 className="text-2xl font-bold">{admitted}</h2>
          </div>

          <div className="bg-red-100 p-4 rounded shadow">
            🔴 ICU
            <h2 className="text-2xl font-bold">{icu}</h2>
          </div>

          <div className="bg-gray-200 p-4 rounded shadow">
            ⚪ Discharged
            <h2 className="text-2xl font-bold">{discharged}</h2>
          </div>

        </div>

        {/* =========================
            📈 PIE CHART
        ========================= */}
        <div className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-4">
            Patient Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={safeData}
                dataKey="value"
                outerRadius={120}
              >
                {safeData.map((_, index) => (
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
      </div>
    </div>
  );
}