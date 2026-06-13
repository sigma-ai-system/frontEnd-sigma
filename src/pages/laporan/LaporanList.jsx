import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiDownload, FiPlus } from "react-icons/fi";
import "../../styles/modules.css";

const LaporanList = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, nomor: "LAP-2025-001", judul: "Laporan Kehadiran Mahasiswa Mei 2025", tipe: "Akademik", dibuatOleh: "Ahmad Rizki", tanggal: "2025-05-31" },
    { id: 2, nomor: "LAP-2025-002", judul: "Laporan Keuangan SPP Semester Ganjil 2025", tipe: "Keuangan", dibuatOleh: "Siti Nurhaliza", tanggal: "2025-05-28" },
    { id: 3, nomor: "LAP-2025-003", judul: "Laporan Kinerja Dosen Semester Ganjil 2025", tipe: "Akademik", dibuatOleh: "Budi Santoso", tanggal: "2025-05-25" },
  ];

  const handleExport = (judul) => {
    alert(`Mengekspor laporan "${judul}" ke CSV...`);
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Laporan</h1>
        <p>Lihat dan buat laporan akademik atau keuangan</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari laporan..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <Link to="/laporan/buat" className="btn btn-primary">
          <FiPlus /> Buat Laporan
        </Link>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Judul Laporan</th>
              <th>Tipe</th>
              <th>Dibuat Oleh</th>
              <th>Tanggal Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.nomor}</td>
                <td style={{ fontWeight: 500 }}>{row.judul}</td>
                <td><span className={`badge ${row.tipe === "Keuangan" ? "badge-warning" : "badge-info"}`}>{row.tipe}</span></td>
                <td>{row.dibuatOleh}</td>
                <td>{row.tanggal}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn-view" title="Export CSV" onClick={() => handleExport(row.judul)}><FiDownload /></button>
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

export default LaporanList;
