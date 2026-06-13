import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch, FiBell, FiHelpCircle, FiPlus,
  FiCalendar, FiChevronDown, FiChevronUp, FiSliders,
  FiChevronLeft, FiChevronRight, FiCheckCircle, FiClock,
  FiClipboard, FiImage, FiEye, FiPaperclip, FiLink
} from "react-icons/fi";
import { getSession } from "../../services/authApi";
import "../../styles/logbook.css";
import UserAvatar from "../../assets/empty-profile.png";

const Logbook = () => {
  const session = getSession();
  const userEmail = session?.user?.email || "Khoiru Rizki Bani Adam";
  const storedName = localStorage.getItem("sigma_fullName");
  const displayName = storedName || (userEmail.includes('@') ? userEmail.split('@')[0] : userEmail);

  const [dateRange, setDateRange] = useState("");
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);

  // New entry form state
  const [modalDate, setModalDate] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDetail, setModalDetail] = useState("");
  const [modalLink, setModalLink] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // File upload state and ref
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  // Close status dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenStatusDropdown(null);
    if (openStatusDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openStatusDropdown]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleAddLogbook = () => {
    let formattedDate = modalDate;
    if (modalDate) {
      const d = new Date(modalDate);
      formattedDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      formattedDate = "Hari Ini";
    }

    const newEntry = {
      date: formattedDate,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
      title: modalTitle || "Aktivitas Baru",
      detail: modalDetail || "Detail aktivitas tidak tersedia...",
      linkText: selectedFileName || modalLink || "",
      linkType: selectedFileName ? "file" : (modalLink ? "link" : "none"),
      category: modalCategory || "Pengerjaan Mandiri",
      status: "Menunggu"
    };

    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    // reset form
    setModalCategory("");
    setModalDate("");
    setModalTitle("");
    setModalDetail("");
    setModalLink("");
    setSelectedFileName("");
  };

  return (
    <div className="dashboard-page">
      {/* Top Header */}
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

      {/* Page Content */}
      <div className="dash-content-container">
        <div className="logbook-header-section">
          <p className="page-subtitle">Pantau dan catat setiap langkah perkembangan skripsimu di sini.</p>
          <button
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '12px 28px', fontSize: '1.05rem', borderRadius: '10px' }}
          >
            <FiPlus /> Tambah Entri Baru
          </button>
        </div>

        {/* Stats Cards */}
        <div className="logbook-stats-bar">
          <div className="stat-section">
            <div className="stat-icon-wrapper blue">
              <FiClipboard className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">TOTAL ENTRI</span>
              <span className="stat-value">{entries.length} Entri</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-section">
            <div className="stat-icon-wrapper green">
              <FiCheckCircle className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">DISETUJUI</span>
              <span className="stat-value">{entries.filter(e => e.status === "Disetujui").length} Entri</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-section">
            <div className="stat-icon-wrapper red">
              <FiClock className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-label">MENUNGGU</span>
              <span className="stat-value">{entries.filter(e => e.status === "Menunggu").length} Entri</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <label>Rentang Tanggal</label>
            <div className="input-with-icon">
              <FiCalendar className="icon-left" />
              <input
                type="text"
                placeholder="Semua Waktu"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="filter-input with-left-icon"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Kategori Aktivitas</label>
            <div className="custom-dropdown-container">
              <div
                className={`custom-dropdown-header ${isCategoryOpen ? 'active' : ''}`}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>{category || 'Semua Kategori'}</span>
                <FiChevronDown />
              </div>
              {isCategoryOpen && (
                <div className="custom-dropdown-menu">
                  {['Semua Kategori', 'Revisi', 'Pengerjaan Mandiri', 'Bimbingan'].map((opt, i) => (
                    <div
                      key={i}
                      className={`custom-dropdown-item ${category === opt ? 'selected' : ''}`}
                      onClick={() => { setCategory(opt); setIsCategoryOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-group filter-action">
            <button className="btn-outline-filter">
              <FiSliders /> Terapkan Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="logbook-table">
            <thead>
              <tr>
                <th>Tanggal & Waktu</th>
                <th>Aktivitas & Detail</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state-row">
                    Belum Ada Logbook Yang Ditambahkan
                  </td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="date-text">{entry.date}</div>
                      <div className="time-text">{entry.time}</div>
                    </td>
                    <td>
                      <div className="activity-title">{entry.title}</div>
                      <div className="activity-desc">{entry.detail}</div>
                      {entry.linkText && (
                        <div className="activity-link">
                          {entry.linkType === 'file' ? <FiPaperclip /> : <FiLink />} {entry.linkText}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`category-badge ${entry.category.toLowerCase().replace(/ /g, '-')}`}>
                        {entry.category}
                      </span>
                    </td>
                    <td>
                      <div className="status-dropdown-container" style={{ position: 'relative' }}>
                        <div
                          className={`status-badge ${entry.status.toLowerCase().replace(/ /g, '-')}`}
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenStatusDropdown(openStatusDropdown === idx ? null : idx);
                          }}
                        >
                          <span className="status-dot"></span>
                          {entry.status}
                          <FiChevronDown size={14} style={{ marginLeft: '4px' }} />
                        </div>

                        {openStatusDropdown === idx && (
                          <div className="status-dropdown-menu" style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '8px',
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            zIndex: 10,
                            minWidth: '140px',
                            overflow: 'hidden'
                          }}>
                            {['Menunggu', 'Perlu Revisi', 'Disetujui'].map(statusOpt => (
                              <div
                                key={statusOpt}
                                style={{
                                  padding: '10px 16px',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  backgroundColor: entry.status === statusOpt ? '#f8fafc' : 'transparent',
                                  borderBottom: '1px solid #f1f5f9',
                                  fontWeight: 500,
                                  color: '#334155'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = entry.status === statusOpt ? '#f8fafc' : 'transparent'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newEntries = [...entries];
                                  newEntries[idx].status = statusOpt;
                                  setEntries(newEntries);
                                  setOpenStatusDropdown(null);
                                }}
                              >
                                <span className={`status-dot`} style={{
                                  backgroundColor: statusOpt === 'Disetujui' ? '#16a34a' : (statusOpt === 'Menunggu' ? '#ca8a04' : '#dc2626')
                                }}></span>
                                {statusOpt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <button className="action-btn view-btn">
                        <FiEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="pagination-wrapper">
            <span className="pagination-info">Menampilkan 4 dari 24 entri</span>
            <div className="pagination-controls">
              <button className="page-btn"><FiChevronLeft /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <button className="page-btn"><FiChevronRight /></button>
            </div>
          </div>
        </div>

      </div>

      {/* Logbook Modal */}
      {isModalOpen && (
        <div className="logbook-modal-overlay">
          <div className="logbook-modal-container">
            <div className="logbook-modal-header">
              <h2>Logbook Digital</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className="logbook-modal-body">
              <div className="form-row">
                <div className="form-group half">
                  <label>Kategori</label>
                  <div className="custom-dropdown-container">
                    <div
                      className={`custom-dropdown-header ${isModalCategoryOpen ? 'active' : ''}`}
                      onClick={() => setIsModalCategoryOpen(!isModalCategoryOpen)}
                    >
                      <span>{modalCategory || 'Revisi / Pengerjaan Mandiri / Bimbingan'}</span>
                      {isModalCategoryOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                    {isModalCategoryOpen && (
                      <div className="custom-dropdown-menu">
                        {['Revisi', 'Pengerjaan Mandiri', 'Bimbingan'].map((opt, i) => (
                          <div
                            key={i}
                            className={`custom-dropdown-item ${modalCategory === opt ? 'selected' : ''}`}
                            onClick={() => { setModalCategory(opt); setIsModalCategoryOpen(false); }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group half">
                  <label>Tanggal</label>
                  <input type="date" className="logbook-input" value={modalDate} onChange={(e) => setModalDate(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Judul Aktivitas</label>
                <input type="text" className="logbook-input" placeholder="Penyusunan Topik Penelitian" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Detail Aktivitas</label>
                <textarea
                  className="logbook-textarea"
                  placeholder="Contoh : Melakukan bimbingan dengan dosen terkait topik penelitian yang akan diangkat untuk penelitian"
                  rows="3"
                  value={modalDetail}
                  onChange={(e) => setModalDetail(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Link (Opsional)</label>
                <div className="input-with-icon-right">
                  <input type="text" className="logbook-input" placeholder="https://meet.google.com/nqq-sqyc-qug?authuser=0" value={modalLink} onChange={(e) => setModalLink(e.target.value)} />
                  <span className="icon-right link-icon">🔗</span>
                </div>
              </div>

              <div className="form-group">
                <label>Dokumen Bukti (Pdf/Jpg/Png)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <button
                    className="btn-upload"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Pilih File
                  </button>
                  <div className="file-name-display">
                    <FiImage className="image-icon" />
                    {selectedFileName || "Belum ada file dipilih"}
                  </div>
                </div>
              </div>

              <button className="btn-submit-modal" onClick={handleAddLogbook}>
                <FiPlus /> Tambah Logbook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {isSuccessModalOpen && (
        <div className="logbook-success-overlay" onClick={() => setIsSuccessModalOpen(false)}>
          <div className="logbook-success-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="animated-circle" cx="28" cy="28" r="24" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path className="animated-check" d="M18 28L25 35L38 20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>Data Berhasil Ditambahkan</h3>
            <button
              className="btn-primary w-100"
              style={{ padding: '14px', fontSize: '1rem', fontWeight: '600', borderRadius: '12px' }}
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logbook;
