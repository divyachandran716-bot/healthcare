import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Medicines() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    expiry: "",
  });

  // LOAD
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(saved);
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = () => {
    if (!form.name || !form.category || !form.stock || !form.expiry) {
      alert("Fill all fields");
      return;
    }

    const cleanForm = {
      ...form,
      stock: Number(form.stock),
    };

    if (editIndex !== null) {
      const updated = [...medicines];
      updated[editIndex] = cleanForm;
      setMedicines(updated);
      setEditIndex(null);
    } else {
      setMedicines([...medicines, cleanForm]);
    }

    setForm({ name: "", category: "", stock: "", expiry: "" });
  };

  const deleteMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const editMedicine = (index) => {
    setForm(medicines[index]);
    setEditIndex(index);
  };

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // EXPIRY CHECK
  const isExpiringSoon = (date) => {
    const today = new Date();
    const exp = new Date(date);
    const diff = (exp - today) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  // 🔴 ALERTS
  const lowStock = medicines.filter((m) => m.stock < 10);
  const expiringSoon = medicines.filter((m) =>
    isExpiringSoon(m.expiry)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">🏥 Hospital</h1>

        <div className="space-y-4">
          <div onClick={() => navigate("/admin")}>📊 Dashboard</div>
          {/* <div onClick={() => navigate("/patients")}>👨‍⚕️ Patients</div> */}
          {/* <div onClick={() => navigate("/appointments")}>📅 Appointments</div> */}
          <div className="bg-blue-800 p-2 rounded">💊 Medicines</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">💊 Medicines Inventory</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {/* 🔴 STOCK ALERT DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded">
            <h2 className="font-bold text-red-700">🔴 Low Stock</h2>
            <p className="text-2xl">{lowStock.length}</p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded">
            <h2 className="font-bold text-yellow-700">🟡 Expiring Soon</h2>
            <p className="text-2xl">{expiringSoon.length}</p>
          </div>

          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <h2 className="font-bold text-green-700">💊 Total Medicines</h2>
            <p className="text-2xl">{medicines.length}</p>
          </div>

        </div>

        {/* ALERT LIST */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          {/* LOW STOCK LIST */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2 text-red-600">Low Stock Medicines</h3>
            {lowStock.length === 0 ? (
              <p>No low stock items</p>
            ) : (
              lowStock.map((m, i) => (
                <div key={i} className="border-b py-1">
                  {m.name} - Stock: {m.stock}
                </div>
              ))
            )}
          </div>

          {/* EXPIRING LIST */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2 text-yellow-600">
              Expiring Soon
            </h3>
            {expiringSoon.length === 0 ? (
              <p>No expiring medicines</p>
            ) : (
              expiringSoon.map((m, i) => (
                <div key={i} className="border-b py-1">
                  {m.name} - Exp: {m.expiry}
                </div>
              ))
            )}
          </div>

        </div>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-4 w-1/3"
          placeholder="Search medicine..."
        />

        {/* FORM */}
        <div className="bg-white p-4 mb-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 m-1"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 m-1"
          >
            <option value="">Category</option>
            <option>Tablet</option>
            <option>Syrup</option>
            <option>Injection</option>
            <option>Capsule</option>
          </select>

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock"
            className="border p-2 m-1"
          />

          <input
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            type="date"
            className="border p-2 m-1"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-900 text-white px-4 py-2 ml-2"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((med, i) => {
                const low = med.stock < 10;
                const exp = isExpiringSoon(med.expiry);

                return (
                  <tr key={i}>
                    <td>{med.name}</td>
                    <td>{med.category}</td>
                    <td>{med.stock}</td>
                    <td>{med.expiry}</td>
                    <td>
                      {low
                        ? "Low Stock"
                        : exp
                        ? "Expiring"
                        : "OK"}
                    </td>
                   <td className="flex gap-2 py-2">

  {/* EDIT BUTTON */}
  <button
    onClick={() => editMedicine(i)}
    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow"
  >
    ✏️ Edit
  </button>

  {/* DELETE BUTTON */}
  <button
    onClick={() => deleteMedicine(i)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow"
  >
    🗑 Delete
  </button>

</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}