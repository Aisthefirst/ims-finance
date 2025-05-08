const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.post('/api/kontrak', (req, res) => {
    const { kontrak_no, client_name, otr, dp, tenor, bunga, angsuran_per_bulan } = req.body;
    const sql = `
      INSERT INTO kontrak (kontrak_no, client_name, otr, dp, tenor, bunga, angsuran_per_bulan) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [kontrak_no, client_name, otr, dp, tenor, bunga, angsuran_per_bulan], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Data kontrak + angsuran berhasil disimpan' });
    });
});

  app.get('/api/clients', (req, res) => {
    db.query('SELECT kontrak_no, client_name FROM kontrak', (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  app.get('/api/kontrak/:kontrak_no', (req, res) => {
    const kontrak_no = req.params.kontrak_no;
    const sql = `SELECT * FROM kontrak WHERE kontrak_no = ?`;
    db.query(sql, [kontrak_no], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result[0]);
    });
  });
  app.post('/api/bayar/:id', (req, res) => {
    const id = req.params.id;
    const tanggalPembayaran = new Date();
    const sql = 'UPDATE jadwal_angsuran SET status = ?, tanggal_pembayaran = ? WHERE id = ?';
    db.query(sql, ['LUNAS', tanggalPembayaran, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Cicilan ditandai sebagai lunas.' });
    });
  });
  app.get('/api/jadwal/:kontrak_no', (req, res) => {
    const kontrak_no = req.params.kontrak_no;
    const sql = 'SELECT * FROM jadwal_angsuran WHERE kontrak_no = ?';
    db.query(sql, [kontrak_no], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  app.get('/api/jatuh-tempo', (req, res) => {
    const sql = `
      SELECT 
        j.kontrak_no, 
        k.client_name, 
        j.angsuran_ke, 
        j.tanggal_jatuh_tempo,
        j.status,
        j.angsuran_per_bulan
      FROM jadwal_angsuran j
      JOIN kontrak k ON j.kontrak_no = k.kontrak_no
      ORDER BY j.tanggal_jatuh_tempo ASC
    `;
  
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  app.put('/api/kontrak/:kontrak_no', (req, res) => {
    const kontrak_no = req.params.kontrak_no;
    const { angsuran_per_bulan } = req.body;

    const sql = 'UPDATE kontrak SET angsuran_per_bulan = ? WHERE kontrak_no = ?';
    db.query(sql, [angsuran_per_bulan, kontrak_no], (err, result) => {
        if (err) {
            console.error('Gagal update angsuran_per_bulan:', err);
            return res.status(500).send('Update gagal');
        }
        res.send({ success: true });
    });
});

    
                                        

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
  database: 'ims_finance', // ganti dengan nama database
});

// Cek koneksi
db.connect((err) => {
  if (err) throw err;
  console.log('Terkoneksi ke database MySQL!');
});

// app.post('/api/kontrak', (req, res) => {
//   const { kontrak_no, client_name, otr, dp, tenor } = req.body;
//   const sql = `INSERT INTO kontrak (kontrak_no, client_name, otr, dp, tenor) VALUES (?, ?, ?, ?, ?)`;
//   db.query(sql, [kontrak_no, client_name, otr, dp, tenor], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: 'Data kontrak berhasil disimpan' });
//   });
// });

// Jalankan server
app.listen(3001, () => {
  console.log('Server berjalan di http://localhost:3001');
});
