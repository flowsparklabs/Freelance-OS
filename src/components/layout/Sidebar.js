import React from 'react';
import Icon from '../ui/Icon.js';

const Sidebar = ({ activeTab, setActiveTab, plan, t, darkMode, setDarkMode, currency, setCurrency, language, setLanguage }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
        { id: 'invoices', icon: 'FileText', label: 'Invoices' },
        { id: 'clients', icon: 'Users', label: 'Clients' },
        { id: 'expenses', icon: 'Receipt', label: 'Expenses' },
        { id: 'studio', icon: 'Wand2', label: 'Studio AI', badge: 'Ultra' },
        { id: 'subscription', icon: 'Sparkles', label: 'Upgrade Plan' },
        { id: 'settings', icon: 'Settings', label: 'Settings' }
    ];

    return (
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed h-full z-20 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
                    <div className="p-2 bg-brand-600 text-white rounded-xl"><Icon name="Hexagon" size={24} /></div>
                    <span className="text-xl font-bold tracking-tight">FreelanceOS</span>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                        <div className="flex items-center gap-3"><Icon name={item.icon} size={18} />{t(item.label)}</div>
                        {item.badge && <span className="text-[10px] font-bold bg-gradient-to-r from-brand-500 to-amber-500 text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl mb-2">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold">GC</div>
                        <div><p className="text-sm font-bold">Gen Craft</p><p className="text-xs text-slate-500">{plan} Plan</p></div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500"><Icon name={darkMode ? 'Sun' : 'Moon'} size={16} /></button>
                        <button onClick={() => setCurrency(currency === 'USD' ? 'LKR' : 'USD')} className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500 text-xs font-bold">{currency}</button>
                        <button onClick={() => setLanguage(language === 'en' ? 'si' : 'en')} className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500 text-xs font-bold">{language.toUpperCase()}</button>
                    </div>
                </div>
                <button
                    onClick={() => import('../../firebase').then(module => module.auth.signOut())}
                    className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium"
                >
                    <Icon name="LogOut" size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
