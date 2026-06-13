import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiCheckSquare, FiPlus } from "react-icons/fi";
import "../../styles/modules.css";

const DosenAbsensiList = () => {
  const data = [
    { id: 1, tanggal: "2025-06-02", nidn: "0001098501", nama: "Dr. Suharto, M.Kom", mataKuliah: "Basis Data", status: "Hadir" },
    { id: 2, tanggal: "2025-06-02", nidn: "0002087601", nama: "Prof. Anita Dewi, Ph.D", mataKuliah: "Machine Learning", status: "Hadir" },
    { id: 3, tanggal: "2025-06-01", nidn: "0003076502", nama: "Dr. Rahman, M.T", mataKuliah: "Jaringan Komputer", status: "Izin" },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Absensi Dosen</h1>
        <p>Rekap kehadiran dosen</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari dosen..." />
          </div>
        </div>
        <Link to="/dosen/absensi/input" className="btn btn-primary"><FiPlus /> Input Absensi</Link>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>NIDN</th>
              <th>Nama</th>
              <th>Mata Kuliah</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.tanggal}</td>
                <td>{row.nidn}</td>
                <td style={{ fontWeight: 500 }}>{row.nama}</td>
                <td>{row.mataKuliah}</td>
                <td><span className={`badge ${row.status === "Hadir" ? "badge-success" : "badge-warning"}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DosenAbsensiList;
