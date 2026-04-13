export default function AppointmentTable() {
  const appointments = [
    { id: 1, patient: "John", doctor: "Dr. Smith", date: "10 Apr" },
    { id: 2, patient: "Sara", doctor: "Dr. Priya", date: "12 Apr" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Appointments</h3>

      <table className="w-full">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.id} className="border-b">
              <td>{a.patient}</td>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}