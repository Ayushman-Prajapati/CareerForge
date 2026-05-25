import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform active:scale-98 select-none focus:outline-none';
  
  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-3 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 rounded-2xl',
  };

  const variants = {
    primary: 'bg-gradient-cyber hover:bg-gradient-cyber-hover text-white shadow-glow-indigo border border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.55)]',
    secondary: 'glass-card hover:bg-slate-800/40 text-slate-200 border border-slate-700/50 hover:border-slate-500/50 active:bg-slate-900/50',
    danger: 'bg-gradient-to-r from-cyber-rose to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border border-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    outline: 'border border-cyber-indigo/40 text-cyber-indigo hover:bg-cyber-indigo/10',
  };

  const isBtnDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isBtnDisabled}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${isBtnDisabled ? 'opacity-50 cursor-not-allowed transform-none active:scale-100 shadow-none hover:shadow-none' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
