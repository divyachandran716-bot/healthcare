export default function PatientProfile({ patient }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>

      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Disease:</strong> {patient.disease}</p>
        <p><strong>Status:</strong> {patient.status}</p>
        <p><strong>Doctor:</strong> {patient.doctor}</p>
      </div>

      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
        Update Vitals
      </button>
    </div>
  );
}