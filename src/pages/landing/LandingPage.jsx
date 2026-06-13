import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiChevronDown,
  FiStar,
  FiMenu,
  FiX,
  FiZap,
  FiCpu,
  FiTarget,
  FiPieChart,
  FiEye,
  FiHeart,
} from "react-icons/fi";
import { FaQuestionCircle, FaLinkedin, FaGraduationCap, FaChalkboardTeacher, FaRegLightbulb } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import LogoSigma from "../../assets/logo-sigma.png";
import FooterLogo from "../../assets/SIGMA.png";
import HeroMockupNew from "../../assets/hero-mockup-clean.png";
import FaqStudentImg from "../../assets/hero-section.png";
import Dasboard1Img from "../../assets/Dasboard1.png";
import LogoTentang1 from "../../assets/logo-tentangkami1.png";
import LogoTentang2 from "../../assets/logo-tentangkami2.png";
import LogoTentang3 from "../../assets/logo-tentangkami3.png";
import LogoTentang4 from "../../assets/logo-tentangkami4.png";
import BackgroundTentang from "../../assets/Background-tentangkami.png";
import Profil1 from "../../assets/profil1.png";
import Profil2 from "../../assets/profil2.png";
import Profil3 from "../../assets/profil3.png";
import BackgroundTim from "../../assets/Background-tim.png";
import TestiNadia from "../../assets/testi-nadia.png";
import TestiRizky from "../../assets/testi-rizky.png";
import TestiSiti from "../../assets/testi-siti.png";
import TestiAhmad from "../../assets/testi-ahmad.png";
import TestiNurul from "../../assets/testi-nurul.png";
import TestiBagus from "../../assets/testi-bagus.png";
import LogoCaraKerja1 from "../../assets/logo-carakerja1.png";
import LogoCaraKerja2 from "../../assets/logo-carakerja2.png";
import LogoCaraKerja3 from "../../assets/logo-carakerja3.png";
import LogoCaraKerja4 from "../../assets/logo-carakerja4.png";
import LogoCaraKerja5 from "../../assets/logo-carakerja5.png";
import IconFitur1 from "../../assets/Icon-fitur1.png";
import IconFitur2 from "../../assets/Icon-fitur2.png";
import IconFitur3 from "../../assets/Icon-fitur3.png";
import IconFitur4 from "../../assets/Icon-fitur4.png";
import IconFitur5 from "../../assets/Icon-fitur5.png";
import IconFitur6 from "../../assets/Icon-fitur6.png";
import "../../styles/landing.css";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ["beranda", "fitur", "cara-kerja", "testimoni", "faq", "tentang"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".scroll-reveal");

    if (!revealTargets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "fitur", label: "Fitur" },
    { id: "cara-kerja", label: "Cara Kerja" },
    { id: "testimoni", label: "Testimoni" },
    { id: "faq", label: "FAQ" },
    { id: "tentang", label: "Tentang" },
  ];

  const features = [
    {
      iconImg: IconFitur1,
      title: "Monitoring Progress Skripsi",
      desc: "Pantau perkembangan progress skripsi secara real-time mulai dari pengajuan topik hingga sidang akhir",
      bullets: [
        "Tracking progres otomatis",
        "Persentase penyelesaian skripsi",
        "Timeline milestone penelitian",
      ],
    },
    {
      iconImg: IconFitur2,
      title: "Prediksi Resiko Keterlambatan",
      desc: "Dengan memanfaatkan machine learning untuk menganalisis pola aktivitas mahasiswa untuk prediksi resiko keterlambatan",
      bullets: [
        "Identifikasi Resiko Keterlambatan",
        "Monitoring berbasis data",
        "Membuat konsisten progress",
      ],
    },
    {
      iconImg: IconFitur3,
      title: "Logbook Aktivitas Harian",
      desc: "Catat seluruh aktivitas pengerjaan skripsi secara terstruktur dan terdokumentasi dengan baik",
      bullets: [
        "Riwayat aktivitas tersimpan",
        "Evaluasi produktivitas",
        "Bukti Progress penelitian",
      ],
    },
    {
      iconImg: IconFitur4,
      title: "Manajemen Bimbingan",
      desc: "Atur jadwal dan dokumentasikan hasil bimbingan dengan dosen pembimbing secara terintegrasi dan terarah",
      bullets: [
        "Penjadwalan lebih mudah",
        "Riwayat catatan bimbingan",
        "Notifikasi pengingat realtime",
      ],
    },
    {
      iconImg: IconFitur5,
      title: "Pengelolaan Revisi",
      desc: "Pantau seluruh revisi dari dosen pembimbing dan bisa memantau status penyelesaiannya",
      bullets: [
        "Daftar revisi terpusat",
        "Prioritas pengerjaan lebih jelas",
        "Monitoring penyelesaian skripsi",
      ],
    },
    {
      iconImg: IconFitur6,
      title: "Dashboard Analitik Progress Skripsi",
      desc: "Visualisasi data progress skripsi dalam bentuk grafik dan statistik yang mudah dipahami",
      bullets: [
        "Statistik proses penelitian",
        "Tren aktivitas mahasiswa",
        "Insight berbasis data",
      ],
    },
  ];

  const steps = [
    {
      num: "01",
      color: "blue",
      iconImg: LogoCaraKerja1,
      title: "Buat Profil Skripsi",
      desc: "Lengkapi informasi skripsi Anda seperti judul, dosen pembimbing, target kelulusan",
      badge: "Data skripsi tersimpan dengan aman"
    },
    {
      num: "02",
      color: "cyan",
      iconImg: LogoCaraKerja2,
      title: "Catat Progres dan Aktivitas",
      desc: "Catat aktivitas harian, pencapaian, milestone, serta dokumentasi pengerjaan skripsi",
      badge: "Progress terpantau secara real-time"
    },
    {
      num: "03",
      color: "green",
      iconImg: LogoCaraKerja3,
      title: "Kelola bimbingan dan Konsultasi",
      desc: "Atur jadwal bimbingan, catat hasil konsultasi dan simpan masukan dari dosen pembimbing",
      badge: "Bimbingan terorganisir dan terdokumentasi"
    },
    {
      num: "04",
      color: "purple",
      iconImg: LogoCaraKerja4,
      title: "Pantau Revisi dan Tindak Lanjut",
      desc: "Kelola semua revisi dosen pembimbing dan pantau status penyelesaiannya.",
      badge: "Tidak ada revisi yang terlewat atau hilang"
    },
    {
      num: "05",
      color: "green",
      iconImg: LogoCaraKerja5,
      title: "Dapatkan analisis dan prediksi",
      desc: "SIGMA menganalisis data anda dan memberikan prediksi risiko keterlambatan skripsimu",
      badge: "Data skripsi tersimpan dengan aman"
    },
  ];

  const testimonialsMahasiswa = [
    {
      name: "Nadia Putri",
      role: "Mahasiswa Informatika",
      badge: "Semester 8",
      text: "SIGMA sangat membantu saya memantau progres skripsi setiap hari. Fitur prediksi risikonya juga membuat saya lebih waspada dan termotivasi untuk menyelesaikan tepat waktu.",
      rating: 5,
      avatarImg: TestiNadia,
    },
    {
      name: "Rizky Ramadhan",
      role: "Mahasiswa Sistem Informasi",
      badge: "Semester 8",
      text: "Logbook harian di SIGMA membuat aktivitas saya lebih terstruktur. Semua catatan bimbingan dan revisi tersimpan rapi, jadi tidak ada yang terlewat. Sungguh platform yang sangat bermanfaat",
      rating: 5,
      avatarImg: TestiRizky,
    },
    {
      name: "Siti Aisyah",
      role: "Mahasiswa Teknik Industri",
      badge: "Semester 8",
      text: "Dengan adanya prediksi resiko, saya bisa tahu lebih awal kemungkinan keterlambatan dan segera memperbaiki ritme pengerjaan skripsi saya dan terasa seperti asisten pribadi.",
      rating: 5,
      avatarImg: TestiSiti,
    },
  ];

  const testimonialsDosen = [
    {
      name: "Dr. Ahmad Fauzi, S.Kom., M.T",
      role: "Dosen Pembimbing",
      badge: "Fakultas Teknik",
      text: "SIGMA memudahkan saya memantau banyak mahasiswa bimbingan saya sekaligus, mulai dari logbook, progres skripsinya, hingga menjadwalkan konsultasi bimbingan secara terstruktur",
      rating: 5,
      avatarImg: TestiAhmad,
    },
    {
      name: "Dr. Nurul Hidatah, M.kom",
      role: "Dosen Pembimbing",
      badge: "Fakultas Teknik",
      text: "Fitur rekap aktivitas dan prediksi risiko sangat membantu saya memberikan arahan lebih tepat kepada mahasiswa. SIGMA merupakan inovasi yang luar biasa di dunia akademik",
      rating: 5,
      avatarImg: TestiNurul,
    },
    {
      name: "Ir. Bagus Kurniawan., M.T",
      role: "Dosen Pembimbing",
      badge: "Fakultas Teknik",
      text: "Dengan dashboard analitik SIGMA, saya bisa lihat perkembangan mahasiswa secara detail, proses bimbingan menjadi lebih efektif dan efisien",
      rating: 5,
      avatarImg: TestiBagus,
    },
  ];

  const faqs = [
    {
      num: "01",
      q: "Apa itu SIGMA ?",
      a: "SIGMA (Sistem Informasi Progres Mahasiswa) adalah platform monitoring skripsi berbasis Artificial Intelligence yang membantu mahasiswa mengelola progress penelitian, jadwal bimbingan, revisi, serta memprediksi resiko keterlambatan penyelesaian skripsi.",
    },
    {
      num: "02",
      q: "Bagaimana SIGMA memprediksi resiko keterlambatan ?",
      a: "SIGMA menggunakan model Random Forest yang dilatih dari data historis ribuan mahasiswa. Model ini menganalisis pola progress, frekuensi bimbingan, dan aktivitas logbook untuk memprediksi risiko keterlambatan.",
    },
    {
      num: "03",
      q: "Data apa saja yang digunakan untuk analisis ?",
      a: "SIGMA menggunakan data progress skripsi, frekuensi bimbingan, catatan logbook, milestone yang dicapai, dan jadwal revisi untuk menghasilkan analisis yang akurat.",
    },
    {
      num: "04",
      q: "Apakah SIGMA bisa memprediksi kelulusan saya ?",
      a: "SIGMA tidak memprediksi kelulusan secara langsung, namun memberikan prediksi risiko keterlambatan penyelesaian skripsi berdasarkan pola aktivitas dan progress Anda.",
    },
    {
      num: "05",
      q: "Apakah data skripsi dan data pribadi saya aman ?",
      a: "Absolut. Kami menggunakan enkripsi end-to-end dan server yang tersertifikasi ISO 27001 untuk melindungi semua data penelitian dan data pribadi Anda.",
    },
  ];

  return (
    <div className="landing-page">
      {/* ========== NAVBAR ========== */}
      <nav className={`landing-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="landing-nav-container">
          <div className="landing-nav-logo" onClick={() => scrollToSection("beranda")}>
            <img src={LogoSigma} alt="SIGMA" className="landing-logo-img" />
          </div>

          <div className={`landing-nav-links ${mobileMenuOpen ? "nav-links-open" : ""}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-link-btn ${activeSection === link.id ? "nav-link-active" : ""}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
            <div className="nav-mobile-actions">
              <Link to="/login" className="nav-btn-login-mobile">
                Masuk
              </Link>
              <Link to="/register" className="nav-btn-cta-mobile">
                Mulai Sekarang
              </Link>
            </div>
          </div>

          <div className="landing-nav-actions">
            <Link to="/login" className="nav-btn-login">
              Masuk
            </Link>
            <Link to="/register" className="nav-btn-cta">
              Mulai Sekarang
            </Link>
          </div>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="beranda" className="landing-hero">

        <div className="landing-container hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <FiZap className="hero-badge-icon" />
              <span>AI Powered Thesis Monitoring Platform</span>
            </div>

            <h1 className="hero-title">
              Sistem Monitoring
              <br />
              Informasi{" "}
              <span className="hero-title-gradient">
                Progress
                <br />
                Skripsi Mahasiswa
              </span>
            </h1>

            <p className="hero-description">
              SIGMA membantu mahasiswa memantau progress skripsi, mengelola revisi, memantau
              bimbingan, dan memprediksi resiko keterlambatan menggunakan Machine Learning
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="hero-btn-primary">
                Mulai Sekarang
                <FiArrowRight />
              </Link>
              <button className="hero-btn-secondary" onClick={() => scrollToSection("cara-kerja")}>
                <FiPlay className="hero-btn-play-icon" />
                Lihat Demo
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-item">
                <div className="hero-stat-icon-wrapper stat-green">
                  <FiCheckCircle />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-value">Akurasi 96.67%</span>
                  <span className="hero-stat-label">Model Random Forest</span>
                </div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-icon-wrapper stat-blue">
                  <FiCpu />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-value">AI-Powered</span>
                  <span className="hero-stat-label">Machine Learning</span>
                </div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-icon-wrapper stat-purple">
                  <FiTarget />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-value">AI-Powered</span>
                  <span className="hero-stat-label">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-mockup-wrapper">
              <img
                src={HeroMockupNew}
                alt="SIGMA Dashboard"
                className="hero-mockup-img float-animation-main"
              />

              {/* Floating Cards */}
              <div className="hero-float-card float-progress">
                <div className="float-card-icon-blue"><FiPieChart /></div>
                <div className="float-card-content">
                  <span className="float-card-label">Progress</span>
                  <span className="float-card-value">75%</span>
                  <span className="float-card-sub">Selesai</span>
                </div>
              </div>

              <div className="hero-float-card float-prediction">
                <div className="float-card-icon-green"><FiCpu /></div>
                <div className="float-card-content">
                  <span className="float-card-label">AI Prediction</span>
                  <span className="float-card-value">On Track</span>
                  <span className="float-card-sub">Risiko Rendah</span>
                </div>
              </div>

              <div className="hero-float-card float-confidence">
                <div className="float-card-icon-indigo"><FiTrendingUp /></div>
                <div className="float-card-content">
                  <span className="float-card-label">AI Confidence</span>
                  <span className="float-card-value">94.6%</span>
                  <span className="float-card-sub">High Confidence</span>
                </div>
              </div>

              <div className="hero-float-card float-milestone">
                <div className="float-card-icon-teal"><FiTarget /></div>
                <div className="float-card-content">
                  <span className="float-card-label">Milestone</span>
                  <span className="float-card-value">6 / 8</span>
                  <span className="float-card-sub">Selesai</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="fitur" className="landing-section section-features">
        <div className="landing-container relative-z">
          <div className="section-header scroll-reveal">
            <span className="section-badge badge-outline">
              <FiStar className="badge-icon-star" /> FITUR UTAMA
            </span>
            <h2 className="section-title">
              Fitur Unggulan <span className="text-gradient-sigma">SIGMA</span>
            </h2>
            <p className="section-subtitle">
              Semua yang Anda butuhkan untuk mengelola skripsi lebih terarah, terstruktur dan tepat waktu
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card scroll-reveal"
                style={{ "--reveal-delay": `${i * 90}ms` }}
              >
                <div className="feature-card-top">
                  {f.iconImg ? (
                    <img src={f.iconImg} alt={f.title} className="feature-img-icon" />
                  ) : (
                    <div className={`feature-icon-box bg-${f.iconColor}`}>
                      <div className={`feature-icon text-${f.iconColor}`}>{f.icon}</div>
                    </div>
                  )}
                  <div className="feature-text-content">
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>

                <div className="feature-divider"></div>

                <div className="feature-bullets">
                  {f.bullets.map((bullet, idx) => (
                    <div key={idx} className="feature-bullet-item">
                      <FiCheckCircle className="feature-bullet-icon" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="cara-kerja" className="landing-section section-how">


        <div className="landing-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header scroll-reveal">
            <span className="section-badge badge-faq">
              <TbTargetArrow className="badge-icon-blue" /> CARA KERJA SIGMA
            </span>
            <h2 className="section-title">
              5 Langkah Mudah Menggunakan <span className="text-gradient-sigma">SIGMA</span>
            </h2>
            <p className="section-subtitle">
              SIGMA dirancang untuk membantu mahasiswa memantau progres skripsi mereka secara terstruktur dan memprediksi resiko keterlambatan secara akurat
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div
                key={i}
                className="step-card scroll-reveal"
                style={{ "--reveal-delay": `${i * 120}ms` }}
              >
                <div className={`step-number step-bg-${s.color}`}>{s.num}</div>
                <div className="step-card-content">
                  {s.iconImg ? (
                    <img src={s.iconImg} alt={s.title} className="step-img" />
                  ) : (
                    <div className={`step-icon-wrapper step-color-${s.color}`}>
                      {s.icon}
                    </div>
                  )}
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
                <div className={`step-footer step-badge-${s.color}`}>
                  <FiCheckCircle className="step-footer-icon" />
                  <span>{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimoni" className="landing-section section-testimonials">


        <div className="landing-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header scroll-reveal">
            <span className="section-badge badge-faq">
              <TbTargetArrow className="badge-testimoni-icon" /> TESTIMONI
            </span>
            <h2 className="section-title">
              Apa Kata Mereka Tentang <span className="text-gradient-sigma">SIGMA</span>
            </h2>
            <p className="section-subtitle">
              SIGMA telah membantu siswa dan dosen dalam memantau progress skripsi secara lebih efektif dan terstruktur berbasis data
            </p>
          </div>

          {/* Mahasiswa Group */}
          <div className="testi-group">
            <div className="testi-group-header scroll-reveal">
              <div className="testi-group-icon testi-icon-blue">
                <FaGraduationCap />
              </div>
              <div>
                <h3 className="testi-group-title text-blue">Apa Kata Mahasiswa ?</h3>
                <p className="testi-group-sub">Pengalaman mereka menggunakan sigma</p>
              </div>
            </div>
            <div className="testimonials-grid">
              {testimonialsMahasiswa.map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card scroll-reveal"
                  style={{ "--reveal-delay": `${i * 100}ms` }}
                >
                  <div className="testi-card-top">
                    <span className="testi-quote testi-quote-blue">{"\u201C"}</span>
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, j) => (
                        <FiStar key={j} className="star-filled" />
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <img src={t.avatarImg} alt={t.name} className="testimonial-avatar-img" />
                    <div className="testimonial-info">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-role">{t.role}</span>
                    </div>
                    <span className="testi-badge testi-badge-blue">{t.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dosen Group */}
          <div className="testi-group">
            <div className="testi-group-header scroll-reveal">
              <div className="testi-group-icon testi-icon-green">
                <FaChalkboardTeacher />
              </div>
              <div>
                <h3 className="testi-group-title text-green">Apa kata dosen Pembimbing ?</h3>
                <p className="testi-group-sub">Pengalaman mereka menggunakan sigma</p>
              </div>
            </div>
            <div className="testimonials-grid">
              {testimonialsDosen.map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card scroll-reveal"
                  style={{ "--reveal-delay": `${i * 100}ms` }}
                >
                  <div className="testi-card-top">
                    <span className="testi-quote testi-quote-green">{"\u201C"}</span>
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, j) => (
                        <FiStar key={j} className="star-filled" />
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <img src={t.avatarImg} alt={t.name} className="testimonial-avatar-img" />
                    <div className="testimonial-info">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-role">{t.role}</span>
                    </div>
                    <span className="testi-badge testi-badge-green">{t.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="landing-section section-faq">

        <div className="landing-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header scroll-reveal">
            <span className="section-badge badge-faq">
              <FaQuestionCircle className="badge-faq-icon" /> FAQ
            </span>
            <h2 className="section-title">
              Pertanyaan yang sering <span className="text-gradient-sigma">Diajukan</span>
            </h2>
            <p className="section-subtitle">
              Temukan jawaban mengenai penggunaan SIGMA, Prediksi AI, dan Monitoring Skripsi.
            </p>
          </div>

          <div className="faq-layout">
            <div className="faq-image-col scroll-reveal">
              <img src={FaqStudentImg} alt="Student" className="faq-student-img" />
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-item scroll-reveal ${openFaq === i ? "faq-open" : ""}`}
                  style={{ "--reveal-delay": `${i * 90}ms` }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-question">
                    <div className="faq-question-left">
                      <span className="faq-num">{faq.num}</span>
                      <span className="faq-q-text">{faq.q}</span>
                    </div>
                    <FiChevronDown />
                  </div>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TENTANG KAMI ========== */}
      <section id="tentang" className="landing-section section-tentang" style={{ backgroundImage: `url(${BackgroundTentang})` }}>
        <div className="landing-container relative-z">
          <div className="tentang-top">
            <div className="tentang-top-left scroll-reveal">
              <span className="section-badge badge-outline">
                <FaQuestionCircle className="badge-icon-blue" /> TENTANG KAMI
              </span>
              <h2 className="section-title">
                Tentang <span className="text-gradient-sigma">SIGMA</span>
              </h2>
              <p className="tentang-subtitle">
                Mendukung mahasiswa, dosen, dan institusi melalui teknologi cerdas untuk penyelesaian skripsi yang lebih baik
              </p>
              <p className="tentang-desc">
                SIGMA (Sistem Informasi Progres Mahasiswa) adalah platform monitoring skripsi berbasis Artificial Intelligence yang membantu mahasiswa menyelesaikan skripsi tepat waktu dan membantu dosen dalam membimbing secara lebih efektif
              </p>
            </div>
            <div className="tentang-top-right scroll-reveal">
              <img src={Dasboard1Img} alt="Tentang SIGMA" className="tentang-mockup-img float-animation-main" />
            </div>
          </div>

          <div className="tentang-middle">
            <div className="tentang-visi-misi scroll-reveal">
              <h3 className="tentang-section-title">Visi & Misi</h3>
              <div className="vm-cards">
                <div className="vm-card scroll-reveal" style={{ "--reveal-delay": "80ms" }}>
                  <div className="vm-header">
                    <div className="vm-icon-box bg-blue"><FiEye className="text-blue" /></div>
                    <h4 className="text-blue">Visi</h4>
                  </div>
                  <p className="vm-text">Menjadi platform monitoring skripsi berbasis AI terdepan yang mendorong keberhasilan akademik dan peningkatan kualitas pendidikan tinggi di Indonesia</p>
                </div>
                <div className="vm-card scroll-reveal" style={{ "--reveal-delay": "160ms" }}>
                  <div className="vm-header">
                    <div className="vm-icon-box bg-green"><TbTargetArrow className="text-green" /></div>
                    <h4 className="text-green">Misi</h4>
                  </div>
                  <ul className="vm-list">
                    <li><FiCheckCircle className="text-green" /><span>Membantu mahasiswa memantau dan mengelola progres skripsi secara terstruktur</span></li>
                    <li><FiCheckCircle className="text-green" /><span>Memberikan prediksi resiko keterlambatan berbasis AI untuk tindakan pencegahan dini</span></li>
                    <li><FiCheckCircle className="text-green" /><span>Memudahkan dosen dalam membimbing dan mengevaluasi mahasiswa bimbingan</span></li>
                    <li><FiCheckCircle className="text-green" /><span>Mendukung insitusi dalam meningkatkan efisiensi dan kualitas akademik</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tentang-nilai scroll-reveal">
              <h3 className="tentang-section-title">Nilai Kami</h3>
              <div className="nilai-list">
                <div className="nilai-item scroll-reveal" style={{ "--reveal-delay": "40ms" }}>
                  <div className="nilai-icon bg-blue"><MdOutlineAdminPanelSettings className="text-blue" /></div>
                  <div className="nilai-text">
                    <h4>Integritas</h4>
                    <p>Kami menjaga kejujuran, transparansi dan tanggung jawab dalam setiap proses</p>
                  </div>
                </div>
                <div className="nilai-divider"></div>
                <div className="nilai-item scroll-reveal" style={{ "--reveal-delay": "120ms" }}>
                  <div className="nilai-icon bg-green"><FiUsers className="text-green" /></div>
                  <div className="nilai-text">
                    <h4>Kolaborasi</h4>
                    <p>Kami percaya kolaborasi antara mahasiswa,dosen dan institusi adalah kunci keberhasilan</p>
                  </div>
                </div>
                <div className="nilai-divider"></div>
                <div className="nilai-item scroll-reveal" style={{ "--reveal-delay": "200ms" }}>
                  <div className="nilai-icon bg-purple"><FaRegLightbulb className="text-purple" /></div>
                  <div className="nilai-text">
                    <h4>Inovasi</h4>
                    <p>Kami terus berinovasi memanfaatkan teknologi AI untuk solusi yang cerdas mencegah keterlambatan kelulusan</p>
                  </div>
                </div>
                <div className="nilai-divider"></div>
                <div className="nilai-item scroll-reveal" style={{ "--reveal-delay": "280ms" }}>
                  <div className="nilai-icon bg-orange"><FiHeart className="text-orange" /></div>
                  <div className="nilai-text">
                    <h4>Empati</h4>
                    <p>Kami memahami setiap tantangan akademik dan hadir untuk memberikan dukungan terbaik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tentang-bottom">
            <div className="tentang-bottom-left scroll-reveal">
              <h3 className="tentang-bottom-title">Dibangun untuk dunia Akademik</h3>
              <p className="tentang-bottom-desc">SIGMA dikembangkan khusus untuk menjawab tantangan dalam proses penyelesaian skripsi yang kompleks, mulai dan manajemen waktu, bimbingan hingga prediksi risiko keterlambatan</p>
            </div>
            <div className="tentang-stats-card scroll-reveal">
              <div className="stat-box">
                <img src={LogoTentang1} alt="Mahasiswa Terdaftar" className="stat-img-icon" />
                <h4>2.500+</h4>
                <p>Mahasiswa<br />Terdaftar</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <img src={LogoTentang2} alt="Dosen Pembimbing" className="stat-img-icon" />
                <h4>150+</h4>
                <p>Dosen<br />Pembimbing</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <img src={LogoTentang3} alt="Program Studi Bergabung" className="stat-img-icon" />
                <h4>20+</h4>
                <p>Program Studi<br />Bergabung</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <img src={LogoTentang4} alt="Akurasi Model AI" className="stat-img-icon" />
                <h4>96.67%</h4>
                <p>Akurasi Model AI<br />(Random Forest)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TIM KAMI ========== */}
      <section id="tim" className="landing-section section-team" style={{ backgroundImage: `url(${BackgroundTim})` }}>
        <div className="landing-container relative-z">
          <div className="section-header scroll-reveal">
            <h2 className="section-title" style={{ textAlign: "center" }}>Tim dibalik <span className="text-gradient-sigma">SIGMA</span></h2>
            <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 40px auto" }}>Kami adalah tim yang berdedikasi menciptakan solusi teknologi yang berdampak nyata bagi dunia pendidikan</p>
          </div>

          <div className="team-grid">
            <div className="team-card scroll-reveal" style={{ "--reveal-delay": "0ms" }}>
              <div className="team-card-inner">
                <div className="team-info-top">
                  <img src={Profil1} alt="Khoiru Rizki Bani Adam" className="team-avatar" />
                  <div className="team-info">
                    <h4 className="team-name">Khoiru Rizki Bani Adam</h4>
                    <p className="team-role">UI/UX Designer & AI Engineer</p>
                    <p className="team-desc">Bertanggung Jawab dalam seluruh desain platform sigma dan pembuatan AI SIGMA</p>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/khoiru-rizki-bani-adam-365b42288/" target="_blank" rel="noopener noreferrer" className="team-linkedin-btn">
                  <FaLinkedin /> Linked In
                </a>
              </div>
            </div>
            <div className="team-card scroll-reveal" style={{ "--reveal-delay": "100ms" }}>
              <div className="team-card-inner">
                <div className="team-info-top">
                  <img src={Profil2} alt="Natasyah Salsabillah" className="team-avatar" />
                  <div className="team-info">
                    <h4 className="team-name">Natasyah Salsabillah</h4>
                    <p className="team-role">Ketua Tim / Front-end Developer Sigma</p>
                    <p className="team-desc">Bertanggung jawab dalam proses pengembangan Front End SIGMA</p>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/natasyah-salsabillah-wibisono/" target="_blank" rel="noopener noreferrer" className="team-linkedin-btn">
                  <FaLinkedin /> Linked In
                </a>
              </div>
            </div>
            <div className="team-card scroll-reveal" style={{ "--reveal-delay": "200ms" }}>
              <div className="team-card-inner">
                <div className="team-info-top">
                  <img src={Profil3} alt="Risky Nugraha" className="team-avatar" />
                  <div className="team-info">
                    <h4 className="team-name">Risky Nugraha</h4>
                    <p className="team-role">Back End Developer SIGMA</p>
                    <p className="team-desc">Mengembangkan sistem Backend dan Alur Sistem lebih aman dan terukur</p>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/mriskyn/" target="_blank" rel="noopener noreferrer" className="team-linkedin-btn">
                  <FaLinkedin /> Linked In
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src={FooterLogo} alt="SIGMA" className="footer-logo" />
              <p className="footer-desc">
                Platform monitoring skripsi berbasis AI untuk membantu mahasiswa dan dosen dalam mencapai kelulusan tepat waktu
              </p>
            </div>
            <div className="footer-links-group">
              <div className="footer-column">
                <h4>Produk</h4>
                <button onClick={() => scrollToSection("fitur")}>Fitur</button>
                <button onClick={() => scrollToSection("cara-kerja")}>Cara Kerja</button>
                <button onClick={() => {}}>Demo</button>
              </div>
              <div className="footer-column">
                <h4>Perusahaan</h4>
                <button onClick={() => scrollToSection("tentang")}>Tentang kami</button>
                <button onClick={() => {}}>Kebijakan Privasi</button>
                <button onClick={() => {}}>Syarat & Ketentuan</button>
              </div>
              <div className="footer-column">
                <h4>Dukungan</h4>
                <button onClick={() => {}}>Pusat Bantuan</button>
                <button onClick={() => scrollToSection("faq")}>FAQ</button>
                <a href="mailto:support@sigma.ac.id">Hubungi Kami</a>
              </div>
              <div className="footer-column footer-newsletter">
                <h4>Newsletter</h4>
                <p className="footer-newsletter-desc">
                  Dapatkan informasi terbaru seputar fitur dan update SIGMA
                </p>
                <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Masukkan email anda"
                    className="footer-newsletter-input"
                  />
                  <button type="submit" className="footer-newsletter-btn">
                    Berlangganan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile overlay */}
      {
        mobileMenuOpen && (
          <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )
      }
    </div >
  );
};

export default LandingPage;
