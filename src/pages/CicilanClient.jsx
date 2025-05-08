import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CicilanClient() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [kontrakDetail, setKontrakDetail] = useState(null);
    const [jadwalAngsuran, setJadwalAngsuran] = useState([]);

    // Ambil semua client saat pertama load
    useEffect(() => {
        axios.get('http://localhost:3001/api/clients')
            .then((res) => setClients(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSelect = (e) => {
        const kontrak_no = e.target.value;
        setSelectedClient(kontrak_no);
    
        axios.get(`http://localhost:3001/api/kontrak/${kontrak_no}`)
            .then((res) => {
                setKontrakDetail(res.data);
    
                const tenor = res.data.tenor;
                const pokok = res.data.otr - res.data.dp;
                const bungaTotal = pokok * (res.data.bunga) * (tenor / 12);
                const totalCicilan = pokok + bungaTotal;
                const angsuran = totalCicilan / tenor;
    
                //Simpan angsuran ke DB
                axios.put(`http://localhost:3001/api/kontrak/${kontrak_no}`, {
                    angsuran_per_bulan: Math.round(angsuran)
                }).catch((err) => console.error('Gagal update angsuran per bulan:', err));
    
                const startDate = new Date();
                const jadwal = [];
                for (let i = 1; i <= tenor; i++) {
                    const jatuhTempo = new Date(startDate);
                    jatuhTempo.setMonth(startDate.getMonth() + i);
                    jadwal.push({
                        angsuran_ke: i,
                        tanggal_jatuh_tempo: jatuhTempo.toISOString().slice(0, 10),
                        nominal: angsuran
                    });
                }
    
                setJadwalAngsuran(jadwal);
            })
            .catch((err) => console.error(err));
    };
    
    // console.log('Angsuran per bulan yang dihitung:', Math.round(angsuran));

    return (
        <div className="container mt-5">
            <h3>Jadwal Cicilan Client</h3>
            <div className="mb-3">
                <label className="form-label">Pilih Client</label>
                <select className="form-select" onChange={handleSelect}>
                    <option value="">-- Pilih --</option>
                    {clients.map((c) => (
                        <option key={c.kontrak_no} value={c.kontrak_no}>
                            {c.client_name}
                        </option>
                    ))}
                </select>
            </div>

            {kontrakDetail && (
                <div>
                    <h5>Detail Kontrak</h5>
                    <p><strong>Nama:</strong> {kontrakDetail.client_name}</p>
                    <p><strong>OTR:</strong> Rp{kontrakDetail.otr.toLocaleString()}</p>
                    <p><strong>DP:</strong> Rp{kontrakDetail.dp.toLocaleString()}</p>
                    <p><strong>Bunga:</strong> {kontrakDetail.bunga}%</p>
                    <p><strong>Tenor:</strong> {kontrakDetail.tenor} bulan</p>

                    <h5 className="mt-4">Tabel Jadwal Angsuran</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Angsuran ke</th>
                                <th>Tanggal Jatuh Tempo</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalAngsuran.map((a, idx) => (
                                <tr key={idx}>
                                    <td>{a.angsuran_ke}</td>
                                    <td>{a.tanggal_jatuh_tempo}</td>
                                    <td>Rp{Math.round(a.nominal).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CicilanClient;
