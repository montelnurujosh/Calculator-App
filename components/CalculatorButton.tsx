import React from 'react';

interface CalculatorButtonProps {
  onClick: (value: string) => void;
  value: string;
  className?: string;
  children?: React.ReactNode;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, value, className = '', children }) => {
  const handleClick = () => onClick(value);

  return (
    <button
      onClick={handleClick}
      className={`bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-4 rounded-lg text-xl sm:text-2xl transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 ${className}`}
    >
      {children || value}
    </button>
  );
};

export default CalculatorButton;
