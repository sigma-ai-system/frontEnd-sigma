import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const DosenForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nidn: "", nama: "", email: "", telepon: "", bidang: "", jabatan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data dosen berhasil disimpan!");
    navigate("/dosen");
  };

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Tambah Dosen</h1>
        <p>Input data dosen baru</p>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>NIDN</label>
              <input className="form-input" name="nidn" placeholder="Nomor Induk Dosen" value={formData.nidn} onChange={handleChange} required />
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
          <div className="form-row">
            <div className="form-group">
              <label>Bidang Keahlian</label>
              <input className="form-input" name="bidang" placeholder="Contoh: Basis Data" value={formData.bidang} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Jabatan</label>
              <select className="form-select" name="jabatan" value={formData.jabatan} onChange={handleChange}>
                <option value="">Pilih jabatan</option>
                <option value="Asisten Ahli">Asisten Ahli</option>
                <option value="Lektor">Lektor</option>
                <option value="Lektor Kepala">Lektor Kepala</option>
                <option value="Guru Besar">Guru Besar</option>
              </select>
            </div>
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

export default DosenForm;
