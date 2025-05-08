import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function InputClient() {
  const [formData, setFormData] = useState({
    kontrak_no: '',
    client_name: '',
    otr: '',
    dp_percent: 20,
    tenor: 18,
    // angsuran:'',
  });

  const [hasilSimulasi, setHasilSimulasi] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'dp_percent' || name === 'tenor' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otr = parseInt(formData.otr);
    const dp = Math.round((formData.dp_percent / 100) * otr);
    const tenor = parseInt(formData.tenor);
    const sisa_pembiayaan = otr - dp;
    const jangkawaktubulan = tenor;
    // const angsuran = parseInt(formData.angsuran);

    // Tentukan bunga tahunan
    let bungaPersen = 0;
    if (tenor <= 12) {
      bungaPersen = 0.12;
    } else if (tenor > 12 && tenor <= 24) {
      bungaPersen = 0.14;
    } else if (tenor > 24) {
      bungaPersen = 0.165;
    }

    // Hitung bunga total dan cicilan
    const bungaTotal = sisa_pembiayaan * bungaPersen * (jangkawaktubulan / 12);
    const totalPinjaman = sisa_pembiayaan + bungaTotal;
    const angsuran_per_bulan = totalPinjaman / jangkawaktubulan;

    setHasilSimulasi({
      kontrak_no: formData.kontrak_no,
      client_name: formData.client_name,
      otr,
      dp,
      tenor,
      bunga: bungaPersen,
      bunga_total: bungaTotal,
      angsuran_per_bulan,
      
    });

    try {
      await axios.post('http://localhost:3001/api/kontrak', {
        kontrak_no: formData.kontrak_no,
        client_name: formData.client_name,
        otr,
        dp,
        tenor,
        bunga: bungaPersen,
      });
      alert('Data berhasil disimpan ke database!');
    } catch (error) {
      console.error('Gagal menyimpan:', error);
      alert('Gagal menyimpan data.');
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Input Data Client</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Kontrak No</label>
          <input type="text" className="form-control" name="kontrak_no" required onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nama Client</label>
          <input type="text" className="form-control" name="client_name" required onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Harga Mobil (OTR)</label>
          <input type="number" className="form-control" name="otr" required onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">DP (%)</label>
          <input type="number" className="form-control" name="dp_percent" value={formData.dp_percent} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Tenor (bulan)</label>
          <input type="number" className="form-control" name="tenor" value={formData.tenor} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Simpan & Simulasikan</button>
        </div>
      </form>

      {hasilSimulasi && (
        <div className="mt-5">
          <h4>Hasil Simulasi:</h4>
          <ul className="list-group">
            <li className="list-group-item"><strong>Kontrak:</strong> {hasilSimulasi.kontrak_no}</li>
            <li className="list-group-item"><strong>Client:</strong> {hasilSimulasi.client_name}</li>
            <li className="list-group-item"><strong>Harga Mobil:</strong> Rp {hasilSimulasi.otr.toLocaleString()}</li>
            <li className="list-group-item"><strong>Down Payment:</strong> Rp {hasilSimulasi.dp.toLocaleString()}</li>
            <li className="list-group-item"><strong>Tenor:</strong> {hasilSimulasi.tenor} bulan</li>
            <li className="list-group-item"><strong>Angsuran per Bulan:</strong> Rp {Math.round(hasilSimulasi.angsuran_per_bulan).toLocaleString()}</li>
            <li className="list-group-item"><strong>Bunga Total:</strong> Rp {Math.round(hasilSimulasi.bunga_total).toLocaleString()}</li>
            <li className="list-group-item"><strong>Bunga Persen:</strong> {Math.round(hasilSimulasi.bunga * 100)}%</li>

          </ul>
        </div>
      )}
    </div>
  );
}
