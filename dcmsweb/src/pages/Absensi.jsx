// File: dcmsweb/src/pages/Absensi.jsx
import React from 'react';

const dummyData = [
  { id: 1, name: 'Agus', date: '2025-05-01', status: 'Present' },
  { id: 2, name: 'Rina', date: '2025-05-01', status: 'Late' },
  { id: 3, name: 'Budi', date: '2025-05-01', status: 'Absent' },
];

const Absensi = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Absensi Karyawan</h2>
      <table border="1" cellPadding="10" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, i) => (
            <tr key={row.id}>
              <td>{i + 1}</td>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absensi;
