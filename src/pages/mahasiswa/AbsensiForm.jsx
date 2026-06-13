import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const AbsensiForm = () => {
  const navigate = useNavigate();

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Input Absensi</h1>
        <p>Rekam kehadiran mahasiswa</p>
      </div>
      <div className="form-card">
        <form onSubmit={(e) => { e.preventDefault(); alert("Absensi disimpan!"); navigate(-1); }}>
          <div className="form-row">
            <div className="form-group">
              <label>Tanggal</label>
              <input className="form-input" type="date" required />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <select className="form-select" required>
                <option value="">Pilih kelas</option>
                <option value="A">Kelas A</option>
                <option value="B">Kelas B</option>
                <option value="C">Kelas C</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Mata Kuliah</label>
            <input className="form-input" placeholder="Nama mata kuliah" required />
          </div>
          <p style={{ fontSize: "0.813rem", color: "var(--text-muted)", marginBottom: 16 }}>
            Daftar mahasiswa akan muncul setelah memilih kelas. Centang yang hadir.
          </p>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Absensi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AbsensiForm;
