import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEdit, FiPlus } from "react-icons/fi";
import "../../styles/modules.css";

const AbsensiList = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, tanggal: "2025-06-02", kelas: "A", mataKuliah: "Basis Data", hadir: 28, izin: 2, alpha: 2, total: 32 },
    { id: 2, tanggal: "2025-06-02", kelas: "B", mataKuliah: "Pemrograman Web", hadir: 27, izin: 1, alpha: 2, total: 30 },
    { id: 3, tanggal: "2025-06-01", kelas: "A", mataKuliah: "Algoritma", hadir: 30, izin: 1, alpha: 1, total: 32 },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Absensi Mahasiswa</h1>
        <p>Kelola data kehadiran mahasiswa</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari berdasarkan kelas..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <Link to="/mahasiswa/absensi/input" className="btn btn-primary">
          <FiPlus /> Input Absensi
        </Link>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kelas</th>
              <th>Mata Kuliah</th>
              <th>Hadir</th>
              <th>Izin</th>
              <th>Alpha</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.tanggal}</td>
                <td>{row.kelas}</td>
                <td>{row.mataKuliah}</td>
                <td><span className="badge badge-success">{row.hadir}</span></td>
                <td><span className="badge badge-warning">{row.izin}</span></td>
                <td><span className="badge badge-danger">{row.alpha}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="btn-edit" title="Edit"><FiEdit /></button>
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

export default AbsensiList;
