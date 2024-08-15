// components/SuccessNotification.js
import React from 'react';

const SuccessNotification = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-lg shadow-lg p-4 flex items-center space-x-3 animate-fadeIn">
      <svg
        className="w-6 h-6 text-green-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="text-lg font-medium">{message}</span>
    </div>
  );
};

export default SuccessNotification;
