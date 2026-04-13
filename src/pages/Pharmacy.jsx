import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Pharmacy() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const [form, setForm] = useState({
    medicine: "",
    qty: 1,
    price: 0,
  });

  // LOAD DATA
  useEffect(() => {
    const loadData = () => {
      setPatients(JSON.parse(localStorage.getItem("patients")) || []);
      setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  // ADD ITEM
  const addItem = () => {
    if (!form.medicine || form.qty <= 0) return;

    const med = medicines.find((m) => m.name === form.medicine);
    if (!med) return;

    if (form.qty > med.stock) {
      alert("❌ Not enough stock");
      return;
    }

    const item = {
      medicine: form.medicine,
      qty: form.qty,
      price: form.price,
      total: form.qty * form.price,
    };

    setBillItems([...billItems, item]);

    setForm({ medicine: "", qty: 1, price: 0 });
  };

  // REMOVE ITEM
  const removeItem = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  // TOTAL
  const totalAmount = billItems.reduce((sum, i) => sum + i.total, 0);

  // CHECKOUT
  const handleCheckout = () => {
    if (!selectedPatient || billItems.length === 0) {
      alert("Select patient & add medicines");
      return;
    }

    const updatedMeds = [...medicines];

    billItems.forEach((item) => {
      const index = updatedMeds.findIndex(
        (m) => m.name === item.medicine
      );

      if (index !== -1) {
        updatedMeds[index].stock =
          Number(updatedMeds[index].stock) - Number(item.qty);
      }
    });

    setMedicines(updatedMeds);
    localStorage.setItem("medicines", JSON.stringify(updatedMeds));

    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    bills.push({
      patient: selectedPatient,
      items: billItems,
      total: totalAmount,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("bills", JSON.stringify(bills));

    alert("✅ Billing Done");

    setBillItems([]);
    setSelectedPatient("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">🏥 Hospital</h1>

          <div className="space-y-4">
            <div onClick={() => navigate("/admin")} className="cursor-pointer">📊 Dashboard</div>
            <div onClick={() => navigate("/patients")} className="cursor-pointer">👨‍⚕️ Patients</div>
            <div onClick={() => navigate("/appointments")} className="cursor-pointer">📅 Appointments</div>
            <div className="bg-blue-700 p-2 rounded">💊 Pharmacy</div>
          </div>
        </div>

        <button onClick={() => navigate(-1)} className="bg-white text-blue-900 py-2 rounded">
          ← Back
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">💊 Pharmacy Billing</h1>

        {/* PATIENT */}
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="border p-2 mb-4 rounded w-full md:w-1/3"
        >
          <option value="">Select Patient</option>
          {patients.map((p, i) => (
            <option key={i} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        {/* ADD MEDICINE */}
        <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-3">

          <select
            value={form.medicine}
            onChange={(e) =>
              setForm({ ...form, medicine: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Select Medicine</option>
            {medicines.map((m, i) => (
              <option key={i} value={m.name}>
                {m.name} (Stock: {m.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            value={form.qty}
            onChange={(e) =>
              setForm({ ...form, qty: Number(e.target.value) })
            }
            className="border p-2 rounded"
            placeholder="Qty"
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            className="border p-2 rounded"
            placeholder="Price"
          />

          <button
            onClick={addItem}
            className="bg-blue-600 text-white col-span-3 py-2 rounded"
          >
            Add Item
          </button>
        </div>

        {/* BILL */}
        <div className="bg-white p-4 rounded shadow">

          <h3 className="font-bold mb-3">Bill</h3>

          {billItems.length === 0 ? (
            <p>No items</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {billItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.medicine}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                    <td>{item.total}</td>
                    <td>
                      <button
                        onClick={() => removeItem(i)}
                        className="text-red-500"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h2 className="text-xl font-bold mt-4">
            Total: ₹{totalAmount}
          </h2>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}