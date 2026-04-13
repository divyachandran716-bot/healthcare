import { useState } from "react";

export default function PatientList({ patients, setPatients, onSelect }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPatients = patients.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || p.disease === filter)
    );
  });

  //  DELETE
  const handleDelete = (id) => {
    if (window.confirm("Delete this patient?")) {
      const updated = patients.filter((p) => p.id !== id);
      setPatients(updated);
      localStorage.setItem("patients", JSON.stringify(updated));
    }
  };

  //  EDIT
  const handleEdit = (id) => {
    const newName = prompt("Enter new name");
    const newAge = prompt("Enter new age");

    if (!newName || !newAge) return;

    const updated = patients.map((p) =>
      p.id === id
        ? { ...p, name: newName, age: Number(newAge) }
        : p
    );

    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-bold mb-4">Patient Management</h3>

      {/*  SEARCH + FILTER */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Diseases</option>
          <option value="Heart">Heart</option>
          <option value="Diabetes">Diabetes</option>
          <option value="BP">BP</option>
          
        </select>
      </div>

      {/*  TABLE */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.map((p) => (
            <tr
              key={p.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect && onSelect(p)}
            >
              <td className="p-2">{p.name}</td>
              <td>{p.age}</td>
              <td>{p.disease}</td>

              <td
                className={
                  p.status === "Critical"
                    ? "text-red-500"
                    : p.status === "Stable"
                    ? "text-green-600"
                    : "text-blue-500"
                }
              >
                {p.status || "Stable"}
              </td>

              <td className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(p.id);
                  }}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(p.id);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPatients.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No patients found
        </p>
      )}
    </div>
  );
}