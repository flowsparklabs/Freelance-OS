import React from 'react';

const Badge = ({ children, color = "slate" }) => {
    const colors = {
        slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
        brand: "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400",
        green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
        ultra: "bg-gradient-to-r from-brand-100 to-amber-100 text-brand-800 dark:from-brand-900/40 dark:to-amber-900/40 dark:text-amber-200 border border-amber-200/50 dark:border-amber-700/50"
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
            {children}
        </span>
    );
};

export default Badge;
