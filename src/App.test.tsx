import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Pythonic React Calculator App', () => {
  it('renders application header and REPL greeting', () => {
    render(<App />);
    expect(screen.getByText('Pythonic React Calculator')).toBeInTheDocument();
    expect(screen.getByText(/Python 3\.12\.3/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type expression/)).toBeInTheDocument();
  });

  it('evaluates basic arithmetic expressions via input and Enter key', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '15 + 27{enter}');

    expect(screen.getByText('15 + 27')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('supports decimal operations and order of operations (PEMDAS)', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '10 + 2 * 5 - (8 / 2){enter}');

    expect(screen.getByText('10 + 2 * 5 - (8 / 2)')).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('supports Python-style exponentiation (**)', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '3**4{enter}');

    expect(screen.getByText('3**4')).toBeInTheDocument();
    expect(screen.getByText('81')).toBeInTheDocument();
  });

  it('supports math functions like sqrt and abs', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, 'sqrt(144) + abs(-6){enter}');

    expect(screen.getByText('sqrt(144) + abs(-6)')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
  });

  it('handles division by zero gracefully with Pythonic ZeroDivisionError', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '100 / 0{enter}');

    expect(screen.getByText('100 / 0')).toBeInTheDocument();
    expect(screen.getByText('ZeroDivisionError: division by zero')).toBeInTheDocument();
  });

  it('handles invalid syntax without crashing', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '3 + * 5{enter}');

    expect(screen.getByText('3 + * 5')).toBeInTheDocument();
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  it('operates via on-screen buttons and equals button', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    // Click 7, *, 8, =
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'Multiply' }));
    await user.click(screen.getByRole('button', { name: '8' }));

    expect(input).toHaveValue('7*8');

    await user.click(screen.getByRole('button', { name: 'Equals' }));

    expect(screen.getByText('7*8')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('handles DEL and C buttons properly', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(input).toHaveValue('123');

    await user.click(screen.getByRole('button', { name: 'Backspace' }));
    expect(input).toHaveValue('12');

    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
  });

  it('allows navigating history with Up and Down arrow keys', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '1 + 1{enter}');
    await user.type(input, '2 + 2{enter}');

    expect(input).toHaveValue('');

    // Press ArrowUp once -> shows '2 + 2'
    await user.type(input, '{arrowup}');
    expect(input).toHaveValue('2 + 2');

    // Press ArrowUp again -> shows '1 + 1'
    await user.type(input, '{arrowup}');
    expect(input).toHaveValue('1 + 1');

    // Press ArrowDown -> back to '2 + 2'
    await user.type(input, '{arrowdown}');
    expect(input).toHaveValue('2 + 2');

    // Press ArrowDown -> back to empty draft
    await user.type(input, '{arrowdown}');
    expect(input).toHaveValue('');
  });

  it('clears history when typing clear() or clicking Clear History button', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    await user.type(input, '5 * 5{enter}');
    expect(screen.getByText('25')).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: 'Clear History' });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);
    expect(screen.queryByText('25')).not.toBeInTheDocument();

    // Also test clear() typed command
    await user.type(input, '10 + 10{enter}');
    expect(screen.getByText('20')).toBeInTheDocument();

    await user.type(input, 'clear(){enter}');
    expect(screen.queryByText('20')).not.toBeInTheDocument();
  });

  it('allows switching color themes via the theme selector', async () => {
    const user = userEvent.setup();
    render(<App />);
    const select = screen.getByRole('combobox', { name: /Select theme/i });

    expect(select).toBeInTheDocument();
    await user.selectOptions(select, 'dracula');
    expect(select).toHaveValue('dracula');

    await user.selectOptions(select, 'cyberpunk');
    expect(select).toHaveValue('cyberpunk');
  });

  it('supports scientific function chips and Ans insertion', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Type expression/);

    // Click square root chip
    await user.click(screen.getByRole('button', { name: 'Square Root' }));
    expect(input).toHaveValue('sqrt(');

    // Complete sqrt(64)
    await user.type(input, '64){enter}');
    expect(screen.getByText('8')).toBeInTheDocument();

    // Click Ans chip
    await user.click(screen.getByRole('button', { name: 'Last Answer' }));
    expect(input).toHaveValue('8');

    // Click x² chip
    await user.click(screen.getByRole('button', { name: 'Square (x²)' }));
    expect(input).toHaveValue('8**2');

    await user.type(input, '{enter}');
    expect(screen.getByText('64')).toBeInTheDocument();
  });

  it('toggles keypad visibility when clicking toggle button', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument();

    // Click toggle button to hide
    const toggleBtn = screen.getByRole('button', { name: /Hide Keypad/i });
    await user.click(toggleBtn);

    expect(screen.queryByRole('button', { name: 'Equals' })).not.toBeInTheDocument();

    // Click toggle button to restore
    const restoreBtn = screen.getByRole('button', { name: /Show Keypad/i });
    await user.click(restoreBtn);

    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument();
  });
});

