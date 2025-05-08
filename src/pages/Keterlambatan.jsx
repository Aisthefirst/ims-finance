import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const keterlambatanData = [
  {
    kontrak_no: 'AGR00001',
    client_name: 'SUGUS',
    installment_no: 6,
    hari_keterlambatan: 50,
    total_denda: 645350,
  },
  {
    kontrak_no: 'AGR00001',
    client_name: 'SUGUS',
    installment_no: 7,
    hari_keterlambatan: 20,
    total_denda: 258140,
  },
];

const formatRupiah = (angka) => {
  return angka.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
};

export default function Keterlambatan() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Keterlambatan Pembayaran</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-secondary">
          <tr>
            <th>KONTRAK NO</th>
            <th>CLIENT NAME</th>
            <th>INSTALLMENT NO</th>
            <th>HARI KETERLAMBATAN</th>
            <th>TOTAL DENDA</th>
          </tr>
        </thead>
        <tbody>
          {keterlambatanData.map((item, index) => (
            <tr key={index}>
              <td>{item.kontrak_no}</td>
              <td>{item.client_name}</td>
              <td>{item.installment_no}</td>
              <td>{item.hari_keterlambatan} hari</td>
              <td>{formatRupiah(item.total_denda)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
