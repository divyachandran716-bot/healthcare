import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Healthcare System</h3>
      <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}

