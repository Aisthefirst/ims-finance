import { useEffect, useState } from "react";
import axios from "axios";

export default function StatusCicilan() {
  const [clientList, setClientList] = useState([]);
  const [selectedKontrak, setSelectedKontrak] = useState("");
  const [jadwal, setJadwal] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/clients").then((res) => {
      setClientList(res.data);
    });
  }, []);

  const fetchJadwal = (kontrak_no) => {
    axios.get(`http://localhost:3001/api/jadwal/${kontrak_no}`).then((res) => {
      setJadwal(res.data);
    });
  };

  const tandaiLunas = (id) => {
    axios.post(`http://localhost:3001/api/bayar/${id}`).then(() => {
      fetchJadwal(selectedKontrak); // refresh data
    });
  };

  return (
    <div className="container mt-4">
      <h3>Status Pembayaran Cicilan</h3>
      <select
        className="form-select my-3"
        onChange={(e) => {
          setSelectedKontrak(e.target.value);
          fetchJadwal(e.target.value);
        }}
      >
        <option>Pilih Client</option>
        {clientList.map((client) => (
          <option key={client.kontrak_no} value={client.kontrak_no}>
            {client.client_name}
          </option>
        ))}
      </select>

      {jadwal.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Angsuran Ke</th>
              <th>Tanggal Jatuh Tempo</th>
              <th>Nominal</th>
              <th>Status</th>
              <th>Tanggal Bayar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item) => (
              <tr key={item.id}>
                <td>{item.angsuran_ke}</td>
                <td>{item.tanggal_jatuh_tempo}</td>
                <td>{item.angsuran_per_bulan}</td>
                <td>{item.status}</td>
                <td>{item.tanggal_pembayaran || "-"}</td>
                <td>
                  {item.status === "BELUM" && (
                    <button className="btn btn-success" onClick={() => tandaiLunas(item.id)}>
                      Tandai Lunas
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
