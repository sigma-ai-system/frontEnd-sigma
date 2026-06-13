import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell, FiHelpCircle, FiCheckCircle, FiCheck, FiBook, FiClock, FiActivity, FiFileText, FiMoreHorizontal, FiLock, FiChevronRight, FiChevronDown, FiUser, FiPlusCircle, FiPlus, FiX, FiCalendar, FiImage } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import UserAvatar from "../../assets/avatar-dashboard.svg";
import ProfileAvatar from "../../assets/empty-profile.png";
import { getSession } from "../../services/authApi";
import "../../styles/progress-skripsi.css";

const ProgressSkripsi = () => {
  const session = getSession();
  const userEmail = session?.user?.email || "Khoiru Rizki Bani Adam";
  const storedName = localStorage.getItem("sigma_fullName");
  const displayName = storedName || (userEmail.includes('@') ? userEmail.split('@')[0] : userEmail);
  const storedDosen = localStorage.getItem("sigma_dosenPembimbing") || "Dr. Ahmad Fauzi, M.T.";
  const storedJudul = localStorage.getItem("sigma_judulPenelitian") || "Pengembangan Website Sigma Sebagai Klasifikasi Resiko Keterlambatan Skripsi Mahasiswa menggunakan Decision Tree";

  const [rencanaLulusDate] = useState(() => {
    return localStorage.getItem("sigma_rencanaLulusDate") || "";
  });

  const getEstimasiWaktu = (targetDateStr) => {
    if (!targetDateStr) return "0 Hari";

    const target = new Date(targetDateStr);
    const now = new Date();

    if (target <= now) return "0 Hari";

    // Calculate total days difference
    const diffTime = Math.abs(target - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return `${diffDays} Hari`;
  };

  const [taskStatus, setTaskStatus] = useState({});

  const toggleTask = (milestoneIndex, taskId) => {
    setTaskStatus(prev => {
      const currentTasks = prev[milestoneIndex] || { task2: false, task3: false };
      return {
        ...prev,
        [milestoneIndex]: {
          ...currentTasks,
          [taskId]: !currentTasks[taskId]
        }
      };
    });
  };

  const [unlockedMilestones, setUnlockedMilestones] = useState(() => {
    return parseInt(localStorage.getItem("sigma_unlockedMilestones_v2")) || 1;
  });

  useEffect(() => {
    localStorage.setItem("sigma_unlockedMilestones_v2", unlockedMilestones);
  }, [unlockedMilestones]);

  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [activeTasks, setActiveTasks] = useState([]);

  // Form states
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDetail, setNewTaskDetail] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle) return; // Basic validation

    const newTask = {
      title: newTaskTitle,
      desc: newTaskDetail,
      label: newTaskLabel || "priority", // fallback label
      time: newTaskDeadline || "23.59" // fallback time
    };

    setActiveTasks([...activeTasks, newTask]);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    // Reset form
    setNewTaskTitle("");
    setNewTaskDetail("");
    setNewTaskLabel("");
    setNewTaskDate("");
    setNewTaskDeadline("");
    setSelectedFileName("");
  };

  const toggleMilestone = (index, locked) => {
    if (locked) return; // do not expand if locked
    setExpandedMilestone(expandedMilestone === index ? null : index);
  };

  const rawMilestones = [
    { title: "Topik disetujui", desc: "Disetujui oleh Kaprodi • 12 Jan 2024", progress: "10%" },
    { title: "Bab 1 Selesai & Disetujui", desc: "Latar Belakang & Rumusan Masalah • 05 Feb 2024", progress: "15%" },
    { title: "Bab 2 Selesai & Disetujui", desc: "Tinjauan Pustaka Lengkap", progress: "15%" },
    { title: "Bab 3 Selesai & Disetujui", desc: "Metodologi Penelitian • 15 Mar 2024", progress: "20%" },
    { title: "Seminar Proposal", desc: "Lulus dengan Revisi Ringan • 20 Mar 2024", progress: "5%" },
    { title: "Bab 4 Selesai & Disetujui", desc: "Proses: Analisis Data & Pembahasan", progress: "20%" },
    { title: "Bab 5 Selesai & Disetujui", desc: "Kesimpulan & Saran", progress: "10%" },
    { title: "Sidang Akhir Skripsi", desc: "Ujian Komprehensif & Penilaian", progress: "5%" },
  ];

  const milestones = rawMilestones.map((m, index) => {
    const isLocked = index >= unlockedMilestones;
    const isCompleted = index < unlockedMilestones - 1;
    const isActive = index === unlockedMilestones - 1;

    let icon = <FiMoreHorizontal />;
    if (isLocked) {
      icon = index === 7 ? <FaGraduationCap /> : <FiLock />;
    } else if (isCompleted) {
      icon = <FiCheck style={{ strokeWidth: '3px' }} />;
    }

    let color = undefined;
    if (isActive) {
      color = "#006098";
    } else if (isCompleted) {
      color = "#00703c";
    }

    return {
      ...m,
      locked: isLocked,
      isCompleted,
      isActive,
      icon,
      color
    };
  });

  const totalProgress = milestones.reduce((sum, m) => {
    if (m.isCompleted) {
      return sum + parseInt(m.progress);
    }
    return sum;
  }, 0);

  useEffect(() => {
    localStorage.setItem("sigma_totalProgress", totalProgress);
    const active = milestones.find(m => m.isActive);
    if (active) {
      localStorage.setItem("sigma_activeMilestoneTitle", active.title);
    }
  }, [totalProgress, milestones]);

  return (
    <div className="dashboard-page progress-page">
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
              <img src={ProfileAvatar} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </header>

      <div className="progress-content-grid">
        {/* Left Column */}
        <div className="progress-left">
          <div className="dashboard-card hero-progress-card">
            <div className="hero-progress-info">
              <h2 className="thesis-title">{storedJudul}</h2>
              <div className="hero-badges-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div className="thesis-badges">
                  <span className="badge-green">Progress : Bab IV</span>
                  <span className="badge-blue" style={{ textTransform: 'capitalize', wordBreak: 'break-word' }}>Pembimbing: {storedDosen}</span>
                </div>
                <div className="thesis-status-wrapper">
                  <div className="thesis-status">
                    <FiCheckCircle style={{ marginRight: '6px' }} /> Status: Aman (Lulus Lebih Cepat)
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-progress-circle-wrap" style={{ position: 'relative', width: '160px', height: '160px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', transform: 'rotate(-90deg)', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="progressGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.25" />
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
                  stroke="url(#progressGradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 * (1 - totalProgress / 100)}
                  filter="url(#glow)"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                <span className="circle-value" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#006098', lineHeight: 1 }}>{totalProgress}%</span>
                <span className="circle-label" style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px' }}>Progres Total</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card milestone-card">
            <div className="milestone-header">
              <h3><FiFileText style={{ marginRight: '8px' }} /> Milestone Skripsi</h3>
              <span className="milestone-count">8 Milestone Total</span>
            </div>
            <div className="milestone-timeline">
              {milestones.map((m, i) => {
                const isExpanded = expandedMilestone === i;
                return (
                  <div key={i} className={`milestone-item ${m.locked ? 'locked' : 'active'}`}>
                    <div className="milestone-icon-wrapper">
                      <div className={`milestone-icon ${m.isActive ? 'active-icon' : ''}`} style={{ backgroundColor: m.locked ? '#f1f5f9' : m.color, color: m.locked ? '#94a3b8' : '#fff' }}>
                        {m.icon}
                      </div>
                      {i !== milestones.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="milestone-content" style={{ flex: 1 }}>
                      <div
                        className="milestone-details"
                        style={{ paddingBottom: (!m.locked && isExpanded) ? '12px' : '24px', cursor: !m.locked ? 'pointer' : 'default' }}
                        onClick={() => toggleMilestone(i, m.locked)}
                      >
                        <div className="milestone-text">
                          <h4 style={{ color: m.isCompleted ? '#111827' : '' }}>{m.title}</h4>
                          <p>{m.desc}</p>
                        </div>
                        <div className="milestone-progress">
                          <span className="progress-percentage" style={
                            m.isActive ? { backgroundColor: '#006098', color: '#fff' } :
                              m.isCompleted ? { backgroundColor: '#86efac', color: '#14532d', padding: '4px 10px' } :
                                {}
                          }>{m.progress}</span>
                          <FiChevronRight className="progress-arrow" style={isExpanded ? { transform: 'rotate(90deg)', transition: 'transform 0.3s' } : { transition: 'transform 0.3s' }} />
                        </div>
                      </div>

                      {(!m.locked && isExpanded) && (() => {
                        const currentTasks = taskStatus[i] || { task2: false, task3: false };
                        return (
                          <div className="milestone-expanded-area">
                            <div className="milestone-bar-container-new">
                              <div className="milestone-bar-new" style={{ width: '40%' }}></div>
                            </div>
                            <div className="milestone-expanded-card">
                              <div className="task-item">
                                <div className="task-dot green"></div>
                                <span className="task-text green-text">Sedang Berjalan</span>
                              </div>
                              <div className="task-item" onClick={() => toggleTask(i, 'task2')} style={{ cursor: 'pointer' }}>
                                {currentTasks.task2 ? <FiCheckCircle className="task-icon green-text" /> : <div className="task-circle empty"></div>}
                                <span className={`task-text ${currentTasks.task2 ? 'green-text' : ''}`}>Draf Topik Selesai</span>
                              </div>
                              <div className="task-item" onClick={() => toggleTask(i, 'task3')} style={{ cursor: 'pointer' }}>
                                {currentTasks.task3 ? <FiCheckCircle className="task-icon green-text" /> : <div className="task-circle empty"></div>}
                                <span className={`task-text ${currentTasks.task3 ? 'green-text' : ''}`}>Validasi Oleh Dosen Pembimbing</span>
                              </div>
                              <button
                                className="btn-primary w-100"
                                style={{
                                  marginTop: '16px',
                                  borderRadius: '8px',
                                  opacity: (currentTasks.task2 && currentTasks.task3) ? 1 : 0.5,
                                  cursor: (currentTasks.task2 && currentTasks.task3) ? 'pointer' : 'not-allowed'
                                }}
                                disabled={!(currentTasks.task2 && currentTasks.task3)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (i + 1 === unlockedMilestones) {
                                    setUnlockedMilestones(unlockedMilestones + 1);
                                  }
                                  setExpandedMilestone(i + 1);
                                }}
                              >
                                {i + 1 < milestones.length ? `Lanjutkan ke ${milestones[i + 1].title.split(' ')[0]} ${milestones[i + 1].title.split(' ')[1]}` : 'Selesai'}
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="progress-right">
          <div className="stat-grid">
            <div className="stat-box">
              <FiBook className="stat-icon blue" />
              <p className="stat-title" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logbook Terisi</p>
              <h3 className="stat-value">0 <span>Sesi</span></h3>
            </div>
            <div className="stat-box">
              <FiCheckCircle className="stat-icon green" />
              <p className="stat-title">Revisi Selesai</p>
              <h3 className="stat-value">0 <span>Poin</span></h3>
            </div>
            <div className="stat-box">
              <FiClock className="stat-icon red" />
              <p className="stat-title">Sisa Waktu</p>
              <h3 className="stat-value">
                {getEstimasiWaktu(rencanaLulusDate).split(' ')[0]} <span>Hari</span>
              </h3>
            </div>
            <div className="stat-box">
              <FiActivity className="stat-icon orange" />
              <p className="stat-title">Aktivitas Harian</p>
              <h3 className="stat-value">0 <span>Hari Beruntun</span></h3>
            </div>
          </div>

          <div className="dashboard-card task-card">
            <div className="card-header border-none" style={{ paddingBottom: 0 }}>
              <h3 style={{ color: '#006098' }}><FiCheckCircle style={{ marginRight: '8px' }} /> Tugas Aktif (Revisi)</h3>
            </div>
            <div className="task-list-container" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: activeTasks.length === 0 ? 'center' : 'stretch' }}>
              {activeTasks.length === 0 ? (
                <>
                  <div className="empty-illustration-small" style={{ marginBottom: '16px' }}>
                    <img src={UserAvatar} alt="Belum Ada Tugas" width="100" />
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>Belum Ada Tugas Revisi</p>
                </>
              ) : (
                activeTasks.map((task, index) => (
                  <div key={index} className="task-item-card" style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '16px', display: 'flex', gap: '16px', borderLeft: `4px solid ${task.label === 'priority' ? '#006098' : '#93c5fd'}` }}>
                    <div className="task-checkbox" style={{ paddingTop: '2px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}></div>
                    </div>
                    <div className="task-info">
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>{task.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px', lineHeight: '1.5' }}>{task.desc}</p>
                      <div className="task-meta" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '0.7rem', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {task.label === 'priority' ? 'HIGH PRIORITY' : task.label === 'reference' ? 'REFERENCE' : 'DATA ANALYSIS'}
                        </span>
                        <span style={{ color: '#475569', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                          <FiClock /> {task.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <button
                className="btn-dashed w-100"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: '2px dashed #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', marginTop: activeTasks.length > 0 ? '8px' : '0' }}
                onClick={() => setIsModalOpen(true)}
              >
                <FiPlusCircle style={{ fontSize: '1.25rem' }} /> Tambah Tugas Baru
              </button>
            </div>
          </div>

          <div className="dashboard-card message-card">
            <p className="message-title">Pesan Pembimbing</p>
            <p className="message-content">"Progress-mu sangat konsisten. Lanjutkan detail di Bab 4, pastikan visualisasi datanya mudah dibaca ya!"</p>
            <div className="message-sender">
              <div className="sender-avatar">
                {/* Fallback avatar */}
                <FiUser color="#fff" />
              </div>
              <div className="sender-info">
                <strong style={{ textTransform: 'capitalize' }}>{storedDosen}</strong>
                <span>Dosen Pembimbing 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Tugas */}
      {isModalOpen && (
        <div className="task-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="task-modal-header">
              <h3>Tugas Aktif Revisi</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="task-modal-body">
              <div className="form-row-3">
                <div className="form-group">
                  <label>Label</label>
                  <div className="custom-dropdown-container">
                    <div
                      className={`custom-dropdown-header ${isLabelDropdownOpen ? 'active' : ''}`}
                      style={{
                        color: newTaskLabel ? '#1e293b' : '#94a3b8',
                        backgroundColor: '#ffffff',
                        borderColor: '#cbd5e1',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)}
                    >
                      <span>
                        {newTaskLabel === 'priority' ? 'High Priority' :
                          newTaskLabel === 'reference' ? 'Reference' :
                            newTaskLabel === 'data' ? 'Data Analysis' :
                              newTaskLabel === 'implementation' ? 'Implementation' :
                                'Prioritas/ Referensi / Data / Implementasi'}
                      </span>
                      <FiChevronDown />
                    </div>
                    {isLabelDropdownOpen && (
                      <div className="custom-dropdown-menu" style={{ backgroundColor: '#ffffff' }}>
                        {[
                          { value: 'priority', label: 'High Priority' },
                          { value: 'reference', label: 'Reference' },
                          { value: 'data', label: 'Data Analysis' },
                          { value: 'implementation', label: 'Implementation' }
                        ].map((opt, index) => (
                          <div
                            key={index}
                            className={`custom-dropdown-item ${newTaskLabel === opt.value ? 'selected' : ''}`}
                            onClick={() => {
                              setNewTaskLabel(opt.value);
                              setIsLabelDropdownOpen(false);
                            }}
                            style={{ color: '#1e293b' }}
                          >
                            {opt.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Tanggal</label>
                  <div className="input-with-icon">
                    <input
                      type="date"
                      value={newTaskDate}
                      onChange={(e) => setNewTaskDate(e.target.value)}
                      style={{ color: newTaskDate ? '#1e293b' : '#94a3b8' }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Jam</label>
                  <div className="input-with-icon">
                    <input
                      type="time"
                      value={newTaskDeadline}
                      onChange={(e) => setNewTaskDeadline(e.target.value)}
                      style={{ color: newTaskDeadline ? '#1e293b' : '#94a3b8' }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Nama Tugas</label>
                <input
                  type="text"
                  placeholder="Masukkan Judul Tugas Spesifik"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Detail Tugas</label>
                <textarea
                  placeholder="Contoh : Gunakan minimal 5 jurnal internasional terbitan 5 tahun terakhir."
                  rows="4"
                  value={newTaskDetail}
                  onChange={(e) => setNewTaskDetail(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Dokumen Bukti (Pdf/Jpg/Png)</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <button
                    className="btn-file"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Pilih File
                  </button>
                  <div className="file-name-display" style={{ color: selectedFileName ? '#1e293b' : '#94a3b8' }}>
                    <span>{selectedFileName || "Belum ada file dipilih"}</span>
                  </div>
                </div>
              </div>
              <button
                className="btn-submit-modal"
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '12px',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(90deg, #0d6efd 0%, #0056b3 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  boxShadow: '0 4px 10px rgba(13, 110, 253, 0.2)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s, transform 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                onClick={handleAddTask}
              >
                <FiPlus /> Tambah Tugas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {isSuccessModalOpen && (
        <div className="task-modal-overlay" onClick={() => setIsSuccessModalOpen(false)}>
          <div className="task-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '400px', textAlign: 'center', padding: '40px 24px' }}>
            <div className="success-icon-wrapper" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#d1fae5', marginBottom: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FiCheckCircle size={56} color="#10b981" />
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

export default ProgressSkripsi;

