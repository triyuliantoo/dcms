// File: dcmsweb/src/pages/errors/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-2">Page not found</p>
        <Link to="/dashboard" className="text-indigo-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
