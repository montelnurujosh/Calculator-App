import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CalculatorButton from './CalculatorButton';

describe('CalculatorButton Component', () => {
  it('renders button with correct text', () => {
    render(<CalculatorButton value="7" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument();
  });

  it('renders button with children if provided', () => {
    render(
      <CalculatorButton value="DEL" onClick={() => {}}>
        <span>Delete</span>
      </CalculatorButton>
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick with correct value on click', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CalculatorButton value="9" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: '9' });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('9');
  });

  it('applies custom className', () => {
    render(<CalculatorButton value="C" onClick={() => {}} className="bg-red-500" />);
    const button = screen.getByRole('button', { name: 'C' });
    expect(button.className).toContain('bg-red-500');
  });

  it('applies aria-label when provided', () => {
    render(<CalculatorButton value="+" onClick={() => {}} ariaLabel="Addition Operator" />);
    expect(screen.getByLabelText('Addition Operator')).toBeInTheDocument();
  });
});

