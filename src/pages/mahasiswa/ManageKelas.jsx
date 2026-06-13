import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEdit, FiUserPlus, FiUserMinus } from "react-icons/fi";
import "../../styles/modules.css";

const ManageKelas = () => {
  const kelas = [
    { id: "A", jumlah: 32, wali: "Dr. Suharto" },
    { id: "B", jumlah: 30, wali: "Prof. Anita" },
    { id: "C", jumlah: 28, wali: "Dr. Rahman" },
  ];

  const mahasiswa = [
    { nim: "2024001", nama: "Ahmad Rizki", kelas: "A", status: "Masuk" },
    { nim: "2024002", nama: "Siti Nurhaliza", kelas: "B", status: "Masuk" },
    { nim: "2024006", nama: "Fajar Nugroho", kelas: "-", status: "Belum Masuk" },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Manage Kelas</h1>
        <p>Set mahasiswa masuk & keluar kelas, input dan edit nilai</p>
      </div>

      {/* Kelas Cards */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {kelas.map((k) => (
          <div className="stat-card" key={k.id}>
            <div className="stat-icon blue" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{k.id}</div>
            <div className="stat-info">
              <h3>Kelas {k.id}</h3>
              <div className="stat-value">{k.jumlah}</div>
              <div className="stat-change positive">Wali: {k.wali}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Set Mahasiswa Masuk/Keluar */}
      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari mahasiswa..." />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/mahasiswa/nilai/input" className="btn btn-primary btn-sm">
            <FiEdit /> Input Nilai
          </Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((m) => (
              <tr key={m.nim}>
                <td>{m.nim}</td>
                <td style={{ fontWeight: 500 }}>{m.nama}</td>
                <td>{m.kelas === "-" ? <span className="badge badge-warning">Belum</span> : m.kelas}</td>
                <td>
                  <span className={`badge ${m.status === "Masuk" ? "badge-success" : "badge-danger"}`}>
                    {m.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="btn-view" title="Masukkan ke kelas"><FiUserPlus /></button>
                    <button className="btn-delete" title="Keluarkan dari kelas"><FiUserMinus /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageKelas;
