import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Appointments({ selectedPatient }) {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    time: "",
    status: "Pending",
  });

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  // AUTO FILL PATIENT
  useEffect(() => {
    if (selectedPatient) {
      setForm((prev) => ({
        ...prev,
        patient: selectedPatient.name || "",
        doctor: selectedPatient.doctor || "",
      }));
    }
  }, [selectedPatient]);

  // SAVE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // FILTER
  const filteredAppointments = selectedPatient
    ? appointments.filter((a) => a.patient === selectedPatient.name)
    : appointments;

  // ADD
  const handleAdd = () => {
    if (!form.patient || !form.doctor || !form.time) {
      alert("Fill all fields");
      return;
    }

    const exists = appointments.some(
      (a) => a.date === selectedDate && a.time === form.time
    );

    if (exists) {
      alert("Slot already booked!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patient: form.patient,
      doctor: form.doctor,
      time: form.time,
      status: form.status,
      date: selectedDate,
    };

    setAppointments([...appointments, newAppointment]);

    setForm({
      patient: selectedPatient?.name || "",
      doctor: selectedPatient?.doctor || "",
      time: "",
      status: "Pending",
    });

    setShowModal(false);
  };

  // EDIT
  const handleEdit = (appt) => {
    setEditId(appt.id);
    setForm(appt);
    setSelectedDate(appt.date);
    setShowModal(true);
  };

  // UPDATE
  const handleUpdate = () => {
    setAppointments(
      appointments.map((a) =>
        a.id === editId
          ? { ...form, id: editId, date: selectedDate }
          : a
      )
    );

    setEditId(null);
    setShowModal(false);
  };

  // DELETE
  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-lg font-bold mb-4">📅 Appointments</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 rounded text-black mb-4"
        />

        <button
          onClick={() => {
            setEditId(null);
            setShowModal(true);
            setForm({
              patient: selectedPatient?.name || "",
              doctor: selectedPatient?.doctor || "",
              time: "",
              status: "Pending",
            });
          }}
          className="w-full bg-white text-blue-900 py-2 rounded font-semibold"
        >
          + New Appointment
        </button>
      </div>

      {/* MAIN FULL PAGE */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Appointment Dashboard
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2">Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">

                  <td className="p-2">{a.patient}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.status}</td>

                  <td className="flex gap-2 p-2">

                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-bold mb-4">
              {editId ? "Update" : "Add"} Appointment
            </h2>

            <input
              value={form.patient}
              onChange={(e) =>
                setForm({ ...form, patient: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Patient"
            />

            <input
              value={form.doctor}
              onChange={(e) =>
                setForm({ ...form, doctor: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Doctor"
            />

            <select
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className="border p-2 w-full mb-2"
            >
              <option value="">Select Time</option>
              {timeSlots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="border p-2 w-full mb-4"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={editId ? handleUpdate : handleAdd}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              {editId ? "Update" : "Add"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}