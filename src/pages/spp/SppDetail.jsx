import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../../styles/modules.css";

const SppDetail = () => {
  const navigate = useNavigate();

  // Data dummy
  const detail = {
    nim: "2024001",
    nama: "Ahmad Rizki",
    jurusan: "Teknik Informatika",
    semester: "Ganjil 2025",
    nominal: "Rp 5.000.000",
    terbayar: "Rp 5.000.000",
    sisa: "Rp 0",
    status: "Lunas",
    tanggalBayar: "15 Januari 2025",
    metode: "Transfer Bank",
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <h1>Detail Pembayaran SPP</h1>
        <p>NIM: {detail.nim} — {detail.nama}</p>
      </div>

      <div className="detail-card">
        <div className="detail-row"><span className="detail-label">NIM</span><span className="detail-value">{detail.nim}</span></div>
        <div className="detail-row"><span className="detail-label">Nama</span><span className="detail-value">{detail.nama}</span></div>
        <div className="detail-row"><span className="detail-label">Jurusan</span><span className="detail-value">{detail.jurusan}</span></div>
        <div className="detail-row"><span className="detail-label">Semester</span><span className="detail-value">{detail.semester}</span></div>
        <div className="detail-row"><span className="detail-label">Nominal SPP</span><span className="detail-value">{detail.nominal}</span></div>
        <div className="detail-row"><span className="detail-label">Terbayar</span><span className="detail-value">{detail.terbayar}</span></div>
        <div className="detail-row"><span className="detail-label">Sisa</span><span className="detail-value">{detail.sisa}</span></div>
        <div className="detail-row"><span className="detail-label">Status</span><span className="detail-value"><span className="badge badge-success">{detail.status}</span></span></div>
        <div className="detail-row"><span className="detail-label">Tanggal Bayar</span><span className="detail-value">{detail.tanggalBayar}</span></div>
        <div className="detail-row"><span className="detail-label">Metode</span><span className="detail-value">{detail.metode}</span></div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}><FiArrowLeft /> Kembali</button>
      </div>
    </div>
  );
};

export default SppDetail;
