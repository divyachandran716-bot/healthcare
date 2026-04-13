import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    doctor: "",
    department: "",
    date: "",
    time: "",
    status: "On Duty",
    recurring: "none",
  });

  const doctors = ["Dr. Smith", "Dr. John", "Dr. Priya"];

  // 🎨 Department Colors
  const departmentColors = {
    Cardiology: "bg-red-100 text-red-700",
    Neurology: "bg-purple-100 text-purple-700",
    Orthopedics: "bg-yellow-100 text-yellow-700",
    Pediatrics: "bg-green-100 text-green-700",
    General: "bg-blue-100 text-blue-700",
  };

  // LOAD
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("schedules"));
    if (saved) setSchedules(saved);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const addSchedule = () => {
    if (!form.doctor || !form.date || !form.time || !form.department) {
      alert("Fill all fields");
      return;
    }

    let newSchedules = [form];

    if (form.recurring === "daily") {
      newSchedules = Array.from({ length: 5 }).map((_, i) => {
        const d = new Date(form.date);
        d.setDate(d.getDate() + i);
        return { ...form, date: d.toISOString().split("T")[0] };
      });
    }

    if (form.recurring === "weekly") {
      newSchedules = Array.from({ length: 4 }).map((_, i) => {
        const d = new Date(form.date);
        d.setDate(d.getDate() + i * 7);
        return { ...form, date: d.toISOString().split("T")[0] };
      });
    }

    if (editIndex !== null) {
      const updated = [...schedules];
      updated[editIndex] = form;
      setSchedules(updated);
      setEditIndex(null);
    } else {
      setSchedules([...schedules, ...newSchedules]);
    }

    setForm({
      doctor: "",
      department: "",
      date: "",
      time: "",
      status: "On Duty",
      recurring: "none",
    });
  };

  const handleEdit = (index) => {
    setForm(schedules[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  // CALENDAR
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const getSchedulesForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return schedules.filter(
      (s) =>
        s.date === dateStr &&
        (selectedDoctor ? s.doctor === selectedDoctor : true) &&
        (selectedDept ? s.department === selectedDept : true)
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">🏥 Hospital</h1>

          <div className="space-y-4">
            <div onClick={() => navigate("/admin")} className="cursor-pointer hover:bg-blue-800 p-2 rounded">📊 Dashboard</div>
            {/* <div onClick={() => navigate("/patients")} className="cursor-pointer hover:bg-blue-800 p-2 rounded">👨‍⚕️ Patients</div> */}
            {/* <div onClick={() => navigate("/appointments")} className="cursor-pointer hover:bg-blue-800 p-2 rounded">📅 Appointments</div> */}
            <div className="bg-blue-800 p-2 rounded">🗓 Schedule</div>
          </div>
        </div>

        {/* <button onClick={() => navigate(-1)} className="bg-white text-blue-900 py-2 rounded">
          ← Back
        </button> */}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* <h1 className="text-2xl font-bold mb-6 text-blue-800">
          📅 Doctor Schedule
        </h1> */}


<div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-blue-800">
    📅 Doctor Schedule
  </h1>

  <button
    onClick={() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/admin");
      }
    }}
    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    ← Back
  </button>
</div>





        {/* FORM */}
        <div className="bg-white p-5 shadow rounded mb-6">
          <div className="grid md:grid-cols-2 gap-4">

            <select name="doctor" value={form.doctor} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Doctor</option>
              {doctors.map((doc, i) => <option key={i}>{doc}</option>)}
            </select>

            <select name="department" value={form.department} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Pediatrics</option>
              <option>General</option>
            </select>

            <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
            <input type="time" name="time" value={form.time} onChange={handleChange} className="border p-2 rounded" />

            <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
              <option>On Duty</option>
              <option>Off Duty</option>
            </select>

            <select name="recurring" value={form.recurring} onChange={handleChange} className="border p-2 rounded">
              <option value="none">No Repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>

          </div>

          <button onClick={addSchedule} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded">
            {editIndex !== null ? "Update" : "Add Schedule"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-4 mb-4">
          <select onChange={(e) => setSelectedDoctor(e.target.value)} className="border p-2 rounded">
            <option value="">All Doctors</option>
            {doctors.map((d, i) => <option key={i}>{d}</option>)}
          </select>

          <select onChange={(e) => setSelectedDept(e.target.value)} className="border p-2 rounded">
            <option value="">All Departments</option>
            {Object.keys(departmentColors).map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>

        {/* CALENDAR */}
        <div className="grid grid-cols-7 gap-2">
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const daySchedules = getSchedulesForDay(day);

            return (
              <div key={i} className="border p-2 h-28 bg-white rounded shadow">
                <p className="font-bold text-blue-800">{day}</p>

                {daySchedules.map((s, index) => (
                  <div key={index} className={`text-xs mt-1 p-1 rounded ${departmentColors[s.department]}`}>
                    {s.doctor} ({s.time})

                    <div className="flex gap-1 mt-1">
                      <button onClick={() => handleEdit(index)} className="text-blue-600 text-xs">Edit</button>
                      <button onClick={() => handleDelete(index)} className="text-red-600 text-xs">Delete</button>
                    </div>
                  </div>
                ))}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}