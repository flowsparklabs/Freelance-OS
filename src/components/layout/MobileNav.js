import React, { useState } from 'react';
import Icon from '../ui/Icon.js';
import { auth } from '../../firebase';

const MobileNav = ({ activeTab, setActiveTab, t }) => {
    const [showMenu, setShowMenu] = useState(false);

    const navItems = [
        { id: 'dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
        { id: 'invoices', icon: 'FileText', label: 'Invoices' },
        { id: 'clients', icon: 'Users', label: 'Clients' },
        { id: 'studio', icon: 'Wand2', label: 'Studio' },
    ];

    const menuItems = [
        { id: 'expenses', icon: 'Receipt', label: 'Expenses' },
        { id: 'subscription', icon: 'Sparkles', label: 'Upgrade' },
        { id: 'settings', icon: 'Settings', label: 'Settings' }
    ];

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 md:hidden pb-safe">
                <div className="flex justify-around items-center h-16">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setShowMenu(false); }}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === item.id ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            <Icon name={item.icon} size={20} />
                            <span className="text-[10px] font-medium">{t(item.label)}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${showMenu ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <Icon name="Menu" size={20} />
                        <span className="text-[10px] font-medium">Menu</span>
                    </button>
                </div>
            </div>

            {/* Expanded Menu Overlay */}
            {showMenu && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMenu(false)}>
                    <div className="absolute bottom-16 left-0 w-full bg-white dark:bg-slate-900 rounded-t-2xl p-4 animate-in slide-in-from-bottom-10">
                        <div className="grid grid-cols-3 gap-4">
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); setShowMenu(false); }}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 ${activeTab === item.id ? 'ring-2 ring-brand-500' : ''}`}
                                >
                                    <Icon name={item.icon} size={24} className="mb-2 text-brand-600 dark:text-brand-400" />
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{t(item.label)}</span>
                                </button>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex flex-col items-center justify-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20"
                            >
                                <Icon name="LogOut" size={24} className="mb-2 text-red-600 dark:text-red-400" />
                                <span className="text-xs font-medium text-red-600 dark:text-red-400">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNav;
