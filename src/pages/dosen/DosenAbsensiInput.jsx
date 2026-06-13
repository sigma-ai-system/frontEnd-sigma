import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const DosenAbsensiInput = () => {
  const navigate = useNavigate();

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Input Absensi Dosen</h1>
        <p>Rekam kehadiran dosen</p>
      </div>
      <div className="form-card">
        <form onSubmit={(e) => { e.preventDefault(); alert("Absensi dosen disimpan!"); navigate(-1); }}>
          <div className="form-row">
            <div className="form-group">
              <label>Tanggal</label>
              <input className="form-input" type="date" required />
            </div>
            <div className="form-group">
              <label>Dosen</label>
              <select className="form-select" required>
                <option value="">Pilih dosen</option>
                <option value="1">Dr. Suharto, M.Kom</option>
                <option value="2">Prof. Anita Dewi, Ph.D</option>
                <option value="3">Dr. Rahman, M.T</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mata Kuliah</label>
              <input className="form-input" placeholder="Nama mata kuliah" required />
            </div>
            <div className="form-group">
              <label>Status Kehadiran</label>
              <select className="form-select" required>
                <option value="">Pilih status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alpha">Alpha</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Absensi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenAbsensiInput;
