import React, { useState, useRef, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import type { HistoryEntry } from '../types';
import CalculatorButton from './components/CalculatorButton';
import { THEMES } from './themes';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draftInput, setDraftInput] = useState<string>('');
  const [showKeypad, setShowKeypad] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem('pythonic_calc_theme') || 'matrix';
  });

  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = THEMES[themeId] || THEMES.matrix;

  useEffect(() => {
    localStorage.setItem('pythonic_calc_theme', themeId);
  }, [themeId]);

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history]);

  const cleanExpression = (expr: string): string => {
    // Replace Python exponentiation ** with mathjs ^
    return expr.replace(/\*\*/g, '^');
  };

  const evaluateExpression = useCallback(() => {
    const trimmed = input.trim();
    if (trimmed === '') return;

    // Support python-style clear command
    if (trimmed === 'clear()' || trimmed === 'clear' || trimmed === 'cls') {
      setHistory([]);
      setInput('');
      setHistoryIndex(null);
      return;
    }

    const entryId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      const processed = cleanExpression(trimmed);
      const evalResult = evaluate(processed);

      if (evalResult === undefined || evalResult === null || typeof evalResult === 'function') {
        throw new Error('Invalid calculation');
      }

      let resultString = typeof evalResult === 'object' && evalResult !== null && 'toString' in evalResult
        ? evalResult.toString()
        : String(evalResult);

      if (resultString === 'Infinity' || resultString === '-Infinity') {
        resultString = 'ZeroDivisionError: division by zero';
      }

      setHistory(prev => [...prev, { id: entryId, expression: input, result: resultString }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid Expression';
      setHistory(prev => [...prev, { id: entryId, expression: input, result: `Error: ${errorMessage}` }]);
    }

    setInput('');
    setHistoryIndex(null);
    setDraftInput('');
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === null) {
        setDraftInput(input);
        const newIndex = history.length - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex].expression);
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex].expression);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex].expression);
      } else {
        setHistoryIndex(null);
        setInput(draftInput);
      }
    }
  };

  const handleButtonClick = (value: string) => {
    inputRef.current?.focus();
    switch (value) {
      case '=':
        evaluateExpression();
        break;
      case 'C':
        setInput('');
        setHistoryIndex(null);
        break;
      case 'DEL':
        setInput(prev => prev.slice(0, -1));
        break;
      default:
        setInput(prev => prev + value);
    }
  };

  const handleQuickInsert = (insertVal: string) => {
    inputRef.current?.focus();
    if (insertVal === 'ans') {
      const last = history[history.length - 1];
      if (last && !String(last.result).startsWith('Error') && !String(last.result).startsWith('ZeroDivisionError')) {
        setInput(prev => prev + last.result);
      }
    } else {
      setInput(prev => prev + insertVal);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (historyIndex !== null) {
      setHistoryIndex(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    evaluateExpression();
  };

  const clearAllHistory = () => {
    setHistory([]);
    setHistoryIndex(null);
    setInput('');
  };

  const copyToClipboard = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const reuseResult = (val: string | number) => {
    inputRef.current?.focus();
    setInput(prev => prev + val);
  };

  return (
    <div className={`min-h-[100dvh] ${theme.bgClass} ${theme.textColor} font-mono flex flex-col items-center justify-center sm:p-4 transition-colors duration-300 select-none ${themeId === 'matrix' ? 'crt-effect' : ''}`}>
      {/* Terminal Window Container */}
      <div className={`w-full max-w-4xl h-[100dvh] sm:h-[92vh] max-h-[100dvh] flex flex-col ${theme.windowBgClass} sm:rounded-2xl border ${theme.borderColor} shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300`}>
        
        {/* macOS / Linux Style Titlebar Header */}
        <header className={`px-3 py-2 sm:px-4 sm:py-3 ${theme.headerBgClass} border-b ${theme.borderColor} flex items-center justify-between flex-shrink-0 gap-2 sm:gap-3`}>
          {/* Traffic Light Window Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={clearAllHistory}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-transform active:scale-90 cursor-pointer"
              title="Clear Session"
              aria-label="Close session"
            />
            <button
              type="button"
              onClick={() => setShowKeypad(prev => !prev)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-transform active:scale-90 cursor-pointer"
              title={showKeypad ? 'Hide Keypad' : 'Show Keypad'}
              aria-label="Minimize keypad"
            />
            <button
              type="button"
              onClick={() => {
                const keys = Object.keys(THEMES);
                const next = keys[(keys.indexOf(themeId) + 1) % keys.length];
                setThemeId(next);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-transform active:scale-90 cursor-pointer"
              title="Cycle Theme"
              aria-label="Cycle theme"
            />
            <span className="text-xs text-gray-500 ml-1.5 hidden md:inline-block font-mono">bash — 80×24</span>
          </div>

          {/* Center App Title */}
          <div className="flex items-center gap-1.5 min-w-0 flex-shrink truncate text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${theme.promptColor} flex-shrink-0`}
            >
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <h1 className="text-xs sm:text-base font-bold tracking-wide truncate">
              Pythonic React Calculator
            </h1>
          </div>

          {/* Right Controls: Theme Selector & Clear Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Theme Dropdown */}
            <select
              value={themeId}
              onChange={e => setThemeId(e.target.value)}
              className={`text-xs px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 border ${theme.borderColor} ${theme.textColor} focus:outline-none cursor-pointer font-mono`}
              title="Change Color Theme"
              aria-label="Select theme"
            >
              {Object.values(THEMES).map(t => (
                <option key={t.id} value={t.id} className="bg-gray-900 text-gray-100">
                  {t.name}
                </option>
              ))}
            </select>

            {/* Toggle Keypad Button */}
            <button
              type="button"
              onClick={() => setShowKeypad(prev => !prev)}
              aria-label={showKeypad ? 'Hide Keypad' : 'Show Keypad'}
              className="hidden sm:flex text-xs items-center gap-1 bg-gray-800/60 hover:bg-gray-700/70 px-2.5 py-1 rounded-lg border border-gray-700/60 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title={showKeypad ? 'Hide Keypad' : 'Show Keypad'}
            >
              <span>{showKeypad ? '⌨️ Hide Keypad' : '🔢 Show Keypad'}</span>
            </button>

            {/* Clear History Button */}
            {history.length > 0 && (
              <button
                type="button"
                onClick={clearAllHistory}
                className="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 px-2.5 py-1 rounded-lg transition-colors border border-red-800/40 cursor-pointer"
                title="Clear REPL history"
              >
                Clear History
              </button>
            )}
          </div>
        </header>

        {/* Terminal REPL Output Feed */}
        <main className="flex-grow p-4 sm:p-5 overflow-y-auto space-y-3 select-text">
          {/* Interpreter Header Greeting */}
          <div className="mb-4 text-xs sm:text-sm leading-relaxed border-b border-gray-800/50 pb-3 text-gray-400">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="font-semibold text-gray-300">Python 3.12.3 (react, mock-os) [Clang 15.0.0]</p>
            </div>
            <p className="text-gray-400">Type an expression and press Enter, or use the on-screen buttons below.</p>
            <p className="text-xs text-gray-500 mt-1">
              Keyboard: <kbd className="px-1.5 py-0.5 bg-gray-800/90 rounded text-gray-300 border border-gray-700 text-[10px]">↑</kbd> / <kbd className="px-1.5 py-0.5 bg-gray-800/90 rounded text-gray-300 border border-gray-700 text-[10px]">↓</kbd> to cycle history. Python power <code className={theme.promptColor}>2**8</code> or caret <code className={theme.promptColor}>2^8</code>. Math functions: <code className={theme.promptColor}>sqrt(16)</code>, <code className={theme.promptColor}>pi</code>, <code className={theme.promptColor}>sin(0)</code>.
            </p>
          </div>

          {/* Calculation History Entries */}
          {history.map((entry, index) => {
            const isError = String(entry.result).startsWith('Error:') || String(entry.result).startsWith('ZeroDivisionError');
            const isCopied = copiedId === entry.id;

            return (
              <div
                key={entry.id}
                className="group relative rounded-xl p-2.5 transition-colors hover:bg-gray-800/30 border border-transparent hover:border-gray-800/40"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start min-w-0 pr-4">
                    <span className={`${theme.promptColor} mr-2 flex-shrink-0 font-bold select-none text-sm`}>&gt;&gt;&gt;</span>
                    <p className={`${theme.expressionColor} font-semibold break-words text-sm sm:text-base`}>
                      {entry.expression}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-600 select-none font-mono flex-shrink-0">
                    [{index + 1}]
                  </span>
                </div>

                <div className="flex items-center justify-between ml-6 mt-1">
                  <p
                    className={`font-semibold text-sm sm:text-base break-words ${
                      isError ? theme.errorColor : theme.resultColor
                    }`}
                  >
                    {String(entry.result)}
                  </p>

                  {/* Action Bar on Hover (and always visible on touch/mobile) */}
                  <div className="opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-1.5 select-none flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(entry.id, String(entry.result))}
                      className="text-[11px] px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 transition-colors cursor-pointer"
                      title="Copy result"
                    >
                      {isCopied ? '✓ Copied' : '📋 Copy'}
                    </button>
                    {!isError && (
                      <button
                        type="button"
                        onClick={() => reuseResult(entry.result)}
                        className="text-[11px] px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 transition-colors cursor-pointer"
                        title="Append result to input"
                      >
                        ↩ Use
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={historyEndRef} />
        </main>

        {/* Bottom Interactive Dock: Input & Keypad */}
        <div className={`p-3 sm:p-4 ${theme.headerBgClass} border-t ${theme.borderColor} flex-shrink-0 backdrop-blur-xl`}>
          
          {/* Terminal Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className={`flex items-center mb-2.5 ${theme.inputBgClass} px-3.5 py-2.5 rounded-xl border ${theme.inputBorderClass} transition-all shadow-inner`}
          >
            <span className={`${theme.promptColor} mr-2.5 font-bold select-none text-base`}>&gt;&gt;&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`bg-transparent border-none ${theme.expressionColor} placeholder-gray-600 focus:outline-none focus:ring-0 w-full p-0 m-0 text-base sm:text-lg font-mono tracking-wide`}
              placeholder="Type expression (e.g. (2 + 3) * 4) or press buttons..."
              autoFocus
              aria-label="Calculator input"
            />
            {input.trim() && (
              <button
                type="submit"
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${theme.eqBtnClass}`}
              >
                ↵ Enter
              </button>
            )}
          </form>

          {/* Quick Scientific Math Function Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-none select-none text-xs">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mr-1 flex-shrink-0">
              Functions:
            </span>
            <button
              type="button"
              onClick={() => handleQuickInsert('**2')}
              aria-label="Square (x²)"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Square (x²)"
            >
              x²
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('**')}
              aria-label="Power (xⁿ)"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Power (xⁿ)"
            >
              xⁿ
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('sqrt(')}
              aria-label="Square Root"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Square Root"
            >
              √x
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('pi')}
              aria-label="Pi constant"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Pi constant"
            >
              π
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('e')}
              aria-label="Euler's constant"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Euler's constant"
            >
              e
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('abs(')}
              aria-label="Absolute value"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Absolute value"
            >
              abs()
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('sin(')}
              aria-label="Sine"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Sine"
            >
              sin()
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('cos(')}
              aria-label="Cosine"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Cosine"
            >
              cos()
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('log(')}
              aria-label="Logarithm"
              className={`px-2 py-1 rounded-lg border font-mono transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Logarithm"
            >
              log()
            </button>
            <button
              type="button"
              onClick={() => handleQuickInsert('ans')}
              aria-label="Last Answer"
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-all text-xs cursor-pointer flex-shrink-0 ${theme.chipBgClass} ${theme.chipHoverClass}`}
              title="Last Answer"
            >
              Ans
            </button>
          </div>

          {/* Keypad Grid (Collapsible) */}
          {showKeypad && (
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto transition-all duration-300">
              <CalculatorButton value="C" onClick={handleButtonClick} ariaLabel="Clear" className={theme.clearBtnClass} />
              <CalculatorButton value="DEL" onClick={handleButtonClick} ariaLabel="Backspace" className={theme.delBtnClass} />
              <CalculatorButton value="(" onClick={handleButtonClick} ariaLabel="Open parenthesis" className={theme.fnBtnClass} />
              <CalculatorButton value=")" onClick={handleButtonClick} ariaLabel="Close parenthesis" className={theme.fnBtnClass} />

              <CalculatorButton value="7" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="8" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="9" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="/" onClick={handleButtonClick} ariaLabel="Divide" className={theme.opBtnClass} />

              <CalculatorButton value="4" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="5" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="6" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="*" onClick={handleButtonClick} ariaLabel="Multiply" className={theme.opBtnClass} />

              <CalculatorButton value="1" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="2" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="3" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="-" onClick={handleButtonClick} ariaLabel="Subtract" className={theme.opBtnClass} />

              <CalculatorButton value="0" onClick={handleButtonClick} className={theme.numBtnClass} />
              <CalculatorButton value="." onClick={handleButtonClick} ariaLabel="Decimal point" className={theme.numBtnClass} />
              <CalculatorButton value="=" onClick={handleButtonClick} ariaLabel="Equals" className={theme.eqBtnClass} />
              <CalculatorButton value="+" onClick={handleButtonClick} ariaLabel="Add" className={theme.opBtnClass} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
