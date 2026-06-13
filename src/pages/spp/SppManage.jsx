import React, { useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import "../../styles/modules.css";

const SppManage = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, nim: "2024002", nama: "Siti Nurhaliza", nominal: "Rp 5.000.000", terbayar: "Rp 2.500.000", status: "Sebagian" },
    { id: 2, nim: "2024003", nama: "Budi Santoso", nominal: "Rp 5.000.000", terbayar: "Rp 0", status: "Belum" },
    { id: 3, nim: "2024005", nama: "Eko Prasetyo", nominal: "Rp 5.000.000", terbayar: "Rp 3.000.000", status: "Sebagian" },
  ];

  const handleUbahStatus = (id) => {
    alert(`Ubah status pembayaran untuk ID: ${id}`);
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Manajemen SPP</h1>
        <p>Kelola dan ubah status pembayaran SPP mahasiswa</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari nama atau NIM..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Nominal</th>
              <th>Terbayar</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.nim}</td>
                <td style={{ fontWeight: 500 }}>{row.nama}</td>
                <td>{row.nominal}</td>
                <td>{row.terbayar}</td>
                <td><span className={`badge ${row.status === "Sebagian" ? "badge-warning" : "badge-danger"}`}>{row.status}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="btn-edit" title="Ubah Status" onClick={() => handleUbahStatus(row.id)}><FiEdit /></button>
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

export default SppManage;
