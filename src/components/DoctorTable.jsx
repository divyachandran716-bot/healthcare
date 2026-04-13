export default function DoctorTable() {
  const doctors = [
    { id: 1, name: "Dr. Smith", dept: "Cardiology", exp: "10 yrs" },
    { id: 2, name: "Dr. Priya", dept: "Neurology", exp: "7 yrs" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Doctors</h3>

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dept</th>
            <th>Experience</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map(d => (
            <tr key={d.id} className="border-b">
              <td>{d.name}</td>
              <td>{d.dept}</td>
              <td>{d.exp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}