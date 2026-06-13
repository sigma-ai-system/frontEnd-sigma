import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiUsers,
  FiZap,
  FiPlus,
  FiEye,
  FiMapPin,
  FiVideo,
  FiArrowUpRight,
  FiBell,
  FiHelpCircle,
  FiSearch,
  FiMessageSquare,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiLink,
  FiCheckCircle,
  FiArrowLeft,
  FiFileText,
  FiUploadCloud,
  FiLock,
  FiSend,
  FiMoreHorizontal,
  FiActivity,
  FiInfo
} from "react-icons/fi";
import { TbLayoutDashboard } from "react-icons/tb";
import { getSession } from "../../services/authApi";

import "../../styles/bimbingan.css";
import UserAvatar from "../../assets/empty-profile.png";

const Bimbingan = () => {
  const session = getSession();
  const userEmail = session?.user?.email || "Khoiru Rizki Bani Adam";
  const storedName = localStorage.getItem("sigma_fullName");
  const displayName = storedName || (userEmail.includes('@') ? userEmail.split('@')[0] : userEmail);
  const storedDosen = localStorage.getItem("sigma_dosenPembimbing") || "Dr. Ahmad Fauzi, M.T.";

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showJenisDropdown, setShowJenisDropdown] = useState(false);
  const [selectedJenis, setSelectedJenis] = useState("Revisi / Progress / Sidang");
  const [showTempatDropdown, setShowTempatDropdown] = useState(false);
  const [selectedTempat, setSelectedTempat] = useState("Pilih Tempat");

  // Jadwal States
  const [showJadwalPage, setShowJadwalPage] = useState(false);

  // Kendala States
  const [showKendalaPage, setShowKendalaPage] = useState(false);
  const [kendalaKategori, setKendalaKategori] = useState("Responsivitas");
  const [kendalaUrgensi, setKendalaUrgensi] = useState("Sedang");
  const [kendalaFile, setKendalaFile] = useState(null);
  const fileInputRef = useRef(null);
  const [kendalaDeskripsi, setKendalaDeskripsi] = useState("");
  const [kendalaHistory, setKendalaHistory] = useState([
    {
      id: 1,
      status: "DIPROSES",
      date: "Kemarin, 14:20",
      title: "Jadwal Bimbingan Sering Berubah",
      quote: "\"*Pembimbing membatalkan pertemuan 3 kali...*\"",
      footer: "Menunggu verifikasi admin...",
      response: null
    },
    {
      id: 2,
      status: "SELESAI",
      date: "12 Okt 2023",
      title: "Dosen Tidak Membalas Email",
      quote: "\"*Sudah mengirimkan revisi bab 3 sejak 2 minggu lalu namun belum ada respon...*\"",
      footer: null,
      response: {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Kaprodi",
        text: "Dosen terkait telah kami hubungi dan diarahkan untuk segera memberikan feedback. Silakan cek kembali dalam 2x24 jam."
      }
    }
  ]);

  const handleSubmitKendala = () => {
    if (!kendalaDeskripsi) return;

    const newReport = {
      id: Date.now(),
      status: "DIPROSES",
      date: "Hari ini, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Kendala: ${kendalaKategori}`,
      quote: `"*${kendalaDeskripsi.substring(0, 50)}${kendalaDeskripsi.length > 50 ? '...' : ''}*"`,
      footer: "Menunggu verifikasi admin...",
      response: null
    };

    setKendalaHistory([newReport, ...kendalaHistory]);

    // Reset form
    setKendalaDeskripsi("");
    setKendalaKategori("Responsivitas");
    setKendalaUrgensi("Sedang");
    setKendalaFile(null);

    setShowSuccessModal(true);
  };

  // Form field states
  const [formNama, setFormNama] = useState("");
  const [formTanggal, setFormTanggal] = useState("");
  const [formJam, setFormJam] = useState("");
  const [formLink, setFormLink] = useState("");

  // Sessions list for Sesi Mendatang
  const [sessions, setSessions] = useState([]);

  const handleAddSubmit = () => {
    const formatTanggal = (dateStr) => {
      if (!dateStr) return "TBD";
      const d = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${d.getDate()} ${months[d.getMonth()]}`;
    };

    const formatJam = (timeStr) => {
      if (!timeStr) return "--:--";
      const [h, m] = timeStr.split(':');
      const hour = parseInt(h);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${String(displayHour).padStart(2, '0')}:${m} ${ampm}`;
    };

    const newSession = {
      id: Date.now(),
      nama: formNama || "Bimbingan Baru",
      tanggal: formatTanggal(formTanggal),
      jam: formatJam(formJam),
      tempat: selectedTempat !== "Pilih Tempat" ? selectedTempat : "",
      link: formLink,
      jenis: selectedJenis,
    };

    setSessions([newSession, ...sessions]);

    // Reset form
    setFormNama("");
    setFormTanggal("");
    setFormJam("");
    setFormLink("");
    setSelectedJenis("Revisi / Progress / Sidang");
    setSelectedTempat("Pilih Tempat");

    setShowAddModal(false);
    setShowSuccessModal(true);
  };

  const [history] = useState([]);

  return (
    <div className="dashboard-container">
      {/* Header Profile / Topbar */}
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

      {/* Main Content */}
      {showJadwalPage ? (
        <div className="dash-content-container jadwal-page">
          <div className="jadwal-header-section">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <button className="btn-back-kendala" onClick={() => setShowJadwalPage(false)}>
                  <FiArrowLeft />
                </button>
                <h1 className="bimbingan-title" style={{ margin: 0 }}>Jadwal Bimbingan</h1>
              </div>
              <p className="bimbingan-subtitle">
                Kelola dan jadwalkan sesi konsultasi penelitian Anda
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ borderRadius: '10px', padding: '12px 20px', fontSize: '0.95rem', background: 'linear-gradient(90deg, #005a8c 0%, #007946 100%)', border: 'none', color: '#fff' }}
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus /> Ajukan Slot Waktu
            </button>
          </div>

          <div className="jadwal-grid">
            <div className="jadwal-main-col">
              <div className="jadwal-card">
                <div className="jadwal-card-header">
                  <h2>Kalender Ketersediaan</h2>
                  <div className="month-pills">
                    <button className="month-pill active">Mei 2024</button>
                    <button className="month-pill">Juni 2024</button>
                  </div>
                  <div className="calendar-nav">
                    <button className="btn-cal-nav">&lt;</button>
                    <button className="btn-cal-nav">&gt;</button>
                  </div>
                </div>

                <div className="calendar-grid">
                  <div className="cal-head">Min</div>
                  <div className="cal-head">Sen</div>
                  <div className="cal-head">Sel</div>
                  <div className="cal-head">Rab</div>
                  <div className="cal-head">Kam</div>
                  <div className="cal-head">Jum</div>
                  <div className="cal-head">Sab</div>

                  <div className="cal-cell empty">28</div>
                  <div className="cal-cell empty">29</div>
                  <div className="cal-cell empty">30</div>
                  <div className="cal-cell">1</div>
                  <div className="cal-cell">2</div>
                  <div className="cal-cell">3</div>
                  <div className="cal-cell">4</div>

                  <div className="cal-cell slot-tersedia">
                    15
                    <span className="dot-tersedia-inner"></span>
                  </div>
                  <div className="cal-cell slot-terpilih">
                    16
                    <span className="hari-ini-text">HARI INI</span>
                  </div>
                  <div className="cal-cell slot-tersedia">
                    17
                    <span className="dot-tersedia-inner"></span>
                  </div>
                  <div className="cal-cell">18</div>
                  <div className="cal-cell">19</div>
                  <div className="cal-cell">20</div>
                  <div className="cal-cell">21</div>

                  <div className="cal-cell">22</div>
                  <div className="cal-cell">23</div>
                  <div className="cal-cell">24</div>
                  <div className="cal-cell">25</div>
                  <div className="cal-cell">26</div>
                  <div className="cal-cell">27</div>
                  <div className="cal-cell">28</div>

                  <div className="cal-cell">29</div>
                  <div className="cal-cell">30</div>
                  <div className="cal-cell">31</div>
                  <div className="cal-cell empty"></div>
                  <div className="cal-cell empty"></div>
                  <div className="cal-cell empty"></div>
                  <div className="cal-cell empty"></div>
                </div>

                <div className="cal-legend">
                  <div className="legend-item"><span className="dot-legend dot-tersedia"></span> Slot Tersedia</div>
                  <div className="legend-item"><span className="dot-legend dot-terpilih"></span> Terpilih</div>
                  <div className="legend-item"><span className="dot-legend dot-tidak-ada"></span> Tidak Ada Slot</div>
                </div>
              </div>

              <div className="slots-row">
                <div className="slot-card">
                  <div className="slot-time green">PAGI • 09:00 - 10:00</div>
                  <h4 className="slot-title">Konsultasi Bab IV</h4>
                  <div className="slot-dosen">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dosen" />
                    <span>Dr. Arini Sulistyowati</span>
                  </div>
                  <button className="btn-pilih-slot">Pilih Slot Ini</button>
                </div>

                <div className="slot-card">
                  <div className="slot-time green">SIANG • 13:30 - 14:30</div>
                  <h4 className="slot-title">Review Metodologi</h4>
                  <div className="slot-dosen">
                    <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="Dosen" />
                    <span>Prof. Hendra Wijaya</span>
                  </div>
                  <button className="btn-pilih-slot">Pilih Slot Ini</button>
                </div>

                <div className="slot-card disabled">
                  <div className="slot-time gray">SORE • 15:00 - 16:00</div>
                  <h4 className="slot-title">Diskusi Hasil</h4>
                  <div className="slot-dosen">
                    <div className="dosen-avatar-placeholder"></div>
                    <span>Dr. Arini Sulistyowati</span>
                  </div>
                  <button className="btn-pilih-slot disabled" disabled>Sudah Penuh</button>
                </div>
              </div>

              <div className="jadwal-stats-row">
                <div className="jadwal-stat-card">
                  <div className="stat-icon-wrapper blue"><FiCalendar /></div>
                  <div className="stat-info">
                    <p>TOTAL BIMBINGAN</p>
                    <h3>24 Sesi</h3>
                  </div>
                </div>
                <div className="jadwal-stat-card">
                  <div className="stat-icon-wrapper green"><FiClock /></div>
                  <div className="stat-info">
                    <p>WAKTU KONSULTASI</p>
                    <h3>36 Jam</h3>
                  </div>
                </div>
                <div className="jadwal-stat-card">
                  <div className="stat-icon-wrapper blue-light"><FiActivity /></div>
                  <div className="stat-info">
                    <p>RATA-RATA RESPON</p>
                    <h3>1.2 Hari</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="jadwal-right-col">
              <div className="jadwal-side-card">
                <h3 className="side-card-title-plain">Filter Bimbingan</h3>
                <div className="filter-group">
                  <label className="filter-label">Dosen Pembimbing</label>
                  <div className="bimb-form-control filter-select">
                    Semua Dosen <FiChevronDown />
                  </div>
                </div>
                <div className="filter-pills">
                  <button className="filter-pill active">Semua Status</button>
                  <button className="filter-pill">Disetujui</button>
                  <button className="filter-pill">Menunggu</button>
                </div>
              </div>

              <div className="jadwal-side-card">
                <div className="side-card-header">
                  <h3 className="side-card-title-plain">Sesi Mendatang</h3>
                  <span className="badge-aktif">3 Aktif</span>
                </div>
                <div className="sesi-list">
                  <div className="sesi-item">
                    <div className="sesi-item-header">
                      <span className="sesi-date">18 Mei • 10:00 WIB</span>
                      <span className="badge-disetujui">DISETUJUI</span>
                    </div>
                    <h4 className="sesi-title">Penyusunan Bab V: Kesimpulan</h4>
                    <div className="sesi-dosen">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dosen" />
                      <span>Dr. Arini Sulistyowati</span>
                    </div>
                    <div className="sesi-action">
                      <Link to="#" className="link-rincian">Rincian</Link>
                    </div>
                  </div>

                  <div className="sesi-item">
                    <div className="sesi-item-header">
                      <span className="sesi-date">22 Mei • 14:00 WIB</span>
                      <span className="badge-menunggu">MENUNGGU</span>
                    </div>
                    <h4 className="sesi-title">Revisi Kerangka Teori</h4>
                    <div className="sesi-dosen">
                      <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="Dosen" />
                      <span>Prof. Hendra Wijaya</span>
                    </div>
                    <div className="sesi-action">
                      <Link to="#" className="link-batalkan">Batalkan</Link>
                    </div>
                  </div>

                  <div className="sesi-item rejected">
                    <div className="sesi-item-header">
                      <span className="sesi-date">15 Mei • 09:00 WIB</span>
                      <span className="badge-ditolak">DITOLAK</span>
                    </div>
                    <h4 className="sesi-title">Analisis Data Sekunder</h4>
                    <p className="sesi-reason">Alasan: Bentrok dengan rapat Senat.</p>
                    <button className="btn-jadwal-ulang">Jadwal Ulang</button>
                  </div>
                </div>
                <button className="btn-riwayat-lengkap">Lihat Riwayat Lengkap</button>
              </div>
            </div>
          </div>
        </div>
      ) : showKendalaPage ? (
        <div className="dash-content-container kendala-page">
          <div className="kendala-header-section">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <button className="btn-back-kendala" onClick={() => setShowKendalaPage(false)}>
                  <FiArrowLeft />
                </button>
                <h1 className="bimbingan-title" style={{ margin: 0 }}>Lapor Kendala Bimbingan</h1>
              </div>
              <p className="bimbingan-subtitle">
                Kami memahami pentingnya komunikasi yang lancar dalam penyelesaian skripsi.
                Laporkan kendala administratif atau komunikatif dengan dosen pembimbing Anda di sini.
              </p>
            </div>
          </div>

          <div className="kendala-grid">
            <div className="kendala-main-col">
              <div className="kendala-card">
                <div className="kendala-card-header">
                  <div className="kendala-card-icon"><FiFileText /></div>
                  <h2>Formulir Laporan</h2>
                </div>

                <div className="kendala-form-group">
                  <label>Kategori Kendala</label>
                  <div className="kendala-pills-row">
                    <button
                      className={`kendala-pill ${kendalaKategori === 'Responsivitas' ? 'active' : ''}`}
                      onClick={() => setKendalaKategori('Responsivitas')}
                    >
                      <FiClock /> Responsivitas
                    </button>
                    <button
                      className={`kendala-pill ${kendalaKategori === 'Komunikasi' ? 'active' : ''}`}
                      onClick={() => setKendalaKategori('Komunikasi')}
                    >
                      <FiMessageSquare /> Komunikasi
                    </button>
                    <button
                      className={`kendala-pill ${kendalaKategori === 'Ketersediaan Waktu' ? 'active' : ''}`}
                      onClick={() => setKendalaKategori('Ketersediaan Waktu')}
                    >
                      <FiCalendar /> Ketersediaan Waktu
                    </button>
                    <button
                      className={`kendala-pill ${kendalaKategori === 'Lainnya' ? 'active' : ''}`}
                      onClick={() => setKendalaKategori('Lainnya')}
                    >
                      <FiMoreHorizontal /> Lainnya
                    </button>
                  </div>
                </div>

                <div className="kendala-form-group">
                  <label>Tingkat Urgensi</label>
                  <div className="kendala-pills-row urgensi-row">
                    <button
                      className={`kendala-pill urgensi ${kendalaUrgensi === 'Rendah' ? 'active' : ''}`}
                      onClick={() => setKendalaUrgensi('Rendah')}
                    >
                      <span className="dot dot-green"></span> Rendah
                    </button>
                    <button
                      className={`kendala-pill urgensi ${kendalaUrgensi === 'Sedang' ? 'active' : ''}`}
                      onClick={() => setKendalaUrgensi('Sedang')}
                    >
                      <span className="dot dot-blue"></span> Sedang
                    </button>
                    <button
                      className={`kendala-pill urgensi ${kendalaUrgensi === 'Tinggi' ? 'active' : ''}`}
                      onClick={() => setKendalaUrgensi('Tinggi')}
                    >
                      <span className="dot dot-red"></span> Tinggi
                    </button>
                  </div>
                </div>

                <div className="kendala-form-group">
                  <label>Deskripsi Detail Kendala</label>
                  <textarea
                    className="kendala-textarea"
                    placeholder="Ceritakan detail kendala yang Anda alami secara objektif..."
                    rows="5"
                    value={kendalaDeskripsi}
                    onChange={(e) => setKendalaDeskripsi(e.target.value)}
                  ></textarea>
                </div>

                <div className="kendala-form-group">
                  <label>Unggah Bukti Pendukung</label>
                  <div className="kendala-upload-zone" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setKendalaFile(e.target.files[0]);
                        }
                      }}
                    />
                    {kendalaFile ? (
                      <div className="upload-file-info">
                        <FiCheckCircle className="upload-icon" style={{ color: '#10b981' }} />
                        <p className="upload-title" style={{ color: '#10b981' }}>{kendalaFile.name}</p>
                        <p className="upload-subtitle">{(kendalaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <>
                        <FiUploadCloud className="upload-icon" />
                        <p className="upload-title">Klik untuk unggah atau seret file ke sini</p>
                        <p className="upload-subtitle">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="kendala-alert">
                  <FiLock className="alert-icon" />
                  <div className="alert-text">
                    <h4>Kerahasiaan Terjamin</h4>
                    <p>Laporan ini bersifat privat dan hanya dapat diakses oleh Kaprodi dan Admin SIGMA untuk ditindaklanjuti. Identitas Anda akan dilindungi.</p>
                  </div>
                </div>

                <button className="btn-kendala-submit" onClick={handleSubmitKendala}>
                  <FiSend style={{ marginRight: '8px' }} /> Kirim Laporan Kendala
                </button>
              </div>
            </div>

            <div className="kendala-right-col">
              {/* Status Laporan */}
              <div className="kendala-side-card">
                <div className="side-card-header">
                  <div>
                    <h3>Status Laporan</h3>
                    <p>Bulan Oktober 2023</p>
                  </div>
                  <div className="side-card-icon-bg"><FiActivity /></div>
                </div>
                <div className="status-laporan-content">
                  <div className="status-circle-wrapper">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className="circle"
                        strokeDasharray="45, 100"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="percentage">45%</text>
                    </svg>
                  </div>
                  <div className="status-text">
                    <div className="status-value">1 <span>Aktif</span></div>
                    <p>Laporan dalam tahap peninjauan oleh Kaprodi</p>
                  </div>
                </div>
              </div>

              {/* Riwayat Laporan */}
              <div className="kendala-side-card">
                <div className="side-card-header riwayat-header">
                  <h3>Riwayat Laporan</h3>
                  <Link to="#" className="link-semua">Lihat Semua</Link>
                </div>
                <div className="riwayat-list">
                  {kendalaHistory.map((item) => (
                    <div className="riwayat-item" key={item.id}>
                      <div className="riwayat-item-header">
                        <span className={item.status === "SELESAI" ? "badge-selesai" : "badge-diproses"}>{item.status}</span>
                        <span className="riwayat-date">{item.date}</span>
                      </div>
                      <h4 className="riwayat-title">{item.title}</h4>
                      <p className="riwayat-quote">{item.quote}</p>

                      {item.response && (
                        <div className="riwayat-response">
                          <img src={item.response.avatar} alt={item.response.name} className="response-avatar" />
                          <div className="response-content">
                            <h5>{item.response.name}</h5>
                            <p>{item.response.text}</p>
                          </div>
                        </div>
                      )}

                      {item.footer && (
                        <div className="riwayat-footer">
                          <FiClock /> {item.footer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Etika Berkomunikasi */}
              <div className="kendala-info-card">
                <div className="info-card-header">
                  <FiInfo className="info-icon" />
                  <h3>Etika Berkomunikasi</h3>
                </div>
                <ul className="info-list">
                  <li>
                    <span className="info-number">1</span>
                    <p>Hubungi dosen pada jam kerja (08.00 - 16.00) dan hindari hari libur.</p>
                  </li>
                  <li>
                    <span className="info-number">2</span>
                    <p>Gunakan kalimat yang sopan, sebutkan identitas lengkap dan tujuan Anda.</p>
                  </li>
                  <li>
                    <span className="info-number">3</span>
                    <p>Beri waktu minimal 3 hari kerja untuk respon sebelum mengirim follow-up.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dash-content-container bimbingan-page">
          <div className="bimbingan-header-section">
            <div>
              <h1 className="bimbingan-title">Bimbingan Akademik</h1>
              <p className="bimbingan-subtitle">
                Pantau jadwal bimbingan, kelola catatan revisi dari dosen pembimbing, dan ajukan sesi
                konsultasi baru untuk mempercepat penyelesaian tugas akhir Anda.
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ borderRadius: '10px', padding: '12px 20px', fontSize: '0.95rem', background: 'linear-gradient(90deg, #005a8c 0%, #007946 100%)', border: 'none', color: '#fff' }}
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus /> Ajukan Bimbingan Baru
            </button>
          </div>

          <div className="bimbingan-dashboard-grid">
            {/* Left Column (Stats + Dosen + History) */}
            <div className="main-col">
              {/* Stats */}
              <div className="bimbingan-stats-row">
                <div className="bimb-stat-card green">
                  <div className="bimb-stat-icon-wrapper">
                    <FiCalendar />
                  </div>
                  <div className="bimb-stat-info">
                    <h3>0x</h3>
                    <p>Sesi Bimbingan Bulan Ini</p>
                  </div>
                </div>
                <div className="bimb-stat-card blue">
                  <div className="bimb-stat-icon-wrapper">
                    <FiUsers />
                  </div>
                  <div className="bimb-stat-info">
                    <h3>0</h3>
                    <p>Total Bimbingan</p>
                  </div>
                </div>
                <div className="bimb-stat-card gray">
                  <div className="bimb-stat-icon-wrapper">
                    <FiZap />
                  </div>
                  <div className="bimb-stat-info">
                    <h3>0%</h3>
                    <p>Dosen Responsif</p>
                    <div className="stat-desc">Rata-rata respons &lt; 24 jam</div>
                  </div>
                </div>
              </div>

              {/* Dosen Cards */}
              <div className="dosen-cards-row">
                <div className="dosen-card">
                  <div className="dosen-card-top">
                    <img src={UserAvatar} alt={storedDosen} className="dosen-img" />
                    <div className="dosen-badge tersedia">Tersedia</div>
                  </div>
                  <div className="dosen-info">
                    <h4 style={{ textTransform: 'capitalize' }}>{storedDosen}</h4>
                    <p>Pembimbing Utama</p>
                  </div>
                  <div className="dosen-actions">
                    <button className="btn-dosen-action btn-kendala" onClick={() => setShowKendalaPage(true)}>Kendala</button>
                    <button className="btn-dosen-action btn-jadwal" onClick={() => setShowJadwalPage(true)}><FiMessageSquare style={{ marginRight: '6px' }} /> Jadwal Bimbingan</button>
                  </div>
                </div>
              </div>

              {/* History Table */}
              <div className="history-section">
                <div className="history-header">
                  <h3>Riwayat Bimbingan</h3>
                  <Link to="#" className="link-semua">Lihat Semua</Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>TANGGAL</th>
                        <th>DOSEN</th>
                        <th>TOPIK</th>
                        <th>STATUS</th>
                        <th>AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                            Belum Ada Riwayat Bimbingan
                          </td>
                        </tr>
                      ) : (
                        history.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span style={{ display: 'block', fontSize: '0.9rem', color: '#334155' }}>
                                {item.tanggal.split(' ')[0]} {item.tanggal.split(' ')[1]}
                              </span>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.tanggal.split(' ')[2]}</span>
                            </td>
                            <td>{item.dosen}</td>
                            <td>{item.topik}</td>
                            <td>
                              <span className={`status-badge-hist ${item.status.toLowerCase()}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              {item.status === 'Selesai' ? (
                                <FiEye className="action-eye" />
                              ) : (
                                <span className="action-none">Tidak tersedia</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination (Simplified to match image) */}
                <div className="pagination-wrapper" style={{ padding: '16px 24px', background: '#fff' }}>
                  <div className="pagination-info">Menampilkan {history.length > 0 ? history.length : 0} dari {history.length > 0 ? 24 : 0} entri</div>
                  <div className="pagination-controls">
                    <button className="page-btn">&lt;</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">4</button>
                    <button className="page-btn">&gt;</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar Panels) */}
            <div className="right-sidebar">
              <div className="sidebar-panel">
                <h3><FiCalendar /> Sesi Mendatang</h3>
                <div className="timeline-list">
                  {sessions.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
                      Belum ada sesi mendatang
                    </p>
                  ) : (
                    sessions.map((sesi, idx) => (
                      <div className={`timeline-item ${idx === 0 ? 'active' : ''}`} key={sesi.id}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                          <div className="time-header">
                            <span className={`time-badge ${idx === 0 ? 'besok' : 'date'}`}>{sesi.tanggal}</span>
                            <span className="time-text-sm">{sesi.jam}</span>
                          </div>
                          <h4 className="timeline-title">{sesi.nama}</h4>
                          {sesi.tempat && (
                            <div className="timeline-loc">
                              {sesi.tempat === 'Online' ? <FiVideo /> : <FiMapPin />} {sesi.tempat}
                            </div>
                          )}
                          {sesi.link && (
                            <a href={sesi.link} target="_blank" rel="noopener noreferrer" className="btn-zoom">
                              Join Meeting <FiArrowUpRight />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="sidebar-panel">
                <div className="progress-header">
                  <span>Progres Keseluruhan</span>
                  <span>0%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                </div>
                <p className="progress-note">"Belum ada progres yang tercatat. Selesaikan milestone untuk memulai!"</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal Tambah Jadwal Bimbingan */}
      {showAddModal && (
        <div className="bimb-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="bimb-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bimb-modal-header">
              <h2>Tambah Jadwal Bimbingan</h2>
              <button className="bimb-modal-close" onClick={() => setShowAddModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="bimb-form-group">
              <label>Jenis Bimbingan</label>
              <div className="bimb-custom-select" onClick={() => setShowJenisDropdown(!showJenisDropdown)}>
                <div className={`bimb-form-control bimb-select-trigger ${showJenisDropdown ? 'active' : ''}`}>
                  <span>{selectedJenis}</span>
                  {showJenisDropdown ? <FiChevronUp className="bimb-input-icon" /> : <FiChevronDown className="bimb-input-icon" />}
                </div>
                {showJenisDropdown && (
                  <div className="bimb-select-menu">
                    <div className="bimb-select-option" onClick={() => { setSelectedJenis("Revisi"); setShowJenisDropdown(false); }}>Revisi</div>
                    <div className="bimb-select-option" onClick={() => { setSelectedJenis("Progress"); setShowJenisDropdown(false); }}>Progress</div>
                    <div className="bimb-select-option" onClick={() => { setSelectedJenis("Sidang"); setShowJenisDropdown(false); }}>Sidang</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bimb-form-group">
              <label>Nama</label>
              <input type="text" className="bimb-form-control" placeholder="Contoh: Bimbingan Bab IV" value={formNama} onChange={(e) => setFormNama(e.target.value)} />
            </div>

            <div className="bimb-form-row-3">
              <div className="bimb-form-group" style={{ marginBottom: 0 }}>
                <label>Tempat</label>
                <div className="bimb-custom-select" onClick={() => setShowTempatDropdown(!showTempatDropdown)}>
                  <div className={`bimb-form-control bimb-select-trigger ${showTempatDropdown ? 'active' : ''}`}>
                    <span style={{ color: selectedTempat === "Pilih Tempat" ? '#94a3b8' : 'inherit' }}>{selectedTempat}</span>
                    {showTempatDropdown ? <FiChevronUp className="bimb-input-icon" /> : <FiChevronDown className="bimb-input-icon" />}
                  </div>
                  {showTempatDropdown && (
                    <div className="bimb-select-menu">
                      <div className="bimb-select-option" onClick={() => { setSelectedTempat("Kampus"); setShowTempatDropdown(false); }}>Kampus</div>
                      <div className="bimb-select-option" onClick={() => { setSelectedTempat("Online"); setShowTempatDropdown(false); }}>Online</div>
                      <div className="bimb-select-option" onClick={() => { setSelectedTempat("Lainnya"); setShowTempatDropdown(false); }}>Lainnya</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bimb-form-group" style={{ marginBottom: 0 }}>
                <label>Tanggal</label>
                <input type="date" className="bimb-form-control" value={formTanggal} onChange={(e) => setFormTanggal(e.target.value)} />
              </div>
              <div className="bimb-form-group" style={{ marginBottom: 0 }}>
                <label>Jam</label>
                <input type="time" className="bimb-form-control" value={formJam} onChange={(e) => setFormJam(e.target.value)} />
              </div>
            </div>

            <div className="bimb-form-group">
              <label>Link (Opsional)</label>
              <div className="bimb-input-icon-wrapper">
                <input type="text" className="bimb-form-control" placeholder="https://meet.google.com/nqq-sqyc-qug?authuser=0" value={formLink} onChange={(e) => setFormLink(e.target.value)} />
                <FiLink className="bimb-input-icon" />
              </div>
            </div>

            <button className="btn-bimb-submit" onClick={handleAddSubmit}>
              <FiPlus /> Tambah Akun
            </button>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {showSuccessModal && (
        <div className="bimb-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="bimb-success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bimb-success-icon-wrapper">
              <div className="bimb-success-icon-circle">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="bimb-animated-circle" cx="28" cy="28" r="24" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path className="bimb-animated-check" d="M18 28L25 35L38 20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h3>Data Berhasil Ditambahkan</h3>
            <button className="btn-bimb-submit" onClick={() => setShowSuccessModal(false)}>
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bimbingan;
