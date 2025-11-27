import React from 'react';

const Input = ({ label, as = 'input', children, ...props }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">{label}</label>}
        {as === 'select' ? (
            <select {...props} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed">
                {children}
            </select>
        ) : (
            <input {...props} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed" />
        )}
    </div>
);

export default Input;
