import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Sidebar from './components/layout/Sidebar.js';
import Card from './components/ui/Card.js';
import Button from './components/ui/Button.js';
import Icon from './components/ui/Icon.js';

// Pages
import Dashboard from './pages/Dashboard.js';
import Invoices from './pages/Invoices.js';
import Clients from './pages/Clients.js';
import Expenses from './pages/Expenses.js';
import StudioAI from './pages/StudioAI.js';
import SubscriptionPage from './pages/Subscription.js';
import Settings from './pages/Settings.js';
import Login from './pages/Login.js';
import ClientPortal from './pages/ClientPortal.js';

// Utils
import { formatCurrency, t, getInvoices, getClients, getExpenses } from './utils/helpers.js';
import { PLANS } from './utils/constants.js';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [plan, setPlan] = useState('PRO');
    const [currency, setCurrency] = useState('USD');
    const [language, setLanguage] = useState('en');
    const [viewMode, setViewMode] = useState('admin');
    const [darkMode, setDarkMode] = useState(false);

    // Data State
    const [clients, setClients] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (userProfile?.uid) {
            const fetchData = async () => {
                const fetchedClients = await getClients(userProfile.uid);
                const fetchedInvoices = await getInvoices(userProfile.uid);
                const fetchedExpenses = await getExpenses(userProfile.uid);

                setClients(fetchedClients);
                setInvoices(fetchedInvoices);
                setExpenses(fetchedExpenses);
            };
            fetchData();
        }
    }, [userProfile]);

    // Stats Calculation
    const stats = {
        revenue: formatCurrency(invoices.reduce((acc, inv) => acc + inv.total, 0), currency),
        pending: invoices.filter(i => i.status === 'pending').length,
        netIncome: formatCurrency(invoices.reduce((acc, inv) => acc + inv.total, 0) - expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0), currency),
        tax: formatCurrency(invoices.reduce((acc, inv) => acc + inv.total, 0) * 0.15, currency)
    };

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserProfile({
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    uid: user.uid
                });
            } else {
                setIsAuthenticated(false);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    if (viewMode === 'client') {
        return <ClientPortal client={clients[0]} invoices={invoices} onExit={() => setViewMode('admin')} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard stats={stats} setActiveTab={setActiveTab} />;
            case 'invoices': return <Invoices plan={plan} clients={clients} invoices={invoices} setInvoices={setInvoices} />;
            case 'clients': return <Clients plan={plan} clients={clients} setClients={setClients} />;
            case 'expenses': return <Expenses expenses={expenses} setExpenses={setExpenses} />;
            case 'studio': return <StudioAI plan={plan} t={t} />;
            case 'subscription': return <SubscriptionPage plan={plan} setPlan={setPlan} />;
            case 'settings': return <Settings plan={plan} viewMode={viewMode} setViewMode={setViewMode} t={t} />;
            default: return null;
        }
    };

    import MobileNav from './components/layout/MobileNav.js';

    // ... (imports)

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                plan={plan}
                t={t}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                currency={currency}
                setCurrency={setCurrency}
                language={language}
                setLanguage={setLanguage}
            />
            <main className="flex-1 md:ml-64 p-8 pb-24 md:pb-8">
                {renderContent()}
            </main>
            <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
        </div>
    );
};

export default App;
