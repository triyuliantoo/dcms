// File: dcmsweb/src/pages/Payroll.jsx
import React from 'react';

const dummyPayroll = [
  { id: 1, name: 'Agus', position: 'Staff', salary: 5000000 },
  { id: 2, name: 'Rina', position: 'Manager', salary: 8500000 },
  { id: 3, name: 'Budi', position: 'Kasir', salary: 4200000 },
];

const Payroll = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Data Gaji</h2>
      <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
        {dummyPayroll.map(item => (
          <div key={item.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            minWidth: '200px'
          }}>
            <h4>{item.name}</h4>
            <p>Posisi: {item.position}</p>
            <p>Gaji: Rp {item.salary.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payroll;
