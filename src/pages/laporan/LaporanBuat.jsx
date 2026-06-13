import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const LaporanBuat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ judul: "", tipe: "Akademik", periodeMulai: "", periodeSelesai: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Laporan "${formData.judul}" berhasil dibuat!`);
    navigate("/laporan");
  };

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Buat Laporan</h1>
        <p>Generate laporan akademik atau keuangan baru</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul Laporan</label>
            <input className="form-input" placeholder="Masukkan judul laporan" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Tipe Laporan</label>
            <select className="form-select" value={formData.tipe} onChange={(e) => setFormData({ ...formData, tipe: e.target.value })} required>
              <option value="Akademik">Akademik (Nilai, Absensi, Mahasiswa)</option>
              <option value="Keuangan">Keuangan (Pembayaran SPP)</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Periode Mulai</label>
              <input className="form-input" type="date" value={formData.periodeMulai} onChange={(e) => setFormData({ ...formData, periodeMulai: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Periode Selesai</label>
              <input className="form-input" type="date" value={formData.periodeSelesai} onChange={(e) => setFormData({ ...formData, periodeSelesai: e.target.value })} required />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button type="submit" className="btn btn-primary">Generate Laporan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaporanBuat;
