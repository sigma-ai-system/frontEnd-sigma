import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Landing
import LandingPage from "./pages/landing/LandingPage";

// Auth
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import ProgressSkripsi from "./pages/dashboard/ProgressSkripsi";
import Logbook from "./pages/dashboard/Logbook";
import Bimbingan from "./pages/dashboard/Bimbingan";
import Profile from "./pages/dashboard/Profile";

// Mahasiswa
import MahasiswaList from "./pages/mahasiswa/MahasiswaList";
import ManageKelas from "./pages/mahasiswa/ManageKelas";
import NilaiInput from "./pages/mahasiswa/NilaiInput";
import AbsensiList from "./pages/mahasiswa/AbsensiList";
import AbsensiForm from "./pages/mahasiswa/AbsensiForm";
import MahasiswaMaster from "./pages/mahasiswa/MahasiswaMaster";
import MahasiswaForm from "./pages/mahasiswa/MahasiswaForm";
import ImportCsv from "./pages/mahasiswa/ImportCsv";

// SPP
import SppList from "./pages/spp/SppList";
import SppDetail from "./pages/spp/SppDetail";
import SppManage from "./pages/spp/SppManage";

// Dosen
import DosenList from "./pages/dosen/DosenList";
import DosenDetail from "./pages/dosen/DosenDetail";
import DosenForm from "./pages/dosen/DosenForm";
import DosenAbsensiList from "./pages/dosen/DosenAbsensiList";
import DosenAbsensiInput from "./pages/dosen/DosenAbsensiInput";

// Laporan
import LaporanList from "./pages/laporan/LaporanList";
import LaporanBuat from "./pages/laporan/LaporanBuat";

// Global CSS
import "./styles/_variables.css";
import "./styles/index.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/sidebar.css";
import "./styles/modules.css";

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/progress-skripsi" || location.pathname === "/logbook" || location.pathname === "/bimbingan" || location.pathname === "/profile";

  if (isLandingPage) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    );
  }

  if (isAuthPage) {
    return (
      <div className="app-root auth-layout">
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app-root">
      <Sidebar />
      <main className="app-main">
        <div className={`page-wrapper ${isDashboard ? "dashboard-wrapper" : ""}`}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Progress Skripsi */}
            <Route
              path="/progress-skripsi"
              element={
                <ProtectedRoute>
                  <ProgressSkripsi />
                </ProtectedRoute>
              }
            />

            {/* Logbook */}
            <Route
              path="/logbook"
              element={
                <ProtectedRoute>
                  <Logbook />
                </ProtectedRoute>
              }
            />

            {/* Bimbingan */}
            <Route
              path="/bimbingan"
              element={
                <ProtectedRoute>
                  <Bimbingan />
                </ProtectedRoute>
              }
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Mahasiswa */}
            <Route
              path="/mahasiswa"
              element={
                <ProtectedRoute>
                  <MahasiswaList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/kelas"
              element={
                <ProtectedRoute>
                  <ManageKelas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/nilai/input"
              element={
                <ProtectedRoute>
                  <NilaiInput />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/nilai/:id/edit"
              element={
                <ProtectedRoute>
                  <NilaiInput />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/absensi"
              element={
                <ProtectedRoute>
                  <AbsensiList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/absensi/input"
              element={
                <ProtectedRoute>
                  <AbsensiForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/absensi/:id/edit"
              element={
                <ProtectedRoute>
                  <AbsensiForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/master"
              element={
                <ProtectedRoute>
                  <MahasiswaMaster />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/master/tambah"
              element={
                <ProtectedRoute>
                  <MahasiswaForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/master/:id/edit"
              element={
                <ProtectedRoute>
                  <MahasiswaForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mahasiswa/import-csv"
              element={
                <ProtectedRoute>
                  <ImportCsv />
                </ProtectedRoute>
              }
            />

            {/* SPP */}
            <Route
              path="/spp"
              element={
                <ProtectedRoute>
                  <SppList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spp/:id"
              element={
                <ProtectedRoute>
                  <SppDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spp/manage"
              element={
                <ProtectedRoute>
                  <SppManage />
                </ProtectedRoute>
              }
            />

            {/* Dosen */}
            <Route
              path="/dosen"
              element={
                <ProtectedRoute>
                  <DosenList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/:id"
              element={
                <ProtectedRoute>
                  <DosenDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/manage"
              element={
                <ProtectedRoute>
                  <DosenList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/tambah"
              element={
                <ProtectedRoute>
                  <DosenForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/:id/edit"
              element={
                <ProtectedRoute>
                  <DosenForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/absensi"
              element={
                <ProtectedRoute>
                  <DosenAbsensiList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dosen/absensi/input"
              element={
                <ProtectedRoute>
                  <DosenAbsensiInput />
                </ProtectedRoute>
              }
            />

            {/* Laporan */}
            <Route
              path="/laporan"
              element={
                <ProtectedRoute>
                  <LaporanList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/laporan/buat"
              element={
                <ProtectedRoute>
                  <LaporanBuat />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

