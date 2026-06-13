import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../../styles/modules.css";

const DosenList = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, nidn: "0001098501", nama: "Dr. Suharto, M.Kom", email: "suharto@sigma.ac.id", bidang: "Basis Data", status: "Aktif" },
    { id: 2, nidn: "0002087601", nama: "Prof. Anita Dewi, Ph.D", email: "anita@sigma.ac.id", bidang: "Machine Learning", status: "Aktif" },
    { id: 3, nidn: "0003076502", nama: "Dr. Rahman, M.T", email: "rahman@sigma.ac.id", bidang: "Jaringan Komputer", status: "Cuti" },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Data Dosen</h1>
        <p>Lihat seluruh data dosen</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari nama atau NIDN..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <Link to="/dosen/tambah" className="btn btn-primary"><FiPlus /> Tambah Dosen</Link>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIDN</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Bidang</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.nidn}</td>
                <td style={{ fontWeight: 500 }}>{d.nama}</td>
                <td>{d.email}</td>
                <td>{d.bidang}</td>
                <td><span className={`badge ${d.status === "Aktif" ? "badge-success" : "badge-warning"}`}>{d.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Link to={`/dosen/${d.id}`} className="btn-view" title="Detail"><FiEye /></Link>
                    <Link to={`/dosen/${d.id}/edit`} className="btn-edit" title="Edit"><FiEdit /></Link>
                    <button className="btn-delete" title="Hapus"><FiTrash2 /></button>
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

export default DosenList;
