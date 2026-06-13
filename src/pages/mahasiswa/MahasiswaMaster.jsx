import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiEdit, FiTrash2, FiPlus, FiUploadCloud } from "react-icons/fi";
import "../../styles/modules.css";

const MahasiswaMaster = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, nim: "2024001", nama: "Ahmad Rizki", email: "ahmad@email.com", telepon: "081234567890", jurusan: "Teknik Informatika" },
    { id: 2, nim: "2024002", nama: "Siti Nurhaliza", email: "siti@email.com", telepon: "081234567891", jurusan: "Sistem Informasi" },
    { id: 3, nim: "2024003", nama: "Budi Santoso", email: "budi@email.com", telepon: "081234567892", jurusan: "Teknik Informatika" },
  ];

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Master Data Mahasiswa</h1>
        <p>Kelola data induk mahasiswa (CRUD)</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Cari nama atau NIM..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/mahasiswa/import-csv" className="btn btn-secondary btn-sm">
            <FiUploadCloud /> Import CSV
          </Link>
          <Link to="/mahasiswa/master/tambah" className="btn btn-primary">
            <FiPlus /> Tambah Data
          </Link>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Jurusan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((mhs) => (
              <tr key={mhs.id}>
                <td>{mhs.nim}</td>
                <td style={{ fontWeight: 500 }}>{mhs.nama}</td>
                <td>{mhs.email}</td>
                <td>{mhs.telepon}</td>
                <td>{mhs.jurusan}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn-view" title="Lihat"><FiEye /></button>
                    <Link to={`/mahasiswa/master/${mhs.id}/edit`} className="btn-edit" title="Edit"><FiEdit /></Link>
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

export default MahasiswaMaster;
