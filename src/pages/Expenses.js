import React, { useState } from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Input from '../components/ui/Input.js';
import Badge from '../components/ui/Badge.js';
import Icon from '../components/ui/Icon.js';

const Expenses = ({ expenses, setExpenses }) => {
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Office' });
    const categories = ['Office', 'Software', 'Travel', 'Marketing', 'Other'];

    const handleAdd = () => {
        if (!newExpense.description || !newExpense.amount) return;
        setExpenses([{ id: Date.now(), ...newExpense, date: new Date().toLocaleDateString() }, ...expenses]);
        setNewExpense({ description: '', amount: '', category: 'Office' });
    };

    const handleDelete = (id) => setExpenses(expenses.filter(e => e.id !== id));

    return (
        <div className="space-y-8 animate-fade-in">
            <header><h1 className="text-3xl font-bold">Expenses</h1></header>
            <Card>
                <div className="flex gap-4 mb-6 items-end">
                    <div className="flex-1"><Input label="Description" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="e.g. Hosting" /></div>
                    <div className="w-32"><Input label="Amount" type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="0.00" /></div>
                    <div className="w-40 mb-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Category</label>
                        <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none" value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="mb-4"><Button onClick={handleAdd} iconName="Plus">Add</Button></div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-semibold"><tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Description</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {expenses.map(exp => (
                            <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 text-slate-500 text-sm">{exp.date}</td>
                                <td className="px-6 py-4 font-medium">{exp.description}</td>
                                <td className="px-6 py-4"><Badge>{exp.category}</Badge></td>
                                <td className="px-6 py-4 font-mono text-red-500">-${parseFloat(exp.amount).toFixed(2)}</td>
                                <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(exp.id)} className="text-slate-400 hover:text-red-500"><Icon name="Trash2" size={16} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {expenses.length === 0 && <p className="text-center text-slate-400 py-8">No expenses recorded.</p>}

            </Card>
        </div>

    );
};

export default Expenses;
