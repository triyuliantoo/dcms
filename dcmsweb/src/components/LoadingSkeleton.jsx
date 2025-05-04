// File: dcmsweb/src/components/LoadingSkeleton.jsx
import React from 'react';

const LoadingSkeleton = ({ lines = 3 }) => {
  return (
    <div className="animate-pulse space-y-2">
      {[...Array(lines)].map((_, idx) => (
        <div key={idx} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
