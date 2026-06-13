import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiDollarSign } from "react-icons/fi";
import "../../styles/modules.css";

const SppList = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, nim: "2024001", nama: "Ahmad Rizki", semester: "Ganjil 2025", nominal: "Rp 5.000.000", status: "Lunas", tgl: "2025-01-15" },
    { id: 2, nim: "2024002", nama: "Siti Nurhaliza", semester: "Ganjil 2025", nominal: "Rp 5.000.000", status: "Sebagian", tgl: "2025-02-10" },
    { id: 3, nim: "2024003", nama: "Budi Santoso", semester: "Ganjil 2025", nominal: "Rp 5.000.000", status: "Belum", tgl: "-" },
    { id: 4, nim: "2024004", nama: "Dewi Lestari", semester: "Ganjil 2025", nominal: "Rp 5.000.000", status: "Lunas", tgl: "2025-01-20" },
  ];

  const statusBadge = (status) => {
    if (status === "Lunas") return "badge-success";
    if (status === "Sebagian") return "badge-warning";
    return "badge-danger";
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Data SPP</h1>
        <p>Lihat status pembayaran SPP seluruh mahasiswa</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari nama atau NIM..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="module-filter">
            <option value="">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Sebagian">Sebagian</option>
            <option value="Belum">Belum Bayar</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Semester</th>
              <th>Nominal</th>
              <th>Tanggal Bayar</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.nim}</td>
                <td style={{ fontWeight: 500 }}>{row.nama}</td>
                <td>{row.semester}</td>
                <td>{row.nominal}</td>
                <td>{row.tgl}</td>
                <td><span className={`badge ${statusBadge(row.status)}`}>{row.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Link to={`/spp/${row.id}`} className="btn-view" title="Detail"><FiEye /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Menampilkan 1-4 dari 4 data</span>
          <div className="pagination-buttons"><button className="active">1</button></div>
        </div>
      </div>
    </div>
  );
};

export default SppList;
