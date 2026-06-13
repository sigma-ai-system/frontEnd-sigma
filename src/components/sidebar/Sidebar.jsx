import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBarChart2,
  FiBook,
  FiEdit,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { TbLayoutDashboard, TbPencilPlus } from "react-icons/tb";

import { logout } from "../../services/authApi";
import logo from "../../assets/logo-dashboard.png";
import logoutDoor from "../../assets/logout-door.png";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      {!mobileOpen && (
        <button className="mobile-menu-toggle" onClick={() => setMobileOpen(true)}>
          <FiMenu />
        </button>
      )}

      {/* Overlay */}
      {mobileOpen && <div className="sidebar-overlay visible" onClick={closeMobile} />}

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="SIGMA" className="sidebar-logo-img" />
          <button className="mobile-close-btn" onClick={closeMobile} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <NavLink to="/dashboard" onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <TbLayoutDashboard className="nav-icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/progress-skripsi" onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <FiBarChart2 className="nav-icon" />
                <span>Progress Skripsi</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/logbook" onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <FiBook className="nav-icon" />
                <span>Logbook</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bimbingan" onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <FiEdit className="nav-icon" />
                <span>Bimbingan</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <FiUser className="nav-icon" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-sidebar-onboarding" onClick={closeMobile}>
            Onboarding
          </button>

          <button className="btn-sidebar-action" onClick={() => { }}>
            <FiSettings className="nav-icon" />
            <span>Settings</span>
          </button>

          <button className="btn-sidebar-action danger" onClick={handleLogoutClick}>
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="logout-illustration">
              <img src={logoutDoor} alt="Logout door" className="logout-door-img" />
            </div>
            <h3>Apakah Yakin Ingin Keluar ?</h3>
            <div className="logout-modal-actions">
              <button className="logout-btn-cancel" onClick={() => setShowLogoutModal(false)}>Batal</button>
              <button className="logout-btn-confirm" onClick={confirmLogout}>Keluar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
