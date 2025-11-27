import React from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Icon from '../components/ui/Icon.js';

const SubscriptionPage = ({ plan, setPlan }) => {
    const plans = [
        { id: 'FREE', name: 'Free', price: '$0', features: ['3 Invoices / mo', '5 Clients', 'Basic Expenses', 'Tax Estimator'] },
        { id: 'PRO', name: 'Pro', price: '$2.99', features: ['Unlimited Invoices', 'Unlimited Clients', 'Dark Mode', 'Time Tracker', 'Contract Generator', 'Bank Details'] },
        { id: 'ULTRA', name: 'Ultra', price: '$5.99', features: ['Everything in Pro', 'AI Receipt Scanner', 'AI Proposal Writer', 'Payment Links', 'Project Milestones', 'Priority Support'] }
    ];

    const handleUpgrade = (newPlan) => {
        setPlan(newPlan);
        alert(`Welcome to ${newPlan} Plan!`);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="text-center max-w-2xl mx-auto"><h1 className="text-4xl font-bold mb-4">Choose your Workspace</h1><p className="text-slate-500 text-lg">Unlock the full potential of FreelanceOS with our premium tiers.</p></header>
            <div className="grid md:grid-cols-3 gap-6">
                {plans.map(p => {
                    const isCurrent = plan === p.id;
                    const isUltra = p.id === 'ULTRA';
                    return (
                        <Card key={p.id} className={`relative flex flex-col ${isCurrent ? 'ring-2 ring-brand-500' : ''} ${isUltra ? 'border-amber-200 dark:border-amber-900/30' : ''}`}>
                            {isUltra && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>}
                            <h3 className={`text-xl font-bold mb-2 ${isUltra ? 'ultra-text' : ''}`}>{p.name}</h3>
                            <div className="text-3xl font-bold mb-6">{p.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                            <ul className="space-y-3 mb-8 flex-1">{p.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm"><Icon name="Check" size={16} className="text-emerald-500" />{f}</li>)}</ul>
                            <Button onClick={() => handleUpgrade(p.id)} disabled={isCurrent} variant={isUltra ? 'ultra' : (isCurrent ? 'secondary' : 'primary')} fullWidth>{isCurrent ? 'Current Plan' : `Upgrade to ${p.name}`}</Button>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default SubscriptionPage;
