import React, { useState } from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Input from '../components/ui/Input.js';
import Badge from '../components/ui/Badge.js';
import Icon from '../components/ui/Icon.js';
import { calculateTotal } from '../utils/helpers.js';

const Invoices = ({ plan, clients, invoices, setInvoices }) => {
    const [step, setStep] = useState('list');
    const [selectedClient, setSelectedClient] = useState('');
    const [items, setItems] = useState([{ description: '', qty: 1, rate: 0 }]);
    const [currentInvoice, setCurrentInvoice] = useState(null);
    const [includePaymentLink, setIncludePaymentLink] = useState(false);
    const [bankDetails, setBankDetails] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);

    const handleCreate = () => {
        if (plan === 'FREE' && invoices.length >= 3) { alert('Free limit reached (3 invoices). Upgrade to Pro!'); return; }
        setStep('create'); setItems([{ description: '', qty: 1, rate: 0 }]); setSelectedClient(''); setIncludePaymentLink(false); setBankDetails(''); setIsRecurring(false);
    };

    const handleSave = () => {
        if (!selectedClient) return;
        const client = clients.find(c => c.id === parseInt(selectedClient));
        const newInvoice = {
            id: Date.now(), clientName: client.name, clientEmail: client.email, clientAddress: client.address,
            items: [...items], total: calculateTotal(items), date: new Date().toLocaleDateString(), status: 'pending',
            hasPaymentLink: includePaymentLink, bankDetails: bankDetails, isRecurring: isRecurring
        };
        setInvoices([newInvoice, ...invoices]); setCurrentInvoice(newInvoice); setStep('preview');
    };

    if (step === 'list') {
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center"><h1 className="text-3xl font-bold">Invoices</h1><Button onClick={handleCreate} iconName="Plus">New Invoice</Button></div>
                <Card noPadding>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-semibold"><tr><th className="px-6 py-4">Client</th><th className="px-6 py-4">Total</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-medium">{inv.clientName}</td>
                                    <td className="px-6 py-4 font-mono">${inv.total.toFixed(2)}</td>
                                    <td className="px-6 py-4"><Badge color={inv.status === 'paid' ? 'green' : 'amber'}>{inv.status}</Badge></td>
                                    <td className="px-6 py-4 text-right"><button onClick={() => { setCurrentInvoice(inv); setStep('preview'); }} className="text-brand-600 font-medium text-sm">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {invoices.length === 0 && <div className="p-8 text-center text-slate-400">No invoices yet.</div>}
                </Card>
            </div>
        );
    }

    if (step === 'create') {
        const canPaymentLink = plan === 'ULTRA';
        const canBankDetails = plan !== 'FREE';
        const canRecurring = plan !== 'FREE';

        return (
            <div className="max-w-4xl mx-auto animate-slide-up">
                <div className="flex items-center mb-6 gap-4"><button onClick={() => setStep('list')}><Icon name="ArrowLeft" /></button><h1 className="text-2xl font-bold">Create Invoice</h1></div>
                <Card>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Input label="Select Client" as="select" value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
                            {[<option key="def" value="">Select...</option>, ...clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)]}
                        </Input>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-3 border rounded-xl ${canPaymentLink ? 'border-slate-200' : 'opacity-60 bg-slate-50'}`}>
                                <div className="flex items-center gap-2"><input type="checkbox" checked={includePaymentLink} onChange={e => canPaymentLink && setIncludePaymentLink(e.target.checked)} disabled={!canPaymentLink} className="w-4 h-4" /><span className="text-sm font-medium">Stripe Payment Link</span></div>
                                {!canPaymentLink && <Icon name="Lock" size={14} />}
                            </div>
                            <div className={`flex items-center justify-between p-3 border rounded-xl ${canRecurring ? 'border-slate-200' : 'opacity-60 bg-slate-50'}`}>
                                <div className="flex items-center gap-2"><input type="checkbox" checked={isRecurring} onChange={e => canRecurring && setIsRecurring(e.target.checked)} disabled={!canRecurring} className="w-4 h-4" /><span className="text-sm font-medium">Recurring (Monthly)</span></div>
                                {!canRecurring && <Icon name="Lock" size={14} />}
                            </div>
                            <Input label="Bank Details / QR Link" value={bankDetails} onChange={e => setBankDetails(e.target.value)} disabled={!canBankDetails} placeholder={!canBankDetails ? "Upgrade to Pro to add bank details" : "Bank Name, Acc No..."} />
                        </div>
                    </div>
                    <div className="space-y-4 mb-8">
                        <h3 className="font-bold text-sm uppercase text-slate-500">Items</h3>
                        {items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                                <input placeholder="Desc" className="flex-grow px-3 py-2 border rounded-lg bg-transparent" value={item.description} onChange={e => { const n = [...items]; n[idx].description = e.target.value; setItems(n); }} />
                                <input type="number" placeholder="Qty" className="w-20 px-3 py-2 border rounded-lg bg-transparent" value={item.qty} onChange={e => { const n = [...items]; n[idx].qty = parseFloat(e.target.value) || 0; setItems(n); }} />
                                <input type="number" placeholder="Rate" className="w-24 px-3 py-2 border rounded-lg bg-transparent" value={item.rate} onChange={e => { const n = [...items]; n[idx].rate = parseFloat(e.target.value) || 0; setItems(n); }} />
                            </div>
                        ))}
                        <Button onClick={() => setItems([...items, { description: '', qty: 1, rate: 0 }])} variant="secondary" size="sm" iconName="Plus">Add Item</Button>
                    </div>
                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-brand-600">${calculateTotal(items).toFixed(2)}</span></div>
                            <Button onClick={handleSave} disabled={!selectedClient} fullWidth>Generate Invoice</Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (step === 'preview' && currentInvoice) {
        return (
            <div className="animate-fade-in">
                <div className="flex justify-between mb-6 no-print max-w-4xl mx-auto">
                    <button onClick={() => setStep('list')} className="flex items-center gap-2"><Icon name="ArrowLeft" /> Back</button>
                    <Button onClick={() => window.print()} iconName="Printer">Print</Button>
                </div>
                <div id="invoice-preview" className="bg-white text-slate-900 p-12 max-w-4xl mx-auto shadow-2xl rounded-xl relative overflow-hidden">
                    <div className="flex justify-between mb-12"><div><h1 className="text-4xl font-bold text-slate-900">INVOICE</h1><p className="text-slate-500">#{currentInvoice.id}</p></div><div className="text-right"><h2 className="font-bold text-xl">FreelanceOS</h2></div></div>
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div><h3 className="font-bold text-slate-400 text-xs uppercase mb-2">Bill To</h3><p className="font-bold text-lg">{currentInvoice.clientName}</p><p>{currentInvoice.clientEmail}</p></div>
                        <div className="text-right"><p>Date: {currentInvoice.date}</p>{currentInvoice.isRecurring && <Badge color="brand">Recurring Invoice</Badge>}</div>
                    </div>
                    <table className="w-full mb-12">
                        <thead className="border-b-2 border-slate-100"><tr><th className="text-left py-3">Description</th><th className="text-right">Qty</th><th className="text-right">Rate</th><th className="text-right">Amount</th></tr></thead>
                        <tbody>{currentInvoice.items.map((item, i) => (<tr key={i}><td className="py-3">{item.description}</td><td className="text-right">{item.qty}</td><td className="text-right">${item.rate}</td><td className="text-right font-bold">${(item.qty * item.rate).toFixed(2)}</td></tr>))}</tbody>
                    </table>
                    <div className="flex justify-end mb-12"><div className="w-64"><div className="flex justify-between text-xl font-bold border-t pt-4"><span>Total</span><span>${currentInvoice.total.toFixed(2)}</span></div></div></div>
                    {(currentInvoice.bankDetails || currentInvoice.hasPaymentLink) && (
                        <div className="bg-slate-50 p-6 rounded-xl mb-8">
                            <h3 className="font-bold mb-2">Payment Details</h3>
                            {currentInvoice.bankDetails && <p className="text-sm mb-2">{currentInvoice.bankDetails}</p>}
                            {currentInvoice.hasPaymentLink && <a href="#" className="text-brand-600 underline font-medium">Pay via Stripe Secure Link &rarr;</a>}
                        </div>
                    )}
                    {plan === 'FREE' && <div className="text-center text-xs text-slate-400 mt-12 pt-4 border-t">Created freely with FreelanceOS</div>}
                </div>
            </div>
        );
    }
};

export default Invoices;
