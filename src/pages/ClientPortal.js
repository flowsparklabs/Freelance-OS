import React from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Badge from '../components/ui/Badge.js';
import Icon from '../components/ui/Icon.js';

const ClientPortal = ({ client, invoices, onExit }) => {
    const clientInvoices = invoices.filter(inv => inv.clientName === client?.name);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in">
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white"><Icon name="Layout" size={24} /></div>
                    <h1 className="text-xl font-bold">Studio K Portal</h1>
                </div>
                <Button onClick={onExit} variant="secondary" iconName="LogOut">Exit Portal</Button>
            </header>
            <main className="max-w-5xl mx-auto p-8 space-y-8">
                <div className="bg-brand-600 text-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {client?.name}</h1>
                    <p className="opacity-90">Manage your invoices and design approvals in one place.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card title="Recent Invoices">
                        {clientInvoices.length === 0 ? (
                            <p className="text-slate-500">No invoices found.</p>
                        ) : (
                            <div className="space-y-4">
                                {clientInvoices.map(inv => (
                                    <div key={inv.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div>
                                            <p className="font-bold">#{inv.id}</p>
                                            <p className="text-sm text-slate-500">{inv.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${inv.total.toFixed(2)}</p>
                                            <Badge color={inv.status === 'paid' ? 'green' : 'amber'}>{inv.status}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                    <Card title="Design Approvals">
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                            <Icon name="Image" size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500">No pending design approvals.</p>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default ClientPortal;
