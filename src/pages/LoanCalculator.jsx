import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function LoanCalculator() {
  const [otr, setOtr] = useState(0);
  const [dpPercent, setDpPercent] = useState(0);
  const [duration, setDuration] = useState(0); // tahun
  const [installments, setInstallments] = useState([]);

  const calculateInstallments = () => {
    const dp = (dpPercent / 100) * otr;
    const loanAmount = otr - dp;
    const months = duration * 12;
    const monthlyInstallment = Math.round(loanAmount / months);
    
    let bungaPersen = 0;

    if (duration <= 12) {
      bungaPersen = 0.12;
    } else if (duration > 12 && duration <= 24) {
      bungaPersen = 0.14;
    } else if (duration > 24) {
      bungaPersen = 0.165; // 16.5%
    }

    const now = new Date();
    const results = [];

    for (let i = 0; i < months; i++) {
      const dueDate = new Date(now.getFullYear(), now.getMonth() + i, 25);
      results.push({
        angsuranKe: i + 1,
        amount: monthlyInstallment,
        dueDate: dueDate.toISOString().split("T")[0],
      });
    }

    setInstallments(results);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Kalkulator Kredit Mobil</h2>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Harga Mobil (OTR)</label>
          <input
            type="number"
            value={otr}
            onChange={(e) => setOtr(Number(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Down Payment (%)</label>
          <input
            type="number"
            value={dpPercent}
            onChange={(e) => setDpPercent(Number(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Lama Cicilan (tahun)</label>
          <input
            type="number"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={calculateInstallments}>
        Hitung Angsuran
      </button>

      {installments.length > 0 && (
        <>
          <h5 className="mb-3">Jadwal Angsuran</h5>
          <table className="table table-bordered table-striped">
            <thead className="table-secondary">
              <tr>
                <th>Angsuran Ke</th>
                <th>Jumlah (Rp)</th>
                <th>Jatuh Tempo</th>
              </tr>
            </thead>
            <tbody>
              {installments.map((item, index) => (
                <tr key={index}>
                  <td>{item.angsuranKe}</td>
                  <td>{item.amount.toLocaleString("id-ID")}</td>
                  <td>{item.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default LoanCalculator;
