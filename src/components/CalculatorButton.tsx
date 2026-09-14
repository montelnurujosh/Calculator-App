import React from 'react';

interface CalculatorButtonProps {
  onClick: (value: string) => void;
  value: string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  value,
  className = '',
  children,
  ariaLabel,
}) => {
  const handleClick = () => onClick(value);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || value}
      className={`font-mono font-bold py-3 sm:py-3.5 px-2 rounded-xl text-lg sm:text-xl border transition-all duration-150 ease-out transform active:scale-95 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-sm flex items-center justify-center ${className}`}
    >
      {children || value}
    </button>
  );
};

export default CalculatorButton;
