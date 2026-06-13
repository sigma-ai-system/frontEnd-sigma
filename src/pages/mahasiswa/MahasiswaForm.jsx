import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const MahasiswaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nim: "", nama: "", email: "", telepon: "", jurusan: "", alamat: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data mahasiswa berhasil disimpan!");
    navigate("/mahasiswa/master");
  };

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Tambah Mahasiswa</h1>
        <p>Input data mahasiswa baru</p>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>NIM</label>
              <input className="form-input" name="nim" placeholder="Nomor Induk Mahasiswa" value={formData.nim} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input className="form-input" name="nama" placeholder="Nama lengkap" value={formData.nama} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input className="form-input" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telepon</label>
              <input className="form-input" name="telepon" placeholder="No. telepon" value={formData.telepon} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Jurusan</label>
            <select className="form-select" name="jurusan" value={formData.jurusan} onChange={handleChange} required>
              <option value="">Pilih jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Manajemen Informatika">Manajemen Informatika</option>
            </select>
          </div>
          <div className="form-group">
            <label>Alamat</label>
            <textarea className="form-input" name="alamat" placeholder="Alamat lengkap" rows={3} value={formData.alamat} onChange={handleChange} style={{ resize: "vertical" }} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaForm;
