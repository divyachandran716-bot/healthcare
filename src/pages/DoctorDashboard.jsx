import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PatientList from "../components/PatientList";
import AddPatientForm from "../components/AddPatientForm";
import Charts from "../components/Charts";
import AppointmentTable from "../components/AppointmentTable";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(() => {
    return JSON.parse(localStorage.getItem("patients")) || [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <div className="flex">
      <Sidebar role="doctor" />

      <div className="flex-1 p-6 bg-gray-100">
        <Navbar />

        <h2 className="text-xl font-bold">Doctor Dashboard</h2>

        <Charts />

        {/* Add Patient */}
        <AddPatientForm
          addPatient={(p) => setPatients([...patients, p])}
        />

        {/* Patient List */}
        <PatientList
          patients={patients}
          setPatients={setPatients}
        />

        <AppointmentTable />
      </div>
    </div>
  );
}