import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiCheckCircle, FiCalendar, FiMapPin, FiEye, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import Logo from "../../assets/logo.png";
import "../../styles/login.css";

import { login as loginApi } from "../../services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email dan kata sandi wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      await loginApi({ email, password });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left - Form */}
      <div className="auth-left auth-form-container">
        <div className="auth-card no-shadow">
          <h2 className="auth-card-title" style={{ textAlign: 'center' }}>Selamat Datang Kembali</h2>
          <p className="auth-card-subtitle" style={{ textAlign: 'center' }}>Silakan masuk menggunakan akun universitas Anda.</p>

          {errorMessage && <div className="auth-error">{errorMessage}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Universitas</label>
              <div className="auth-input-wrapper">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="nama@univ.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label htmlFor="password" style={{ marginBottom: 0 }}>Kata Sandi</label>
                <a href="#" style={{ fontSize: "0.875rem", color: "var(--primary-600)", textDecoration: "none" }}>Lupa kata sandi?</a>
              </div>
              <div className="auth-input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <FiEye className="input-icon" style={{ left: 'auto', right: '16px', cursor: 'pointer' }} />
              </div>
            </div>

            <div className="form-group-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Ingat saya untuk 30 hari ke depan</label>
            </div>

            <button type="submit" className="auth-submit btn-green" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {isSubmitting && <span className="spinner" />}
              {isSubmitting ? "Memproses..." : (
                <>Masuk ke Akun <FiLogIn style={{ fontSize: '1.25rem' }} /></>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>atau</span>
          </div>

          <div className="auth-social" style={{ display: 'flex', flexDirection: 'column' }}>
            <button type="button" className="btn-social" style={{ width: '100%' }}>
              <FcGoogle className="social-icon" />
              Lanjutkan dengan Google
            </button>
          </div>

          <div className="auth-footer">
            Belum punya akun?{" "}
            <Link to="/register">Daftar Sekarang</Link>
          </div>
        </div>
      </div>

      {/* Right - Promotional Banner */}
      <div className="auth-right auth-promo-container">
        <div className="promo-overlay"></div>
        <div className="promo-content">
          <div className="promo-branding">
            <img src={Logo} alt="SIGMA" className="promo-logo" />
          </div>
          <h2 className="promo-title">Pantau Progres Skripsi<br />Anda dengan Mudah</h2>
          <p className="promo-subtitle">
            SIGMA membantu Anda memetakan perjalanan penelitian dari awal hingga sidang akhir. Kelola bimbingan, revisi, dan logbook dalam satu platform terpadu.
          </p>

          <div className="promo-floating-cards">
            <div className="floating-card compact-card" style={{ animationDelay: '0.2s' }}>
              <span className="fc-label">Total Progres</span>
              <span className="fc-value">75%</span>
              <div className="fc-progress-bar">
                <div className="fc-progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="floating-card compact-card" style={{ animationDelay: '0.4s' }}>
              <span className="fc-label">Jadwal Bimbingan</span>
              <span className="fc-value">Besok, 09:00</span>
              <div className="fc-location">
                <FiCalendar className="fc-icon-small" />
                <span>Ruang Lab 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

