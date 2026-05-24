import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col space-y-1 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 select-none ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 group-focus-within:text-cyber-indigo transition-colors duration-200">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={`
            w-full py-3 text-slate-100 rounded-xl transition-all duration-300 font-sans text-sm
            glass-input border border-slate-700/50 hover:border-slate-600/50 focus:outline-none
            ${Icon ? 'pl-11 pr-4' : 'px-4.5'}
            ${error ? 'border-cyber-rose/60 focus:border-cyber-rose focus:ring-1 focus:ring-cyber-rose/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'focus:border-cyber-indigo focus:ring-1 focus:ring-cyber-indigo/30'}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-cyber-rose font-medium ml-1.5 flex items-center gap-1 animate-pulse-slow">
          <span>●</span> {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
