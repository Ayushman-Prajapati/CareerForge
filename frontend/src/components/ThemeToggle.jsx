import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {

  const {
    theme,
    toggleTheme
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        w-11 h-11
        rounded-xl
        flex items-center justify-center
        border
        transition-all duration-300
        backdrop-blur-glass
        shadow-glass-sm

        dark:bg-slate-900/70
        dark:border-slate-700/50
        dark:hover:border-cyan-400/40
        dark:text-cyan-300

        bg-white/80
        border-slate-300
        hover:border-indigo-400
        text-indigo-600
      "
    >
      {
        theme === 'dark'
          ? <Sun size={18} />
          : <Moon size={18} />
      }
    </button>
  );
};

export default ThemeToggle;