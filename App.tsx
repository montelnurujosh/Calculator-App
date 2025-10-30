import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { HistoryEntry } from './types';
import CalculatorButton from './components/CalculatorButton';

// Since mathjs is loaded from a CDN, we need to declare it for TypeScript
declare const math: any;

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history]);

  const evaluateExpression = useCallback(() => {
    if (input.trim() === '') return;

    try {
      const result = math.evaluate(input);
      if (result === undefined || result === null || typeof result === 'function') {
        throw new Error('Invalid calculation');
      }
      setHistory(prev => [...prev, { id: Date.now(), expression: input, result: result.toString() }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid Expression';
      setHistory(prev => [...prev, { id: Date.now(), expression: input, result: `Error: ${errorMessage}` }]);
    }
    setInput('');
  }, [input]);

  const handleButtonClick = (value: string) => {
    inputRef.current?.focus();
    switch (value) {
      case '=':
        evaluateExpression();
        break;
      case 'C':
        setInput('');
        break;
      case 'DEL':
        setInput(prev => prev.slice(0, -1));
        break;
      default:
        setInput(prev => prev + value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    evaluateExpression();
  };

  return (
    <div className="bg-gray-900 text-green-400 min-h-screen font-mono flex flex-col h-screen">
      <header className="p-4 border-b border-gray-700 flex items-center gap-3 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
        <h1 className="text-xl font-bold">Pythonic React Calculator</h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 text-gray-400">
          <p>Python 3.12.3 (react, mock-os) [Clang 15.0.0]</p>
          <p>Type an expression and press Enter, or use the buttons below.</p>
        </div>
        {history.map(entry => (
          <div key={entry.id}>
            <div className="flex items-start">
              <span className="text-gray-500 mr-2 flex-shrink-0">&gt;&gt;&gt;</span>
              <p className="text-green-400 break-words min-w-0">{entry.expression}</p>
            </div>
            <p className={`ml-8 ${String(entry.result).startsWith('Error:') ? 'text-red-500' : 'text-cyan-400'} break-words`}>
              {String(entry.result)}
            </p>
          </div>
        ))}
        <div ref={historyEndRef} />
      </main>
      
      <div className="p-2 sm:p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 flex-shrink-0">
        <form onSubmit={handleFormSubmit} className="flex items-center mb-4">
          <span className="text-gray-500 mr-2">&gt;&gt;&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="bg-transparent border-none text-green-400 focus:ring-0 w-full p-0 m-0 text-lg"
            placeholder="Calculate..."
            autoFocus
          />
        </form>

        <div className="grid grid-cols-4 gap-2">
          <CalculatorButton value="C" onClick={handleButtonClick} className="bg-red-600 hover:bg-red-700 text-white" />
          <CalculatorButton value="DEL" onClick={handleButtonClick} className="bg-gray-600 hover:bg-gray-500" />
          <CalculatorButton value="(" onClick={handleButtonClick} className="bg-gray-600 hover:bg-gray-500" />
          <CalculatorButton value=")" onClick={handleButtonClick} className="bg-gray-600 hover:bg-gray-500" />
          
          <CalculatorButton value="7" onClick={handleButtonClick} />
          <CalculatorButton value="8" onClick={handleButtonClick} />
          <CalculatorButton value="9" onClick={handleButtonClick} />
          <CalculatorButton value="/" onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-600 text-white" />

          <CalculatorButton value="4" onClick={handleButtonClick} />
          <CalculatorButton value="5" onClick={handleButtonClick} />
          <CalculatorButton value="6" onClick={handleButtonClick} />
          <CalculatorButton value="*" onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-600 text-white" />
          
          <CalculatorButton value="1" onClick={handleButtonClick} />
          <CalculatorButton value="2" onClick={handleButtonClick} />
          <CalculatorButton value="3" onClick={handleButtonClick} />
          <CalculatorButton value="-" onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-600 text-white" />

          <CalculatorButton value="0" onClick={handleButtonClick} />
          <CalculatorButton value="." onClick={handleButtonClick} />
          <CalculatorButton value="=" onClick={handleButtonClick} className="bg-green-600 hover:bg-green-700 text-white" />
          <CalculatorButton value="+" onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-600 text-white" />
        </div>
      </div>
    </div>
  );
};

export default App;
