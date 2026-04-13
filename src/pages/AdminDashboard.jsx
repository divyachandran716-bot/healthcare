import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // ================= LOCAL STORAGE =================
  const [patients, setPatients] = useState(() => {
    return JSON.parse(localStorage.getItem("patients")) || [];
  });

  const [doctors, setDoctors] = useState(() => {
    return JSON.parse(localStorage.getItem("doctors")) || [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  // ================= FORMS =================
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    disease: ""
  });

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    dept: "",
    exp: "",
    fees: "",
    phone: "",
    email: "",
    status: "Available"
  });

  const [editPatientId, setEditPatientId] = useState(null);
  const [editDoctorId, setEditDoctorId] = useState(null);

  const [search, setSearch] = useState("");

  // ================= PATIENT CRUD =================
  const savePatient = () => {
    if (!patientForm.name) return;

    if (editPatientId) {
      setPatients(
        patients.map((p) =>
          p.id === editPatientId ? { ...patientForm, id: editPatientId } : p
        )
      );
      setEditPatientId(null);
    } else {
      setPatients([...patients, { ...patientForm, id: Date.now() }]);
    }

    setPatientForm({ name: "", age: "", disease: "" });
  };

  const editPatient = (p) => {
    setPatientForm(p);
    setEditPatientId(p.id);
    setActivePage("patients");
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  // ================= DOCTOR CRUD =================
  const saveDoctor = () => {
    if (!doctorForm.name) return;

    if (editDoctorId) {
      setDoctors(
        doctors.map((d) =>
          d.id === editDoctorId ? { ...doctorForm, id: editDoctorId } : d
        )
      );
      setEditDoctorId(null);
    } else {
      setDoctors([...doctors, { ...doctorForm, id: Date.now() }]);
    }

    setDoctorForm({
      name: "",
      dept: "",
      exp: "",
      fees: "",
      phone: "",
      email: "",
      status: "Available"
    });
  };

  const editDoctor = (d) => {
    setDoctorForm(d);
    setEditDoctorId(d.id);
    setActivePage("doctors");
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  const filteredPatients = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDoctors = doctors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = [
    { name: "Patients", value: patients.length },
    { name: "Doctors", value: doctors.length }
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-gradient-to-b from-blue-950 to-blue-800 text-white p-5 flex flex-col">

        <h1 className="text-2xl font-bold mb-6">🏥 ADMIN PANEL</h1>

        <SidebarItem label="Dashboard" active={activePage==="dashboard"} onClick={()=>setActivePage("dashboard")} />
        <SidebarItem label="Patients" active={activePage==="patients"} onClick={()=>setActivePage("patients")} />
        <SidebarItem label="Doctors" active={activePage==="doctors"} onClick={()=>setActivePage("doctors")} />

        <div className="mt-auto pt-6 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6 overflow-auto">

        {/* SEARCH */}
        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ================= DASHBOARD ================= */}
        {activePage === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">
                👨‍⚕️ Patients: {patients.length}
              </div>
              <div className="bg-white p-4 rounded shadow">
                🩺 Doctors: {doctors.length}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ================= PATIENTS ================= */}
        {activePage === "patients" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Patients</h2>

            <div className="bg-white p-4 mb-4 flex gap-2 rounded shadow">
              <input placeholder="Name"
                className="border p-2"
                value={patientForm.name}
                onChange={(e)=>setPatientForm({...patientForm,name:e.target.value})}
              />

              <input placeholder="Age"
                className="border p-2"
                value={patientForm.age}
                onChange={(e)=>setPatientForm({...patientForm,age:e.target.value})}
              />

              <input placeholder="Disease"
                className="border p-2"
                value={patientForm.disease}
                onChange={(e)=>setPatientForm({...patientForm,disease:e.target.value})}
              />

              <button onClick={savePatient}
                className="bg-blue-600 text-white px-4 rounded">
                {editPatientId ? "Update" : "Add"}
              </button>
            </div>

            {filteredPatients.map((p)=>(
              <div key={p.id} className="bg-white p-3 mb-2 flex justify-between rounded shadow">
                <div>{p.name} | {p.age} | {p.disease}</div>

                <div className="space-x-2">
                  <button onClick={()=>editPatient(p)} className="bg-yellow-500 px-3 py-1 text-white rounded">Edit</button>
                  <button onClick={()=>deletePatient(p.id)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= DOCTORS (PROFESSIONAL UI) ================= */}
        {activePage === "doctors" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Doctors</h2>

            {/* FORM */}
            <div className="bg-white p-4 mb-4 grid grid-cols-3 gap-2 rounded shadow">

              <input placeholder="Name"
                className="border p-2"
                value={doctorForm.name}
                onChange={(e)=>setDoctorForm({...doctorForm,name:e.target.value})}
              />

              <input placeholder="Department"
                className="border p-2"
                value={doctorForm.dept}
                onChange={(e)=>setDoctorForm({...doctorForm,dept:e.target.value})}
              />

              <input placeholder="Experience"
                className="border p-2"
                value={doctorForm.exp}
                onChange={(e)=>setDoctorForm({...doctorForm,exp:e.target.value})}
              />

              <input placeholder="Phone"
                className="border p-2"
                value={doctorForm.phone}
                onChange={(e)=>setDoctorForm({...doctorForm,phone:e.target.value})}
              />

              <input placeholder="Email"
                className="border p-2"
                value={doctorForm.email}
                onChange={(e)=>setDoctorForm({...doctorForm,email:e.target.value})}
              />

              <input placeholder="Fees"
                className="border p-2"
                value={doctorForm.fees}
                onChange={(e)=>setDoctorForm({...doctorForm,fees:e.target.value})}
              />

              <select
                className="border p-2"
                value={doctorForm.status}
                onChange={(e)=>setDoctorForm({...doctorForm,status:e.target.value})}
              >
                <option>Available</option>
                <option>Busy</option>
                <option>On Leave</option>
              </select>

              <button onClick={saveDoctor}
                className="bg-green-600 text-white px-4 rounded col-span-3">
                {editDoctorId ? "Update Doctor" : "Add Doctor"}
              </button>
            </div>

            {/* CARD UI */}
            {filteredDoctors.map((d)=>(
              <div key={d.id} className="bg-white p-4 mb-3 rounded shadow flex justify-between">

                <div>
                  <b className="text-lg">{d.name}</b> <br/>
                  🏥 {d.dept} | ⏳ {d.exp} <br/>
                  📞 {d.phone} | 📧 {d.email} <br/>
                  💰 ₹{d.fees} | 
                  <span className={`ml-2 px-2 py-1 text-white text-xs rounded ${
                    d.status==="Available" ? "bg-green-500" :
                    d.status==="Busy" ? "bg-red-500" : "bg-yellow-500"
                  }`}>
                    {d.status}
                  </span>
                </div>

                <div className="space-x-2">
                  <button onClick={()=>editDoctor(d)} className="bg-yellow-500 px-3 py-1 text-white rounded">Edit</button>
                  <button onClick={()=>deleteDoctor(d.id)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ================= SIDEBAR ITEM =================
function SidebarItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded cursor-pointer mb-2 transition
      ${active ? "bg-white text-blue-900" : "hover:bg-blue-700"}`}
    >
      {label}
    </div>
  );
}