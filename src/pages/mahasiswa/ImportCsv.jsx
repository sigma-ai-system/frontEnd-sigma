import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiDownload } from "react-icons/fi";
import "../../styles/modules.css";

const ImportCsv = () => {
  const navigate = useNavigate();

  return (
    <div className="module-page form-page">
      <div className="page-header">
        <h1>Import / Export CSV</h1>
        <p>Upload data mahasiswa via file CSV atau export data</p>
      </div>

      <div className="form-card">
        {/* Import */}
        <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Import Data</h3>
        <div className="import-zone">
          <div className="import-zone-icon"><FiUploadCloud /></div>
          <h4>Drag & drop file CSV di sini</h4>
          <p>atau klik untuk memilih file (.csv, max 5MB)</p>
        </div>

        <div style={{ borderTop: "1px solid var(--border-light)", margin: "28px 0" }} />

        {/* Export */}
        <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Export Data</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 16 }}>
          Download seluruh data mahasiswa dalam format CSV.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary"><FiDownload /> Export Semua Data</button>
          <button className="btn btn-secondary"><FiDownload /> Export per Kelas</button>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default ImportCsv;
