import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiCheckCircle, FiCalendar, FiMapPin } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import Logo from "../../assets/logo.png";
import "../../styles/login.css";

import {
  saveSession,
} from "../../services/authApi";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const payload = {
        name: fullName,
        email: email,
        password: password
      };

      // Memanggil API Node.js menggunakan Axios
      const response = await axios.post("https://sigma-backend-gules.vercel.app/api/auth/register", payload);

      if (response.data.success) {
        // Buat objek session agar sesuai dengan format yang digunakan authApi sebelumnya
        const session = {
          access_token: response.data.token,
          user: { name: fullName, email: email }
        };
        saveSession(session);
        
        setSuccessMessage("Akun berhasil dibuat!");
        localStorage.removeItem("onboarding_complete");
        localStorage.setItem("sigma_fullName", fullName);
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        throw new Error("Pendaftaran gagal.");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Gagal membuat akun. Coba lagi.";
      setErrorMessage(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left - Form */}
      <div className="auth-left auth-form-container">
        <div className="auth-card no-shadow">
          <h2 className="auth-card-title">Buat Akun Mahasiswa</h2>
          <p className="auth-card-subtitle">Daftar untuk mengakses SIGMA</p>

          {errorMessage && <div className="auth-error">{errorMessage}</div>}
          {successMessage && <div className="auth-success">{successMessage}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nama Lengkap</label>
              <div className="auth-input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

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

            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="password">Kata Sandi</label>
                <div className="auth-input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Konfirmasi</label>
                <div className="auth-input-wrapper">
                  {confirmPassword && password === confirmPassword ? (
                    <FiCheckCircle className="input-icon success-icon" />
                  ) : (
                    <FiCheckCircle className="input-icon" />
                  )}
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Ulangi kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                Saya menyetujui <a href="#">Syarat & Ketentuan</a> serta <a href="#">Kebijakan Privasi</a> SIGMA.
              </label>
            </div>

            <button type="submit" className="auth-submit btn-green" disabled={isSubmitting}>
              {isSubmitting && <span className="spinner" />}
              {isSubmitting ? "Memproses..." : "Daftar Sekarang →"}
            </button>
          </form>

          <div className="auth-divider">
            <span>Atau daftar dengan</span>
          </div>

          <div className="auth-social">
            <button type="button" className="btn-social">
              <FcGoogle className="social-icon" />
              Google
            </button>
            <button type="button" className="btn-social">
              <FiMail className="social-icon" style={{ color: "#333" }} />
              SSO Univ
            </button>
          </div>

          <div className="auth-footer">
            Sudah punya akun?{" "}
            <Link to="/login">Masuk di sini</Link>
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

export default Register;

