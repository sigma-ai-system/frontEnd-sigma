import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../../styles/modules.css";

const DosenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const detail = {
    nidn: "0001098501",
    nama: "Dr. Suharto, M.Kom",
    email: "suharto@sigma.ac.id",
    telepon: "081234567890",
    bidang: "Basis Data",
    jabatan: "Lektor Kepala",
    status: "Aktif",
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Detail Dosen</h1>
        <p>NIDN: {detail.nidn}</p>
      </div>

      <div className="detail-card">
        <div className="detail-row"><span className="detail-label">NIDN</span><span className="detail-value">{detail.nidn}</span></div>
        <div className="detail-row"><span className="detail-label">Nama</span><span className="detail-value">{detail.nama}</span></div>
        <div className="detail-row"><span className="detail-label">Email</span><span className="detail-value">{detail.email}</span></div>
        <div className="detail-row"><span className="detail-label">Telepon</span><span className="detail-value">{detail.telepon}</span></div>
        <div className="detail-row"><span className="detail-label">Bidang Keahlian</span><span className="detail-value">{detail.bidang}</span></div>
        <div className="detail-row"><span className="detail-label">Jabatan</span><span className="detail-value">{detail.jabatan}</span></div>
        <div className="detail-row"><span className="detail-label">Status</span><span className="detail-value"><span className="badge badge-success">{detail.status}</span></span></div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}><FiArrowLeft /> Kembali</button>
        <Link to={`/dosen/${id}/edit`} className="btn btn-primary"><FiEdit /> Edit Data</Link>
      </div>
    </div>
  );
};

export default DosenDetail;
