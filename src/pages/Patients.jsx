import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "./Appointments";

export default function Patients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    doctor: "",
    disease: "",
    blood: "",
    address: "",
    status: "Admitted", // ✅ DEFAULT STATUS FIX
  });

  // LOAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];

    // FIX OLD DATA (IMPORTANT)
    const fixed = data.map((p) => ({
      ...p,
      status: p.status || "Admitted",
    }));

    setPatients(fixed);
    setSelectedPatient(fixed[0] || null);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // SEARCH
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD
  const handleAddPatient = () => {
    if (!newPatient.name) return;

    const updated = [...patients, newPatient];
    setPatients(updated);
    setSelectedPatient(newPatient);

    setNewPatient({
      name: "",
      age: "",
      doctor: "",
      disease: "",
      blood: "",
      address: "",
      status: "Admitted",
    });
  };

  // EDIT
  const startEdit = (patient) => setEditData(patient);

  const updateEditField = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const saveEdit = () => {
    const updated = patients.map((p) =>
      p.name === editData.name ? editData : p
    );

    setPatients(updated);
    setSelectedPatient(editData);
    setEditData(null);
  };

  // DELETE
  const handleDelete = () => {
    const updated = patients.filter(
      (p) => p.name !== selectedPatient.name
    );

    setPatients(updated);
    setSelectedPatient(updated[0] || null);
    setEditData(null);
    setShowBookingModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-xl font-bold mb-6">🏥 Hospital</h1>

        <div onClick={() => navigate("/admin")} className="cursor-pointer mb-3">
          📊 Dashboard
        </div>

        <div className="bg-blue-700 p-2 rounded">
          👨‍⚕️ Patients
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Patients</h2>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {/* ADD PATIENT */}
        <div className="bg-white p-4 rounded shadow mb-5 grid grid-cols-3 gap-3">

          {Object.keys(newPatient).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={newPatient[key]}
              onChange={(e) =>
                setNewPatient({
                  ...newPatient,
                  [key]: e.target.value,
                })
              }
              className="border p-2 rounded"
            />
          ))}

          {/* STATUS DROPDOWN (IMPORTANT) */}
          <select
            value={newPatient.status}
            onChange={(e) =>
              setNewPatient({ ...newPatient, status: e.target.value })
            }
            className="border p-2 rounded col-span-3"
          >
            <option value="Admitted">Admitted</option>
            <option value="ICU">ICU</option>
            <option value="Discharged">Discharged</option>
          </select>

          <button
            onClick={handleAddPatient}
            className="bg-blue-600 text-white col-span-3 py-2 rounded"
          >
            Add Patient
          </button>

        </div>

        {/* SEARCH */}
        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-5 gap-6">

          {/* LIST */}
          <div className="bg-white p-3 rounded shadow">
            {filteredPatients.map((p) => (
              <div
                key={p.name}
                onClick={() => {
                  setSelectedPatient(p);
                  setEditData(null);
                }}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
              >
                {p.name} <br />
                <span className="text-xs text-gray-500">
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          {/* DETAILS */}
          <div className="col-span-4">

            {selectedPatient && (
              <div className="bg-white p-5 rounded shadow">

                <h2 className="text-xl font-bold mb-2">
                  {selectedPatient.name}
                </h2>

                <p>Status: {selectedPatient.status}</p>

                <p>Doctor: {selectedPatient.doctor}</p>
                <p>Disease: {selectedPatient.disease}</p>
                <p>Blood: {selectedPatient.blood}</p>
                <p>Address: {selectedPatient.address}</p>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showBookingModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-4 w-[900px] rounded">
            <button
              onClick={() => setShowBookingModal(false)}
              className="bg-red-500 text-white px-2 py-1 float-right"
            >
              ✕
            </button>

            <Appointments
              selectedPatient={selectedPatient}
              isEmbedded={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}