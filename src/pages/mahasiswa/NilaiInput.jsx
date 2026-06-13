import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules.css";

const NilaiInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nim: "", mataKuliah: "", nilai: "", semester: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Nilai berhasil diinput!");
    navigate("/mahasiswa/kelas");
  };

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Input Nilai</h1>
        <p>Masukkan nilai mahasiswa</p>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>NIM Mahasiswa</label>
              <input className="form-input" name="nim" placeholder="Masukkan NIM" value={formData.nim} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mata Kuliah</label>
              <input className="form-input" name="mataKuliah" placeholder="Nama mata kuliah" value={formData.mataKuliah} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nilai</label>
              <select className="form-select" name="nilai" value={formData.nilai} onChange={handleChange} required>
                <option value="">Pilih nilai</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <div className="form-group">
              <label>Semester</label>
              <select className="form-select" name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Pilih semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Nilai</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NilaiInput;
