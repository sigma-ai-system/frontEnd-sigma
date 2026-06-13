import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../../styles/modules.css";

const MahasiswaList = () => {
  const [search, setSearch] = useState("");

  // Data dummy
  const data = [
    { id: 1, nim: "2024001", nama: "Ahmad Rizki", kelas: "A", jurusan: "Teknik Informatika", status: "Aktif" },
    { id: 2, nim: "2024002", nama: "Siti Nurhaliza", kelas: "B", jurusan: "Sistem Informasi", status: "Aktif" },
    { id: 3, nim: "2024003", nama: "Budi Santoso", kelas: "A", jurusan: "Teknik Informatika", status: "Cuti" },
    { id: 4, nim: "2024004", nama: "Dewi Lestari", kelas: "C", jurusan: "Manajemen Informatika", status: "Aktif" },
    { id: 5, nim: "2024005", nama: "Eko Prasetyo", kelas: "B", jurusan: "Teknik Informatika", status: "Aktif" },
  ];

  const filtered = data.filter(
    (d) =>
      d.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.nim.includes(search)
  );

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Data Mahasiswa</h1>
        <p>Lihat dan kelola seluruh data mahasiswa</p>
      </div>

      <div className="module-toolbar">
        <div className="module-toolbar-left">
          <div className="module-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Cari nama atau NIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="module-filter">
            <option value="">Semua Kelas</option>
            <option value="A">Kelas A</option>
            <option value="B">Kelas B</option>
            <option value="C">Kelas C</option>
          </select>
        </div>
        <Link to="/mahasiswa/master/tambah" className="btn btn-primary">
          <FiPlus /> Tambah Mahasiswa
        </Link>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((mhs) => (
              <tr key={mhs.id}>
                <td>{mhs.nim}</td>
                <td style={{ fontWeight: 500 }}>{mhs.nama}</td>
                <td>{mhs.kelas}</td>
                <td>{mhs.jurusan}</td>
                <td>
                  <span className={`badge ${mhs.status === "Aktif" ? "badge-success" : "badge-warning"}`}>
                    {mhs.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="btn-view" title="Lihat"><FiEye /></button>
                    <button className="btn-edit" title="Edit"><FiEdit /></button>
                    <button className="btn-delete" title="Hapus"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Menampilkan 1-5 dari {filtered.length} data</span>
          <div className="pagination-buttons">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaList;
