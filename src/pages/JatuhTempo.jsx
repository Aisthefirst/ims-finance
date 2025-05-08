import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JatuhTempo = () => {
  const [data, setData] = useState([]);
  const tanggalSekarang = new Date('2024-08-14'); // Batas waktu evaluasi

  useEffect(() => {
    axios.get('http://localhost:3001/api/jatuh-tempo')
      .then(res => {
        const processedData = res.data.map(row => {
          const jatuhTempo = new Date(row.tanggal_jatuh_tempo);
          const terlambat = !row.sudah_dibayar && jatuhTempo < tanggalSekarang;
          const hariKeterlambatan = terlambat
            ? Math.ceil((tanggalSekarang - jatuhTempo) / (1000 * 60 * 60 * 24))
            : 0;
          const totalDenda = terlambat
            ? row.angsuran_per_bulan * 0.001 * hariKeterlambatan
            : 0;

          return {
            ...row,
            hari_keterlambatan: hariKeterlambatan,
            total_denda: totalDenda
          };
        });

        setData(processedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Angsuran Jatuh Tempo s.d. 14 Agustus 2024</h2>
      <table className="table table-bordered table-striped">
        <thead className='table-secondary'>
          <tr>
            <th>Kontrak No</th>
            <th>Client Name</th>
            <th>Installment No</th>
            <th>Hari Keterlambatan</th>
            <th>Total Denda</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.kontrak_no}</td>
              <td>{row.client_name}</td>
              <td>{row.angsuran_ke}</td>
              <td>{row.hari_keterlambatan}</td>
              <td>Rp {row.total_denda.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JatuhTempo;
