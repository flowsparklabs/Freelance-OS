import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Icon from '../components/ui/Icon.js';

const Settings = ({ plan, viewMode, setViewMode, t }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <header><h1 className="text-3xl font-bold">{t('Settings')}</h1></header>
            <Card title="App Preferences">
                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <div><h3 className="font-bold">Client View Mode</h3><p className="text-sm text-slate-500">Preview what your clients see.</p></div>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm ${viewMode === 'client' ? 'font-bold text-brand-600' : 'text-slate-500'}`}>{viewMode === 'client' ? 'Active' : 'Inactive'}</span>
                        <button onClick={() => setViewMode(viewMode === 'admin' ? 'client' : 'admin')} className={`w-12 h-6 rounded-full transition-colors relative ${viewMode === 'client' ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${viewMode === 'client' ? 'left-7' : 'left-1'}`}></div>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div><h3 className="font-bold">Data Management</h3><p className="text-sm text-slate-500">Clear all local data and reset app.</p></div>
                    <Button variant="danger" onClick={() => { if (window.confirm('Are you sure? This will wipe all data.')) { localStorage.clear(); window.location.reload(); } }} iconName="Trash2">Reset App</Button>
                </div>
            </Card>
            <Card title="Account">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">GC</div>
                    <div><h3 className="font-bold text-xl">Gen Craft Studios</h3><p className="text-slate-500">admin@gencraft.com</p></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-500 mb-1">Current Plan</p>
                        <div className="flex justify-between items-center"><span className="font-bold text-lg">{plan}</span><span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">Active</span></div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-500 mb-1">Member Since</p>
                        <span className="font-bold text-lg">Nov 2023</span>
                    </div>
                </div>
            </Card>

            <Card title="Danger Zone" className="border-red-100 dark:border-red-900/30">
                <p className="text-sm text-slate-500 mb-4">Sign out of your account on this device.</p>
                <button
                    onClick={() => signOut(auth)}
                    className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                >
                    <Icon name="LogOut" size={20} />
                    Log Out
                </button>
            </Card>
        </div>
    );
};

export default Settings;
