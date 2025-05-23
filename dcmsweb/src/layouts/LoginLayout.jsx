// File: dcmsweb/src/layouts/LoginLayout.jsx
import React from 'react';

export default function LoginLayout({ children }) {
  return (
    <div className="login-page min-h-screen flex items-center justify-center bg-gray-100">
      <div className="login-container w-full max-w-[360px] bg-white rounded-xl shadow-md p-6 space-y-5">
        <div className="flex flex-col items-center mb-2">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-12 w-12 object-contain"
            style={{ maxWidth: '48px', maxHeight: '48px' }}
          />
          <span
            className="text-sm font-medium mt-1"
            style={{ color: '#05808c' }}
          >
            Dobytes CMS
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
