import React, { useState } from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Input from '../components/ui/Input.js';
import Icon from '../components/ui/Icon.js';

const Clients = ({ plan, clients, setClients }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', address: '' });

    const handleAdd = () => {
        if (plan === 'FREE' && clients.length >= 5) { alert('Free limit reached (5 clients). Upgrade to Pro!'); return; }
        if (!newClient.name) return;
        setClients([...clients, { id: Date.now(), ...newClient }]);
        setNewClient({ name: '', email: '', address: '' });
        setIsAdding(false);
    };

    const handleDelete = (id) => setClients(clients.filter(c => c.id !== id));

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Clients</h1>
                <Button onClick={() => setIsAdding(true)} iconName="Plus">Add Client</Button>
            </header>
            {isAdding && (
                <Card className="mb-6 animate-slide-up">
                    <h3 className="font-bold mb-4">New Client</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <Input label="Name" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
                        <Input label="Email" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} />
                        <Input label="Address/Details" className="md:col-span-2" value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button onClick={handleAdd}>Save Client</Button>
                    </div>
                </Card>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map(client => (
                    <Card key={client.id}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold text-lg">{client.name[0]}</div>
                            <button onClick={() => handleDelete(client.id)} className="text-slate-400 hover:text-red-500"><Icon name="Trash2" size={16} /></button>
                        </div>
                        <h3 className="font-bold text-lg">{client.name}</h3>
                        <p className="text-slate-500 text-sm mb-4">{client.email}</p>
                        <p className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">{client.address || 'No address provided'}</p>
                    </Card>
                ))}
            </div>
            {clients.length === 0 && !isAdding && <p className="text-center text-slate-400 py-12">No clients yet. Add one to get started!</p>}
        </div>
    );
};

export default Clients;
