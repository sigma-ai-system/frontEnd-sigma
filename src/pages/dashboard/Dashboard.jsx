import React, { useState } from "react";
import { FiSearch, FiBell, FiHelpCircle, FiCheckCircle, FiBook, FiClock, FiActivity, FiSettings, FiLogOut, FiX, FiCalendar, FiLink, FiChevronDown, FiImage, FiTrash2, FiVideo, FiMapPin, FiCloud, FiInfo } from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";
import { FaGraduationCap, FaUserCog, FaRocket } from "react-icons/fa";
import "../../styles/dashboard.css";
import Background1 from "../../assets/Background1.png";
import Background2 from "../../assets/Background2.png";
import Background3 from "../../assets/Background3.png";
import EmptyJadwal from "../../assets/logo.png";
import UserAvatar from "../../assets/avatar-dashboard.svg";
import ProfileAvatar from "../../assets/empty-profile.png";
import { getSession } from "../../services/authApi";

const Dashboard = () => {
  const session = getSession();
  const userEmail = session?.user?.email || "Khoiru Rizki Bani Adam";
  const storedName = localStorage.getItem("sigma_fullName");
  const displayName = storedName || (userEmail.includes('@') ? userEmail.split('@')[0] : userEmail);

  const [showModal, setShowModal] = useState(() => !localStorage.getItem("onboarding_complete"));
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [rencanaLulusDate, setRencanaLulusDate] = useState(() => {
    if (!localStorage.getItem("onboarding_complete")) return "";
    return localStorage.getItem("sigma_rencanaLulusDate") || "";
  });
  const [dosenPembimbing, setDosenPembimbing] = useState(() => {
    if (!localStorage.getItem("onboarding_complete")) return "";
    return localStorage.getItem("sigma_dosenPembimbing") || "";
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(() => {
    if (!localStorage.getItem("onboarding_complete")) return "Pilih Bidang Keahlian Kamu / Rekayasa Perangkat Lunak / Machine Learning / Jaringan";
    return localStorage.getItem("sigma_selectedTopic") || "Pilih Bidang Keahlian Kamu / Rekayasa Perangkat Lunak / Machine Learning / Jaringan";
  });
  const [judulPenelitian, setJudulPenelitian] = useState(() => {
    if (!localStorage.getItem("onboarding_complete")) return "";
    return localStorage.getItem("sigma_judulPenelitian") || "";
  });
  const [showJadwalModal, setShowJadwalModal] = useState(false);
  const [jadwalSuccess, setJadwalSuccess] = useState(false);
  const [jadwalJenisOpen, setJadwalJenisOpen] = useState(false);
  const [jadwalTempatOpen, setJadwalTempatOpen] = useState(false);
  const [jadwalForm, setJadwalForm] = useState({
    jenis: "Revisi / Progress / Sidang",
    nama: "",
    tempat: "Kampus",
    tanggal: "",
    jam: "",
    link: ""
  });

  const jenisBimbinganOptions = ["Revisi", "Progress", "Sidang"];
  const tempatOptions = ["Kampus", "Online", "Lainnya"];

  // Logbook Modal State
  const [showLogbookModal, setShowLogbookModal] = useState(false);
  const [logbookSuccess, setLogbookSuccess] = useState(false);
  const [logbookKategoriOpen, setLogbookKategoriOpen] = useState(false);
  const [logbookForm, setLogbookForm] = useState({
    kategori: "Revisi / Pengerjaan Mandiri / Bimbingan",
    tanggal: "",
    judul: "",
    detail: "",
    link: "",
    dokumen: null,
    dokumenName: ""
  });

  const logbookKategoriOptions = ["Revisi", "Pengerjaan Mandiri", "Bimbingan"];

  // Data Lists State
  const [jadwalList, setJadwalList] = useState([]);
  const [logbookList, setLogbookList] = useState([]);

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: null, index: null });

  const handleJadwalSubmit = () => {
    setJadwalList([...jadwalList, { ...jadwalForm }]);
    setJadwalSuccess(true);
  };

  const handleLogbookSubmit = () => {
    setLogbookList([...logbookList, { ...logbookForm }]);
    setLogbookSuccess(true);
  };

  const topics = [
    "Rekayasa Perangkat Lunak",
    "Machine Learning",
    "Jaringan Komputer"
  ];

  // Helper functions for formatting UI like Figma
  const getEstimasiWaktu = (targetDateStr) => {
    if (!targetDateStr) return "0 Hari";

    const target = new Date(targetDateStr);
    const now = new Date();

    if (target <= now) return "0 Hari";

    const diffTime = Math.abs(target - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} Hari`;
  };

  const formatDateBox = (dateString) => {
    if (!dateString) return { month: "TBD", date: "-" };
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { month: "TBD", date: "-" };
    const months = ["OKT", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
    return { month: months[d.getMonth()], date: d.getDate().toString().padStart(2, '0') };
  };

  const getDateBoxColor = (index) => {
    const colors = [
      { bg: '#eef6fc', text: '#006098' }, // Blue
      { bg: '#f4fcf4', text: '#16a34a' }, // Green
      { bg: '#f1f5f9', text: '#6b7280' }  // Gray
    ];
    return colors[index % colors.length];
  };

  const formatDateLogbook = (dateString) => {
    if (!dateString) return "TBD";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="dashboard-page">
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
              <img src={ProfileAvatar} alt="User Avatar" />
            </div>
          </div>
        </div>
      </header>

      <div className="dash-content-container">
        <div className="dash-top-row">
          <div className="hero-welcome-card">
            <div className="hero-text">
              <h1>Selamat Datang, <span>Pejuang Skripsi !</span></h1>
              <p>Lanjutkan risetmu. Sedikit lagi menuju gelar sarjana.</p>
              <div className="hero-badges">
                <div className="badge-row">
                  <span className="badge badge-green">Bidang: {selectedTopic !== "Pilih Bidang Keahlian Kamu / Rekayasa Perangkat Lunak / Machine Learning / Jaringan" ? selectedTopic : "Belum Ditentukan"}</span>
                  <span className="badge badge-blue">Pembimbing: {dosenPembimbing || "Belum Ditentukan"}</span>
                </div>
                <span className="badge badge-yellow w-100 text-center"><FiClock /> Status: On Progres (Tepat Waktu)</span>
              </div>
            </div>

            <div className="hero-chart">
              <div className="progress-circle-wrapper">
                <div className="progress-circle">
                  <span className="percent">0%</span>
                  <span className="label">Progres Total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dash-stats">
            <div className="stat-card">
              <FiBook className="stat-icon blue" />
              <div className="stat-info">
                <p>Logbook Terisi</p>
                <h3><span>0</span> <small>Sesi</small></h3>
              </div>
            </div>
            <div className="stat-card">
              <FiCheckCircle className="stat-icon green" />
              <div className="stat-info">
                <p>Revisi Selesai</p>
                <h3><span>0</span> <small>Poin</small></h3>
              </div>
            </div>
            <div className="stat-card">
              <FiClock className="stat-icon red" />
              <div className="stat-info">
                <p>Sisa Waktu</p>
                <h3 className="stat-value">
                  <span>{getEstimasiWaktu(rencanaLulusDate).split(' ')[0]}</span> <small>Hari</small>
                </h3>
              </div>
            </div>
            <div className="stat-card">
              <HiOutlineFire className="stat-icon orange" />
              <div className="stat-info">
                <p>Aktivitas Harian</p>
                <h3><span>0</span> <small>Hari Beruntun</small></h3>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-bottom-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Jadwal Mendatang</h3>
              <a href="#" className="see-all">Lihat Semua</a>
            </div>
            <div className={`card-body ${jadwalList.length === 0 ? 'empty-state' : ''}`}>
              {jadwalList.length === 0 ? (
                <>
                  <div className="empty-illustration">
                    <img src={UserAvatar} alt="Belum Ada Jadwal" width="120" />
                  </div>
                  <p className="empty-text">Belum Ada Jadwal Bimbingan</p>
                </>
              ) : (
                <div className="jadwal-list-container">
                  {jadwalList.map((item, index) => {
                    const { month, date } = formatDateBox(item.tanggal);
                    const dateColors = getDateBoxColor(index);
                    const t = item.tempat.toLowerCase();
                    const isOnline = t.includes('zoom') || t.includes('meet') || t.includes('link') || t.includes('online');
                    const isPortal = t.includes('portal') || t.includes('web');
                    const isGrayStyle = (index % 3) === 2;

                    return (
                      <div key={index} className="jadwal-item-card">
                        <div className="jadwal-date-box" style={{ backgroundColor: dateColors.bg, color: dateColors.text }}>
                          <span className="jadwal-month">{month}</span>
                          <span className="jadwal-date">{date}</span>
                        </div>
                        <div className="jadwal-content">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 className="jadwal-title" style={isGrayStyle ? { color: '#6b7280', fontWeight: '600' } : {}}>{item.nama || "Bimbingan"}</h4>
                            <button className="delete-icon-btn hover-only" onClick={() => { setDeleteTarget({ type: 'jadwal', index }); setShowDeleteModal(true); }}>
                              <FiTrash2 />
                            </button>
                          </div>
                          <div className="jadwal-meta">
                            {item.jam && (
                              <span className="jadwal-meta-item"><FiClock /> {item.jam}</span>
                            )}
                            <span className={`jadwal-meta-item ${isOnline ? 'online-link' : ''}`}>
                              {isOnline ? <FiVideo /> : (isPortal ? <FiCloud /> : <FiMapPin />)}
                              {item.tempat || "TBD"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="card-footer">
              <button className="btn-primary w-100" onClick={() => setShowJadwalModal(true)}>+ Tambah Jadwal</button>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Logbook Terbaru</h3>
              <button className="btn-primary btn-sm" onClick={() => setShowLogbookModal(true)}>+ Tambah Entri</button>
            </div>
            <div className="card-body p-0">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>TANGGAL</th>
                    <th>AKTIVITAS</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {logbookList.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="empty-row">Logbook Belum Terisi</td>
                    </tr>
                  ) : (
                    logbookList.map((item, index) => (
                      <tr key={index}>
                        <td style={{ fontWeight: '600', color: '#1e293b' }}>{formatDateLogbook(item.tanggal)}</td>
                        <td>
                          <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.judul || "Penyusunan Logbook"}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>{item.detail || "Tidak ada detail"}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '8px' }}>
                            <span className={`status-badge ${index % 2 !== 0 ? 'pending' : 'approved'}`}>
                              {index % 2 !== 0 ? 'MENUNGGU' : 'DISETUJUI'}
                            </span>
                            <button className="delete-icon-btn hover-only" onClick={() => { setDeleteTarget({ type: 'logbook', index }); setShowDeleteModal(true); }}>
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal Overlay */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content onboarding-modal">
            {onboardingStep === 1 && (
              <>
                <div className="modal-icon">
                  <FaRocket />
                </div>
                <h2>Target Kelulusan</h2>
                <p className="modal-subtitle">
                  Sebelum Memulai, Tentukan kapan Anda ingin merayakan kesuksesan ini.<br />
                  Kami akan membantu Anda mengatur jadwal berdasarkan target ini.
                </p>

                <div className="progress-steps">
                  <div className="step active"></div>
                  <div className="step"></div>
                  <div className="step"></div>
                </div>

                <div className="form-group">
                  <label>Rencana Lulus</label>
                  <input
                    type="date"
                    className="form-input"
                    value={rencanaLulusDate}
                    onChange={(e) => setRencanaLulusDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Estimasi (Otomatis Terisi)</label>
                  <input type="text" className="form-input" disabled value={getEstimasiWaktu(rencanaLulusDate)} />
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" disabled>← Sebelumnya</button>
                  <button className="btn-primary" onClick={() => setOnboardingStep(2)}>Berikutnya →</button>
                </div>
              </>
            )}

            {onboardingStep === 2 && (
              <>
                <div className="modal-icon-img">
                  <img src={Background2} alt="Dosen Pembimbing" />
                </div>
                <h2>Dosen Pembimbing</h2>
                <p className="modal-subtitle">
                  Tentukan dosen pembimbing yang akan mendampingi perjalanan riset Anda.
                </p>

                <div className="progress-steps">
                  <div className="step active"></div>
                  <div className="step active"></div>
                  <div className="step"></div>
                </div>

                <div className="form-group search-dosen">
                  <div className="search-input-wrapper">
                    <FiSearch className="search-icon-inside" />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Dr. Natasyah S.Kom M.Kom Ph.D"
                      value={dosenPembimbing}
                      onChange={(e) => setDosenPembimbing(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setOnboardingStep(1)}>← Sebelumnya</button>
                  <button className="btn-primary" onClick={() => setOnboardingStep(3)}>Berikutnya →</button>
                </div>
              </>
            )}

            {onboardingStep === 3 && (
              <>
                <div className="modal-icon-img">
                  <img src={Background3} alt="Detail Penelitian" />
                </div>
                <h2>Detail Penelitian</h2>
                <p className="modal-subtitle">
                  Tentukan dosen pembimbing yang akan mendampingi perjalanan riset Anda.
                </p>

                <div className="progress-steps">
                  <div className="step active"></div>
                  <div className="step active"></div>
                  <div className="step active"></div>
                </div>

                <div className="form-group">
                  <label>Topik Penelitian</label>
                  <div className="custom-dropdown-container" style={{ zIndex: 10 }}>
                    <div
                      className={`custom-dropdown-header form-input ${isDropdownOpen ? 'active' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>{selectedTopic}</span>
                      <FiChevronDown className={`jadwal-chevron ${isDropdownOpen ? 'open' : ''}`} />
                    </div>
                    {isDropdownOpen && (
                      <div className="custom-dropdown-menu">
                        {topics.map((topic, index) => (
                          <div
                            key={index}
                            className={`custom-dropdown-item ${selectedTopic === topic ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedTopic(topic);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Judul Penelitian</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Contoh: Implementasi Algoritma Random Forest Untuk Deteksi Dini Kerusakan Mesin Produksi Pada Industri Manufaktur..."
                    value={judulPenelitian}
                    onChange={(e) => setJudulPenelitian(e.target.value)}
                  ></textarea>
                </div>

                <div className="info-box">
                  <FiInfo className="info-icon" />
                  <p>Tips: Gunakan kata kerja operasional dan jelaskan objek penelitian secara spesifik. Anda dapat mengubah ini nanti saat konsultasi.</p>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setOnboardingStep(2)}>← Sebelumnya</button>
                  <button className="btn-primary" onClick={() => {
                    localStorage.setItem("onboarding_complete", "true");
                    localStorage.setItem("sigma_rencanaLulusDate", rencanaLulusDate);
                    localStorage.setItem("sigma_dosenPembimbing", dosenPembimbing);
                    localStorage.setItem("sigma_selectedTopic", selectedTopic);
                    localStorage.setItem("sigma_judulPenelitian", judulPenelitian);
                    setShowModal(false);
                  }}>Masuk ke Dashboard</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tambah Jadwal Bimbingan Modal */}
      {showJadwalModal && (
        <div className="modal-overlay" onClick={() => setShowJadwalModal(false)}>
          <div className="jadwal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="jadwal-modal-header">
              <h2>Tambah Jadwal Bimbingan</h2>
              <button className="jadwal-modal-close" onClick={() => setShowJadwalModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="jadwal-modal-body">
              <div className="jadwal-form-group">
                <label>Jenis Bimbingan</label>
                <div className="jadwal-dropdown-container">
                  <div
                    className={`jadwal-dropdown-header ${jadwalJenisOpen ? 'active' : ''}`}
                    onClick={() => { setJadwalJenisOpen(!jadwalJenisOpen); setJadwalTempatOpen(false); }}
                  >
                    <span>{jadwalForm.jenis}</span>
                    <FiChevronDown className={`jadwal-chevron ${jadwalJenisOpen ? 'open' : ''}`} />
                  </div>
                  {jadwalJenisOpen && (
                    <div className="jadwal-dropdown-menu">
                      {jenisBimbinganOptions.map((opt, i) => (
                        <div
                          key={i}
                          className={`jadwal-dropdown-item ${jadwalForm.jenis === opt ? 'selected' : ''}`}
                          onClick={() => {
                            setJadwalForm({ ...jadwalForm, jenis: opt });
                            setJadwalJenisOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="jadwal-form-group">
                <label>Nama</label>
                <input
                  type="text"
                  className="jadwal-input"
                  placeholder="Bimbingan Bab IV"
                  value={jadwalForm.nama}
                  onChange={(e) => setJadwalForm({ ...jadwalForm, nama: e.target.value })}
                />
              </div>

              <div className="jadwal-form-row">
                <div className="jadwal-form-group">
                  <label>Tempat</label>
                  <div className="jadwal-dropdown-container">
                    <div
                      className={`jadwal-dropdown-header ${jadwalTempatOpen ? 'active' : ''}`}
                      onClick={() => { setJadwalTempatOpen(!jadwalTempatOpen); setJadwalJenisOpen(false); }}
                    >
                      <span>{jadwalForm.tempat}</span>
                      <FiChevronDown className={`jadwal-chevron ${jadwalTempatOpen ? 'open' : ''}`} />
                    </div>
                    {jadwalTempatOpen && (
                      <div className="jadwal-dropdown-menu">
                        {tempatOptions.map((opt, i) => (
                          <div
                            key={i}
                            className={`jadwal-dropdown-item ${jadwalForm.tempat === opt ? 'selected' : ''}`}
                            onClick={() => {
                              setJadwalForm({ ...jadwalForm, tempat: opt });
                              setJadwalTempatOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="jadwal-form-group">
                  <label>Tanggal</label>
                  <div className="jadwal-input-icon">
                    <input
                      type="date"
                      className="jadwal-input"
                      value={jadwalForm.tanggal}
                      onChange={(e) => setJadwalForm({ ...jadwalForm, tanggal: e.target.value })}
                    />
                  </div>
                </div>

                <div className="jadwal-form-group">
                  <label>Jam</label>
                  <div className="jadwal-input-icon">
                    <input
                      type="time"
                      className="jadwal-input"
                      placeholder="09.00"
                      value={jadwalForm.jam}
                      onChange={(e) => setJadwalForm({ ...jadwalForm, jam: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="jadwal-form-group">
                <label>Link (Opsional)</label>
                <div className="jadwal-input-with-icon">
                  <input
                    type="url"
                    className="jadwal-input"
                    placeholder="https://meet.google.com/..."
                    value={jadwalForm.link}
                    onChange={(e) => setJadwalForm({ ...jadwalForm, link: e.target.value })}
                  />
                  <FiLink className="jadwal-input-suffix" />
                </div>
              </div>
            </div>

            <button
              className="jadwal-submit-btn"
              onClick={handleJadwalSubmit}
            >
              + Tambah Jadwal
            </button>
          </div>
        </div>
      )}

      {/* Success Animation Modal */}
      {jadwalSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-checkmark-wrapper">
              <svg className="success-circle" viewBox="0 0 120 120">
                <circle className="success-circle-bg" cx="60" cy="60" r="54" />
                <circle className="success-circle-progress" cx="60" cy="60" r="54" />
              </svg>
              <div className="success-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <p className="success-text">Data Berhasil Ditambahkan</p>
            <button
              className="success-btn"
              onClick={() => {
                setJadwalSuccess(false);
                setShowJadwalModal(false);
                setJadwalForm({ jenis: "Revisi / Progress / Sidang", nama: "", tempat: "Kampus", tanggal: "", jam: "", link: "" });
              }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Logbook Digital Modal */}
      {showLogbookModal && !logbookSuccess && (
        <div className="modal-overlay" onClick={() => setShowLogbookModal(false)}>
          <div className="jadwal-modal logbook-modal" onClick={(e) => e.stopPropagation()}>
            <div className="jadwal-modal-header">
              <h2>Logbook Digital</h2>
              <button className="jadwal-modal-close" onClick={() => setShowLogbookModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="jadwal-modal-body">
              {/* Kategori + Tanggal Row */}
              <div className="logbook-form-row-2col">
                <div className="jadwal-form-group">
                  <label>Kategori</label>
                  <div className="jadwal-dropdown-container">
                    <div
                      className={`jadwal-dropdown-header ${logbookKategoriOpen ? 'active' : ''}`}
                      onClick={() => setLogbookKategoriOpen(!logbookKategoriOpen)}
                    >
                      <span>{logbookForm.kategori}</span>
                      <FiChevronDown className={`jadwal-chevron ${logbookKategoriOpen ? 'open' : ''}`} />
                    </div>
                    {logbookKategoriOpen && (
                      <div className="jadwal-dropdown-menu">
                        {logbookKategoriOptions.map((opt, i) => (
                          <div
                            key={i}
                            className={`jadwal-dropdown-item ${logbookForm.kategori === opt ? 'selected' : ''}`}
                            onClick={() => {
                              setLogbookForm({ ...logbookForm, kategori: opt });
                              setLogbookKategoriOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="jadwal-form-group">
                  <label>Tanggal</label>
                  <input
                    type="date"
                    className="jadwal-input"
                    value={logbookForm.tanggal}
                    onChange={(e) => setLogbookForm({ ...logbookForm, tanggal: e.target.value })}
                  />
                </div>
              </div>

              {/* Judul Aktivitas */}
              <div className="jadwal-form-group">
                <label>Judul Aktivitas</label>
                <input
                  type="text"
                  className="jadwal-input"
                  placeholder="Penyusunan Topik Penelitian"
                  value={logbookForm.judul}
                  onChange={(e) => setLogbookForm({ ...logbookForm, judul: e.target.value })}
                />
              </div>

              {/* Detail Aktivitas */}
              <div className="jadwal-form-group">
                <label>Detail Aktivitas</label>
                <textarea
                  className="jadwal-input logbook-textarea"
                  rows="4"
                  placeholder="Contoh : Melakukan bimbingan dengan dosen terkait topik penelitian yang akan diangkat untuk penelitian"
                  value={logbookForm.detail}
                  onChange={(e) => setLogbookForm({ ...logbookForm, detail: e.target.value })}
                />
              </div>

              {/* Link (Opsional) */}
              <div className="jadwal-form-group">
                <label>Link (Opsional)</label>
                <div className="jadwal-input-with-icon">
                  <input
                    type="url"
                    className="jadwal-input"
                    placeholder="https://meet.google.com/..."
                    value={logbookForm.link}
                    onChange={(e) => setLogbookForm({ ...logbookForm, link: e.target.value })}
                  />
                  <FiLink className="jadwal-input-suffix" />
                </div>
              </div>

              {/* Dokumen Bukti */}
              <div className="jadwal-form-group">
                <label>Dokumen Bukti (Pdf/Jpg/Png)</label>
                <div className="logbook-file-upload">
                  <label className="logbook-file-btn" htmlFor="logbook-file-input">
                    Pilih File
                  </label>
                  <div className="logbook-file-name">
                    <FiImage className="logbook-file-icon" />
                    <span>{logbookForm.dokumenName || "Belum ada file dipilih"}</span>
                  </div>
                  <input
                    id="logbook-file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLogbookForm({ ...logbookForm, dokumen: file, dokumenName: file.name });
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              className="jadwal-submit-btn"
              onClick={handleLogbookSubmit}
            >
              + Tambah Logbook
            </button>
          </div>
        </div>
      )}

      {/* Logbook Success Animation */}
      {logbookSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-checkmark-wrapper">
              <svg className="success-circle" viewBox="0 0 120 120">
                <circle className="success-circle-bg" cx="60" cy="60" r="54" />
                <circle className="success-circle-progress" cx="60" cy="60" r="54" />
              </svg>
              <div className="success-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <p className="success-text">Data Berhasil Ditambahkan</p>
            <button
              className="success-btn"
              onClick={() => {
                setLogbookSuccess(false);
                setShowLogbookModal(false);
                setLogbookForm({ kategori: "Revisi / Pengerjaan Mandiri / Bimbingan", tanggal: "", judul: "", detail: "", link: "", dokumen: null, dokumenName: "" });
              }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal-box">
            <div className="delete-modal-icon-wrapper">
              {/* Red Trash Can SVG matching the image */}
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="35" width="50" height="50" rx="4" fill="#FEE2E2" />
                <path d="M20 30C20 27.2386 22.2386 25 25 25H75C77.7614 25 80 27.2386 80 30V35H20V30Z" fill="#EF4444" />
                <rect x="35" y="15" width="30" height="10" rx="2" fill="#EF4444" />
                <line x1="38" y1="45" x2="38" y2="75" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                <line x1="50" y1="45" x2="50" y2="75" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                <line x1="62" y1="45" x2="62" y2="75" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="delete-modal-text">Apakah Yakin Ingin Menghapus</p>
            <div className="delete-modal-actions">
              <button className="delete-btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Batal
              </button>
              <button
                className="delete-btn-confirm"
                onClick={() => {
                  if (deleteTarget.type === 'jadwal') {
                    setJadwalList(jadwalList.filter((_, i) => i !== deleteTarget.index));
                  } else if (deleteTarget.type === 'logbook') {
                    setLogbookList(logbookList.filter((_, i) => i !== deleteTarget.index));
                  }
                  setShowDeleteModal(false);
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
