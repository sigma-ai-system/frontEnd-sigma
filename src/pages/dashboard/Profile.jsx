import React, { useState } from "react";
import {
  FiEdit,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiFileText,
  FiShield
} from "react-icons/fi";
import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import UserAvatar from "../../assets/empty-profile.png";
import { getSession } from "../../services/authApi";
import "../../styles/profile.css";

const Profile = () => {
  const session = getSession();
  const userEmail = session?.user?.email || "Khoiru Rizki Bani Adam";
  const storedName = localStorage.getItem("sigma_fullName");
  const displayName = storedName || (userEmail.includes('@') ? userEmail.split('@')[0] : userEmail);
  const storedJudul = localStorage.getItem("sigma_judulPenelitian") || "Pengembangan Website Sigma Sebagai Klasifikasi Resiko Keterlambatan Skripsi Mahasiswa menggunakan Decision Tree";

  const [totalProgress] = useState(() => {
    const saved = localStorage.getItem("sigma_totalProgress");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [activeMilestoneTitle] = useState(() => {
    const saved = localStorage.getItem("sigma_activeMilestoneTitle");
    return saved || "Topik disetujui";
  });

  return (
    <div className="dashboard-container">
      {/* Header Profile / Topbar - Keeping it consistent with other pages or minimal if needed */}
      <header className="dash-header">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Cari data..." />
        </div>
        <div className="header-actions">
          <button className="icon-btn"><FiBell /></button>
          <button className="icon-btn"><FiHelpCircle /></button>
          <div className="user-profile">
            <div className="user-info-text">
              <span className="user-name" style={{ textTransform: 'capitalize' }}>{displayName}</span>
              <span className="user-role">220512041345</span>
            </div>
            <div className="user-avatar-img">
              <img src={UserAvatar} alt="User Avatar" />
            </div>
          </div>
        </div>
      </header>

      <div className="dash-content-container">
        <div className="profile-container">

          {/* Profile Header Card */}
          <div className="profile-header-card">
            <div className="profile-info-left">
              <div className="profile-avatar-wrapper">
                <img src={UserAvatar} alt="Khoiru Rizki Bani Adam" />
                <div className="profile-avatar-badge">
                  <FiCheckCircle size={14} />
                </div>
              </div>
              <div className="profile-details">
                <h1 className="profile-name-light" style={{ textTransform: 'capitalize' }}>
                  {displayName}
                  <span className="badge-aktif-profile">Aktif</span>
                </h1>
                <div className="profile-study-info">
                  <FaGraduationCap size={16} /> <span className="study-text">Teknik Informatika • 220512041345</span>
                </div>
                <div className="profile-tags">
                  <div className="profile-tag">
                    <FiCalendar className="tag-icon" /> Semester 8
                  </div>
                  <div className="profile-tag">
                    <FiUsers className="tag-icon" /> Angkatan 2022
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-edit-profile">
                <FiEdit /> Edit Profil
              </button>
              <span className="last-updated-text">Terakhir diperbarui: 2 jam yang lalu</span>
            </div>
          </div>

          {/* Judul Skripsi Card */}
          <div className="skripsi-card">
            <div className="skripsi-icon">
              <FiFileText />
            </div>
            <div className="skripsi-content">
              <p className="skripsi-label">JUDUL SKRIPSI</p>
              <h2>{storedJudul}</h2>
            </div>
          </div>

          {/* Prediksi Kelulusan Banner */}
          <div className="prediksi-banner">
            <div className="prediksi-left">
              <div className="prediksi-icon">
                <FaCheckCircle size={28} color="#15803d" />
              </div>
              <div className="prediksi-text">
                <p>PREDIKSI KELULUSAN</p>
                <h3 className="prediksi-status-light">STATUS: AMAN <span>(Lulus Tepat Waktu)</span></h3>
              </div>
            </div>
            <div className="prediksi-right">
              Berdasarkan data aktivitas & progres 30 hari terakhir
            </div>
          </div>

          {/* Stats Grid */}
          <div className="profile-stats-grid">

            {/* 1. Progress Skripsi */}
            <div className="stat-card">
              <h3 className="stat-card-title">
                <FiCheckCircle size={16} color="#0284c7" /> Progress Skripsi
              </h3>
              <div className="progress-circular-wrapper">
                <div className="progress-circular-info">
                  <p>Tahap : {activeMilestoneTitle}</p>
                  <div className="progress-bar-linear">
                    <div className="progress-bar-fill" style={{ width: `${totalProgress}%` }}></div>
                  </div>
                </div>
                <div style={{ position: 'relative', width: '120px', height: '120px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}>
                  <svg width="120" height="120" viewBox="0 0 160 160" style={{ position: 'absolute', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="profileProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                      <filter id="profileGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.25" />
                      </filter>
                    </defs>
                    
                    {/* Background Track */}
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="56" 
                      fill="none" 
                      stroke="#f1f5f9" 
                      strokeWidth="14" 
                    />

                    {/* Progress Arc */}
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="56" 
                      fill="none" 
                      stroke="url(#profileProgressGradient)" 
                      strokeWidth="14" 
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - totalProgress / 100)}
                      filter="url(#profileGlow)"
                      style={{ 
                        transition: 'stroke-dashoffset 1s ease-out',
                        transformOrigin: '80px 80px',
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <span className="circle-value" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#006098', lineHeight: 1 }}>{totalProgress}%</span>
                    <span className="circle-label" style={{ fontSize: '0.55rem', color: '#64748b', marginTop: '4px' }}>Progres Total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Bimbingan Bulan Ini */}
            <div className="stat-card">
              <h3 className="stat-card-title">BIMBINGAN BULAN INI</h3>
              <div className="stat-main-value">
                <h3>4X</h3>
                <span className="stat-sub-value">↑+1 vs bln lalu</span>
              </div>
              <div className="mini-bar-chart">
                <div className="bar-item" style={{ height: '30%' }}></div>
                <div className="bar-item" style={{ height: '40%' }}></div>
                <div className="bar-item" style={{ height: '20%' }}></div>
                <div className="bar-item active" style={{ height: '60%' }}></div>
              </div>
            </div>

            {/* 3. Streak Harian */}
            <div className="stat-card">
              <h3 className="stat-card-title">STREAK HARIAN</h3>
              <div className="streak-wrapper">
                <div className="stat-main-value" style={{ marginBottom: '8px' }}>
                  <h3>7 Hari <span style={{ fontSize: '2rem' }}>🔥</span></h3>
                </div>
                <p className="streak-text">Sangat Produktif! 🔥</p>
                <div className="streak-dots">
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                  <div className="streak-dot"></div>
                </div>
              </div>
            </div>

            {/* 4. Monitoring Target */}
            <div className="stat-card">
              <h3 className="stat-card-title">MONITORING TARGET</h3>
              <div className="target-box">
                <div className="target-icon">
                  <FiClock size={18} />
                </div>
                <div className="target-info">
                  <h4>0 Hari</h4>
                  <p>Terencana!</p>
                </div>
              </div>
              <div className="target-footer">
                <div className="target-milestone">
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '2px' }}>Next Milestone</span>
                  Penyelesaian Bab 3: Metodologi
                </div>
                <div className="target-date-badge">3 DES</div>
              </div>
            </div>

            {/* 5. Tugas Aktif Revisi */}
            <div className="stat-card">
              <h3 className="stat-card-title">Tugas Aktif Revisi</h3>
              <div className="stat-main-value" style={{ marginBottom: '16px' }}>
                <div style={{ color: '#005a8c', fontSize: '2rem' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: '2rem' }}>3</h3>
              </div>
              <div className="tugas-list">
                <div className="tugas-item">
                  <div className="tugas-bullet"></div>
                  <div className="tugas-text">Revisi Metodologi Penelitian</div>
                  <div className="badge-urgent">URGENT</div>
                </div>
                <div className="tugas-item">
                  <div className="tugas-bullet"></div>
                  <div className="tugas-text">Perbaikan Daftar Pustaka</div>
                  <div className="badge-minor">MINOR</div>
                </div>
                <div className="tugas-item">
                  <div className="tugas-bullet"></div>
                  <div className="tugas-text">Tambahan Visualisasi Data</div>
                  <div className="badge-minor">MINOR</div>
                </div>
              </div>
            </div>

            {/* 6. Logbook Mingguan */}
            <div className="stat-card">
              <h3 className="stat-card-title">LOGBOOK MINGGUAN</h3>
              <div className="streak-wrapper">
                <div className="stat-main-value" style={{ marginBottom: '8px' }}>
                  <h3>5/7</h3>
                </div>
                <p className="streak-text">Hari Terisi</p>
                <div className="logbook-dots">
                  <div className="logbook-dot"></div>
                  <div className="logbook-dot"></div>
                  <div className="logbook-dot"></div>
                  <div className="logbook-dot"></div>
                  <div className="logbook-dot"></div>
                  <div className="logbook-dot inactive"></div>
                  <div className="logbook-dot inactive"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
