import React from 'react';
import Icon from './Icon.js';

const Card = ({ children, className = "", noPadding = false, locked = false, onClick, title }) => (
    <div onClick={onClick} className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm transition-all duration-300 ${noPadding ? '' : 'p-6'} ${locked ? 'opacity-70 cursor-not-allowed overflow-hidden' : ''} ${className}`}>
        {locked && (
            <div className="absolute inset-0 z-10 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
                    <Icon name="Lock" size={24} className="text-slate-400" />
                </div>
            </div>
        )}
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        {children}
    </div>
);

export default Card;
