import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    const success = register(form);

    if (success) {
      alert("Registered Successfully");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}