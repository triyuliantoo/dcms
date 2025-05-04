// File: dcmsweb/src/pages/errors/Forbidden.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">403</h1>
        <p className="text-lg text-gray-700 mb-2">Access denied</p>
        <Link to="/dashboard" className="text-indigo-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
