import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ICU() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const loadPatients = () => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];

    const fixed = stored.map((p) => ({
      ...p,
      status: (p.status || "Admitted").trim(),
    }));

    const filtered = fixed.filter(
      (p) => p.status.toLowerCase() === "icu"
    );

    setPatients(filtered);
  };

  useEffect(() => {
    loadPatients();
    const interval = setInterval(loadPatients, 2000);
    return () => clearInterval(interval);
  }, []);

  const filtered = patients.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="nurse" />

      <div className="flex-1 p-6">

        <Navbar />

        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold text-red-600">
            🔴 ICU PATIENTS
          </h1>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient..."
            className="px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="mt-8 bg-white shadow rounded-xl overflow-hidden">

          <div className="bg-red-600 text-white px-4 py-3 font-semibold">
            ICU RECORDS
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No ICU patients found
            </div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Disease</th>
                  <th className="p-3">Blood</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3">{p.age}</td>
                    <td className="p-3">{p.doctor}</td>
                    <td className="p-3">{p.disease}</td>
                    <td className="p-3">{p.blood}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </div>
    </div>
  );
}