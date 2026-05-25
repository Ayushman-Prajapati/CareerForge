import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          animate-spin rounded-full border-t-cyber-indigo border-r-cyber-cyan border-b-cyber-blue border-l-transparent
          ${sizeStyles[size]}
        `}
      ></div>
    </div>
  );
};

export default Spinner;
