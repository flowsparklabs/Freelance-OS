import React from 'react';
import Icon from './Icon.js';

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, iconName, fullWidth = false }) => {
    const base = "inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
    const variants = {
        primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400",
        ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
        ultra: "bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 border border-transparent"
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
            {iconName && <span className="mr-2"><Icon name={iconName} size={18} /></span>}
            {children}
        </button>
    );
};

export default Button;
