// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import NurseDashboard from "./pages/NurseDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Charts from "./components/Charts";
// import Analytics from "./pages/Analytics";
// import Appointments from "./pages/Appointments";
// import Schedule from "./pages/Schedule";
// import Medicines from "./pages/Medicines";
// import Patients from "./pages/Patients";
// import ICU from "./pages/ICU";
// import Admitted from "./pages/Admitted";
// import Discharged from "./pages/Discharged";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//   <Route path="/" element={<Login />} />
//   <Route path="/register" element={<Register />} />

//   <Route path="/admin" element={
//     <ProtectedRoute role="admin">
//       <AdminDashboard />
//     </ProtectedRoute>
//   } />
//   <Route path="/nurse/icu" element={<ICU />} />
// <Route path="/nurse/admitted" element={<Admitted />} />
// <Route path="/nurse/discharged" element={<Discharged />} />

//   <Route path="/doctor" element={
//     <ProtectedRoute role="doctor">
//       <DoctorDashboard />
//     </ProtectedRoute>
//   } />

//   <Route path="/nurse" element={
//     <ProtectedRoute role="nurse">
//       <NurseDashboard />
//     </ProtectedRoute>
//   } />

//   {/* ✅ Analytics must be inside Route */}
//   <Route path="/admin/analytics" element={
//     <ProtectedRoute role="admin">
//       <Analytics />
//     </ProtectedRoute>
//   } />
// <Route path="/admin/appointments" element={
//     <ProtectedRoute role="admin">
//       <Appointments />
//     </ProtectedRoute>
//   } />
//   <Route path="/admin/schedule" element={
//     <ProtectedRoute role="admin">
//       <Schedule />
//     </ProtectedRoute>
//   } />
//   <Route path="/admin/patients" element={
//     <ProtectedRoute role="admin">
//       <Patients />
//     </ProtectedRoute>
//   } />
//   <Route path="/admin/medicines" element={
//     <ProtectedRoute role="admin">
//       <Medicines />
//     </ProtectedRoute>
//   } />

//   <Route path="/doctor/analytics" element={
//     <ProtectedRoute role="doctor">
//       <Analytics />
//     </ProtectedRoute>
//   } />

//   <Route path="/nurse/analytics" element={
//     <ProtectedRoute role="nurse">
//       <Analytics />
//     </ProtectedRoute>
//   } />
//   <Route path="/nurse/appointments" element={
//     <ProtectedRoute role="nurse">
//       <Appointments />
//     </ProtectedRoute>
//   } />
//   <Route path="/nurse/schedule" element={
//     <ProtectedRoute role="nurse">
//       <Schedule />
//     </ProtectedRoute>
//   } />
//   <Route path="/nurse/medicines" element={
//     <ProtectedRoute role="nurse">
//       <Medicines />
//     </ProtectedRoute>
//   } />
//   <Route path="/nurse/patients" element={
//     <ProtectedRoute role="nurse">
//       <Patients />
//     </ProtectedRoute>
//   } />
//   <Route path="/doctor/appointments" element={
//     <ProtectedRoute role="doctor">
//       <Appointments />
//     </ProtectedRoute>
//   } />
//   <Route path="/doctor/patients" element={
//     <ProtectedRoute role="doctor">
//       <Patients />
//     </ProtectedRoute>
//   } />
//   <Route path="/doctor/schedule" element={
//     <ProtectedRoute role="doctor">
//       <Schedule />
//     </ProtectedRoute>
//   } />
//   <Route path="/doctor/medicines" element={
//     <ProtectedRoute role="doctor">
//       <Medicines />
//     </ProtectedRoute>
//   } />

// </Routes>
//     </BrowserRouter>
//   );
// }







import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import NurseDashboard from "./pages/NurseDashboard";

import ICU from "./pages/ICU";
import Admitted from "./pages/Admitted";
import Discharged from "./pages/Discharged";

import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import Appointments from "./pages/Appointments";
import Schedule from "./pages/Schedule";
import Medicines from "./pages/Medicines";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/schedule"
          element={
            <ProtectedRoute role="admin">
              <Schedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute role="admin">
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/medicines"
          element={
            <ProtectedRoute role="admin">
              <Medicines />
            </ProtectedRoute>
          }
        />

        {/* ================= DOCTOR ================= */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/analytics"
          element={
            <ProtectedRoute role="doctor">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="doctor">
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/schedule"
          element={
            <ProtectedRoute role="doctor">
              <Schedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/medicines"
          element={
            <ProtectedRoute role="doctor">
              <Medicines />
            </ProtectedRoute>
          }
        />

        {/* ================= NURSE ================= */}
        <Route
          path="/nurse"
          element={
            <ProtectedRoute role="nurse">
              <NurseDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/icu"
          element={
            <ProtectedRoute role="nurse">
              <ICU />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/admitted"
          element={
            <ProtectedRoute role="nurse">
              <Admitted />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/discharged"
          element={
            <ProtectedRoute role="nurse">
              <Discharged />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/patients"
          element={
            <ProtectedRoute role="nurse">
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/appointments"
          element={
            <ProtectedRoute role="nurse">
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/schedule"
          element={
            <ProtectedRoute role="nurse">
              <Schedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/medicines"
          element={
            <ProtectedRoute role="nurse">
              <Medicines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/analytics"
          element={
            <ProtectedRoute role="nurse">
              <Analytics />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}