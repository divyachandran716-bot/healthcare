
// import { NavLink } from "react-router-dom";

// export default function Sidebar({ role }) {
//   const linkClass = ({ isActive }) =>
//     `block px-4 py-2 rounded-lg transition ${
//       isActive
//         ? "bg-white text-blue-900 font-semibold"
//         : "hover:bg-blue-700"
//     }`;

//   return (
//     <div className="w-64 bg-blue-900 text-white min-h-screen p-5">
//       <h2 className="text-xl font-bold mb-6 uppercase">{role}</h2>

//       <ul className="space-y-3">

//         {/* Dashboard */}
//         <li> 
//           <NavLink to={`/${role}`} className={linkClass}>
//             Dashboard
//           </NavLink>
//         </li>

//         {/* Analytics */}
//         <li>
//           <NavLink to={`/${role}/analytics`} className={linkClass}>
//             Analytics
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${role}/appointments`} className={linkClass}>
//           Appointments
//           </NavLink>
//         </li>
//          <li>
//           <NavLink to={`/${role}/patients`} className={linkClass}>
//           Patients
//           </NavLink>
//         </li>
//          <li>
//           <NavLink to={`/${role}/schedule`} className={linkClass}>
//           Schedule
//           </NavLink>
//         </li>
//          <li>
//           <NavLink to={`/${role}/medicines`} className={linkClass}>
//           Medicines
//           </NavLink>
//         </li>

//       </ul>
//     </div>
//   );
// }



import { NavLink } from "react-router-dom";

export default function Sidebar({ role = "nurse" }) {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-white text-blue-900 font-semibold"
        : "hover:bg-blue-700"
    }`;

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6 uppercase">
        {role} Panel
      </h2>

      <ul className="space-y-3">

        {/* ================= DOCTOR MENU ================= */}
        {role === "doctor" && (
          <>
            <li>
              <NavLink to="/doctor" className={linkClass}>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor/analytics" className={linkClass}>
                Analytics
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor/patients" className={linkClass}>
                Patients
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor/appointments" className={linkClass}>
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor/schedule" className={linkClass}>
                Schedule
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor/medicines" className={linkClass}>
                Medicines
              </NavLink>
            </li>
          </>
        )}

        {/* ================= NURSE MENU ================= */}
        {role === "nurse" && (
          <>
            <li>
              <NavLink to="/nurse" className={linkClass}>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/nurse/icu" className={linkClass}>
                🔴 ICU
              </NavLink>
            </li>

            <li>
              <NavLink to="/nurse/admitted" className={linkClass}>
                🟢 Admitted
              </NavLink>
            </li>

            <li>
              <NavLink to="/nurse/discharged" className={linkClass}>
                ⚪ Discharged
              </NavLink>
            </li>

            <li>
              <NavLink to="/nurse/patients" className={linkClass}>
                Patients
              </NavLink>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}