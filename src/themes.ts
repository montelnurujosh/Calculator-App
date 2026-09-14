export interface ThemeConfig {
  id: string;
  name: string;
  badge: string;
  dotColor: string;
  bgClass: string;
  windowBgClass: string;
  headerBgClass: string;
  borderColor: string;
  promptColor: string;
  textColor: string;
  expressionColor: string;
  resultColor: string;
  errorColor: string;
  inputBgClass: string;
  inputBorderClass: string;
  chipBgClass: string;
  chipHoverClass: string;
  numBtnClass: string;
  opBtnClass: string;
  fnBtnClass: string;
  eqBtnClass: string;
  clearBtnClass: string;
  delBtnClass: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  matrix: {
    id: 'matrix',
    name: 'Matrix Phosphor',
    badge: 'CRT-GREEN',
    dotColor: '#22c55e',
    bgClass: 'bg-black',
    windowBgClass: 'bg-gray-950/95',
    headerBgClass: 'bg-gray-900/90',
    borderColor: 'border-green-900/50',
    promptColor: 'text-green-500',
    textColor: 'text-green-400',
    expressionColor: 'text-green-300',
    resultColor: 'text-emerald-400',
    errorColor: 'text-red-400',
    inputBgClass: 'bg-black/60',
    inputBorderClass: 'border-green-800/60 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30',
    chipBgClass: 'bg-green-950/50 text-green-400 border-green-800/40 hover:bg-green-900/50 hover:text-green-200',
    chipHoverClass: 'hover:border-green-500',
    numBtnClass: 'bg-gray-900/80 hover:bg-gray-800/90 text-green-300 border-gray-800/70 hover:border-green-800/50',
    opBtnClass: 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border-amber-800/40 hover:border-amber-500/50',
    fnBtnClass: 'bg-green-950/40 hover:bg-green-900/50 text-green-300 border-green-800/40 hover:border-green-500/50',
    eqBtnClass: 'bg-green-600 hover:bg-green-500 text-black font-extrabold shadow-lg shadow-green-900/40 border-green-400/50',
    clearBtnClass: 'bg-red-950/50 hover:bg-red-900/70 text-red-300 border-red-800/40 hover:border-red-500/50',
    delBtnClass: 'bg-gray-800/80 hover:bg-gray-700/90 text-gray-300 border-gray-700/50',
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula Twilight',
    badge: 'PURPLE',
    dotColor: '#bd93f9',
    bgClass: 'bg-[#1e1f29]',
    windowBgClass: 'bg-[#282a36]/95',
    headerBgClass: 'bg-[#21222c]/90',
    borderColor: 'border-[#44475a]/60',
    promptColor: 'text-[#ff79c6]',
    textColor: 'text-[#f8f8f2]',
    expressionColor: 'text-[#8be9fd]',
    resultColor: 'text-[#50fa7b]',
    errorColor: 'text-[#ff5555]',
    inputBgClass: 'bg-[#191a21]/70',
    inputBorderClass: 'border-[#44475a] focus-within:border-[#bd93f9] focus-within:ring-1 focus-within:ring-[#bd93f9]/30',
    chipBgClass: 'bg-[#44475a]/50 text-[#8be9fd] border-[#6272a4]/40 hover:bg-[#6272a4]/40 hover:text-[#f8f8f2]',
    chipHoverClass: 'hover:border-[#bd93f9]',
    numBtnClass: 'bg-[#383a59]/60 hover:bg-[#44475a]/80 text-[#f8f8f2] border-[#44475a]/50 hover:border-[#bd93f9]/40',
    opBtnClass: 'bg-[#ffb86c]/20 hover:bg-[#ffb86c]/30 text-[#ffb86c] border-[#ffb86c]/30 hover:border-[#ffb86c]/60',
    fnBtnClass: 'bg-[#bd93f9]/20 hover:bg-[#bd93f9]/30 text-[#bd93f9] border-[#bd93f9]/30 hover:border-[#bd93f9]/60',
    eqBtnClass: 'bg-[#50fa7b] hover:bg-[#69ff94] text-[#1e1f29] font-extrabold shadow-lg shadow-[#50fa7b]/20 border-[#50fa7b]/50',
    clearBtnClass: 'bg-[#ff5555]/20 hover:bg-[#ff5555]/30 text-[#ff5555] border-[#ff5555]/30 hover:border-[#ff5555]/60',
    delBtnClass: 'bg-[#44475a]/70 hover:bg-[#6272a4]/70 text-[#f8f8f2] border-[#6272a4]/40',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyber Synthwave',
    badge: 'NEON',
    dotColor: '#06b6d4',
    bgClass: 'bg-[#0f0c1b]',
    windowBgClass: 'bg-[#16122a]/95',
    headerBgClass: 'bg-[#110d22]/90',
    borderColor: 'border-[#f43f5e]/30',
    promptColor: 'text-[#f43f5e]',
    textColor: 'text-cyan-300',
    expressionColor: 'text-yellow-300',
    resultColor: 'text-cyan-400',
    errorColor: 'text-rose-400',
    inputBgClass: 'bg-[#0b0816]/70',
    inputBorderClass: 'border-cyan-800/60 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/30',
    chipBgClass: 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40 hover:bg-cyan-900/40 hover:text-cyan-100',
    chipHoverClass: 'hover:border-cyan-400',
    numBtnClass: 'bg-[#1f1938]/70 hover:bg-[#2b234d]/80 text-cyan-200 border-[#2f2752] hover:border-cyan-500/40',
    opBtnClass: 'bg-[#f43f5e]/20 hover:bg-[#f43f5e]/30 text-[#f43f5e] border-[#f43f5e]/30 hover:border-[#f43f5e]/60',
    fnBtnClass: 'bg-cyan-900/30 hover:bg-cyan-800/40 text-cyan-300 border-cyan-700/30 hover:border-cyan-400/50',
    eqBtnClass: 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-black font-extrabold shadow-lg shadow-cyan-500/25 border-cyan-300/40',
    clearBtnClass: 'bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border-rose-800/40 hover:border-rose-500/50',
    delBtnClass: 'bg-[#2b234d]/60 hover:bg-[#392e66]/70 text-gray-300 border-[#392e66]/50',
  },
  modern: {
    id: 'modern',
    name: 'Modern Dark',
    badge: 'PRO SLATE',
    dotColor: '#38bdf8',
    bgClass: 'bg-slate-950',
    windowBgClass: 'bg-slate-900/95',
    headerBgClass: 'bg-slate-900/90',
    borderColor: 'border-slate-800',
    promptColor: 'text-sky-400',
    textColor: 'text-slate-200',
    expressionColor: 'text-sky-300',
    resultColor: 'text-emerald-400',
    errorColor: 'text-red-400',
    inputBgClass: 'bg-slate-950/60',
    inputBorderClass: 'border-slate-800 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30',
    chipBgClass: 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-700/50 hover:text-white',
    chipHoverClass: 'hover:border-sky-400',
    numBtnClass: 'bg-slate-800/60 hover:bg-slate-700/70 text-slate-100 border-slate-700/50 hover:border-slate-600',
    opBtnClass: 'bg-amber-900/20 hover:bg-amber-900/30 text-amber-300 border-amber-700/30 hover:border-amber-500/40',
    fnBtnClass: 'bg-sky-950/30 hover:bg-sky-900/40 text-sky-300 border-sky-800/30 hover:border-sky-500/40',
    eqBtnClass: 'bg-sky-600 hover:bg-sky-500 text-white font-extrabold shadow-lg shadow-sky-600/30 border-sky-400/40',
    clearBtnClass: 'bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border-rose-800/30 hover:border-rose-500/40',
    delBtnClass: 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 border-slate-700/40',
  },
};

