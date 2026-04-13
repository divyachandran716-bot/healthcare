import { useState } from "react";

export default function AddPatientForm({ addPatient }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: "",
    doctor: "",
  });

  //  Doctor list
  const doctors = [
    "Dr. Smith (Cardiologist)",
    "Dr. Priya (Diabetologist)",
    "Dr. Arun (General Physician)",
  ];

  // Auto status detection
  const getStatus = (age, disease) => {
    age = Number(age);

    if (disease === "Heart" && age > 50) return "Critical";
    if (disease === "Diabetes" && age > 40) return "Critical";
    if (disease === "BP" && age > 60) return "Critical";

    if (age > 45) return "Stable";

    return "Recovering";
  };

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.disease || !form.doctor) {
      alert("Please fill all fields");
      return;
    }

    const status = getStatus(form.age, form.disease);

    addPatient({
      id: Date.now(),
      ...form,
      status,
    });

    // Reset form
    setForm({
      name: "",
      age: "",
      disease: "",
      doctor: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-3">Add Patient</h3>

      <div className="flex flex-wrap gap-2">

        {/* Name */}
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Age */}
        <input
          placeholder="Age"
          className="border p-2"
          type="number"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        {/* Disease */}
        <input
  list="diseases"
  placeholder="Enter or select disease"
  className="border p-2"
  value={form.disease}
  onChange={(e) =>
    setForm({ ...form, disease: e.target.value })
  }
/>

<datalist id="diseases">
  <option value="Heart" />
  <option value="Diabetes" />
  <option value="BP" />
  <option value="Fever" />
  <option value="Cold" />
  <option value="Asthma" />
</datalist>

        {/* Doctor */}
        <select
          className="border p-2"
          value={form.doctor}
          onChange={(e) =>
            setForm({ ...form, doctor: e.target.value })
          }
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc, index) => (
            <option key={index} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}