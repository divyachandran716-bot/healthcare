// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function Patients() {
//   const navigate = useNavigate();

//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [search, setSearch] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const [historyNote, setHistoryNote] = useState("");
//   const [historyReport, setHistoryReport] = useState("");

//   const [prescriptionForm, setPrescriptionForm] = useState({
//     medicine: "",
//     dosage: "",
//     days: "",
//   });

//   const [newPatient, setNewPatient] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     doctor: "",
//     blood: "",
//     address: "",
//     disease: "",
//     photo: "",
//     history: [],
//     prescriptions: [],
//   });

//   // 🔄 Load Data
//   useEffect(() => {
//     const storedPatients = JSON.parse(localStorage.getItem("patients"));
//     const storedAppointments = JSON.parse(localStorage.getItem("appointments"));

//     if (storedPatients) setPatients(storedPatients);
//     if (storedAppointments) setAppointments(storedAppointments);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("patients", JSON.stringify(patients));
//   }, [patients]);

//   const selectedPatient = patients[selectedIndex] || {};

//   const filteredPatients = patients.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // 🔔 Notifications
//   const addNotification = (msg) => {
//     setNotifications([...notifications, msg]);
//     setTimeout(() => {
//       setNotifications((prev) => prev.slice(1));
//     }, 3000);
//   };

//   // ➕ Add Patient
//   const handleAddPatient = () => {
//     if (!newPatient.name) return;

//     setPatients([...patients, newPatient]);
//     addNotification("Patient Added ✅");

//     setNewPatient({
//       name: "",
//       age: "",
//       gender: "",
//       doctor: "",
//       blood: "",
//       address: "",
//       disease: "",
//       photo: "",
//       history: [],
//       prescriptions: [],
//     });
//   };

//   // 📸 Photo Upload
//   const handlePhoto = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setNewPatient({ ...newPatient, photo: reader.result });
//     };

//     if (file) reader.readAsDataURL(file);
//   };

//   // ✏️ Edit Change
//   const handleChange = (field, value) => {
//     const updated = [...patients];
//     updated[selectedIndex][field] = value;
//     setPatients(updated);
//   };

//   // ❌ Delete
//   const handleDelete = () => {
//     const updated = patients.filter((_, i) => i !== selectedIndex);
//     setPatients(updated);
//     setSelectedIndex(0);
//     addNotification("Deleted ❌");
//   };

//   // 📊 Add History
//   const addHistory = () => {
//     if (!historyNote) return;

//     const updated = [...patients];
//     updated[selectedIndex].history.push({
//       date: new Date().toLocaleDateString(),
//       notes: historyNote,
//       report: historyReport,
//     });

//     setPatients(updated);
//     setHistoryNote("");
//     setHistoryReport("");
//   };

//   // 💊 Add Prescription
//   const addPrescription = () => {
//     const updated = [...patients];
//     updated[selectedIndex].prescriptions.push(prescriptionForm);

//     setPatients(updated);
//     setPrescriptionForm({ medicine: "", dosage: "", days: "" });
//   };

//   const patientAppointments = appointments.filter(
//     (a) => a.patientName === selectedPatient.name
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* 🔔 Notifications */}
//       <div className="fixed top-5 right-5 space-y-2 z-50">
//         {notifications.map((n, i) => (
//           <div key={i} className="bg-green-500 text-white px-4 py-2 rounded shadow">
//             {n}
//           </div>
//         ))}
//       </div>

//       {/* SIDEBAR */}
//       <div className="w-64 bg-teal-700 text-white p-6 flex flex-col justify-between">
//         <div>
//           <h1 className="text-xl font-bold mb-8">🏥 Hospital</h1>

//           <div className="space-y-4">
//             <div onClick={() => navigate("/admin")} className="cursor-pointer">📊 Dashboard</div>
//             <div className="bg-teal-600 p-2 rounded">👨‍⚕️ Patients</div>
//             <div onClick={() => navigate("/appointments")} className="cursor-pointer">📅 Appointments</div>
//           </div>
//         </div>

//         <button onClick={() => navigate(-1)} className="bg-white text-teal-700 py-2 rounded">
//           ← Back
//         </button>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-6">

//         <h2 className="text-2xl font-bold mb-4">Patients</h2>

//         {/* ➕ ADD */}
//         <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-2">
//           <input placeholder="Name" value={newPatient.name}
//             onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="border p-2" />

//           <input placeholder="Age" value={newPatient.age}
//             onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} className="border p-2" />

//           <input placeholder="Doctor" value={newPatient.doctor}
//             onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })} className="border p-2" />

//           <input placeholder="Disease" value={newPatient.disease}
//             onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })} className="border p-2" />

//           <input type="file" onChange={handlePhoto} />

//           <button onClick={handleAddPatient} className="bg-teal-600 text-white p-2 col-span-4">
//             Add Patient
//           </button>
//         </div>

//         {/* SEARCH */}
//         <input
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="mb-4 border p-2 w-full"
//         />

//         <div className="grid grid-cols-4 gap-6">

//           {/* LIST */}
//           <div className="bg-white p-4 rounded shadow">
//             {filteredPatients.map((p, i) => (
//               <div key={i}
//                 onClick={() => setSelectedIndex(patients.findIndex((x) => x === p))}
//                 className="cursor-pointer p-2 hover:bg-gray-100">
//                 {p.name}
//               </div>
//             ))}
//           </div>

//           {/* DETAILS */}
//           <div className="col-span-3 bg-white p-6 rounded shadow">

//             {selectedPatient.photo && (
//               <img src={selectedPatient.photo} className="w-24 h-24 rounded-full mb-3" />
//             )}

//             <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
//             <p>{selectedPatient.doctor}</p>
//             <p>{selectedPatient.disease}</p>

//             {/* HISTORY */}
//             <h4 className="mt-4 font-bold">History</h4>
//             {selectedPatient.history?.map((h, i) => (
//               <div key={i}>{h.notes}</div>
//             ))}

//             <input placeholder="Notes" value={historyNote}
//               onChange={(e) => setHistoryNote(e.target.value)} className="border p-1 mt-2" />
//             <input placeholder="Report" value={historyReport}
//               onChange={(e) => setHistoryReport(e.target.value)} className="border p-1" />
//             <button onClick={addHistory} className="bg-blue-500 text-white p-1 mt-1">Add</button>

//             {/* PRESCRIPTION */}
//             <h4 className="mt-4 font-bold">Prescriptions</h4>
//             {selectedPatient.prescriptions?.map((p, i) => (
//               <div key={i}>{p.medicine}</div>
//             ))}

//             <input placeholder="Medicine"
//               onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medicine: e.target.value })}
//               className="border p-1 mt-2" />
//             <button onClick={addPrescription} className="bg-green-500 text-white p-1 mt-1">Add</button>

//             {/* APPOINTMENTS */}
//             <h4 className="mt-4 font-bold">Appointments</h4>
//             {patientAppointments.map((a, i) => (
//               <div key={i}>{a.date} - {a.time}</div>
//             ))}

//             <div className="mt-4 flex gap-2">
//               <button onClick={() => setEditMode(!editMode)} className="bg-blue-500 text-white px-3 py-1">Edit</button>
//               <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1">Delete</button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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