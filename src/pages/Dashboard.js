import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Icon from '../components/ui/Icon.js';
import { formatCurrency } from '../utils/helpers.js';

const Dashboard = ({ stats, setActiveTab }) => {
    // Mock Data for Charts
    const data = [
        { name: 'Jan', income: 4000, expense: 2400 },
        { name: 'Feb', income: 3000, expense: 1398 },
        { name: 'Mar', income: 2000, expense: 9800 },
        { name: 'Apr', income: 2780, expense: 3908 },
        { name: 'May', income: 1890, expense: 4800 },
        { name: 'Jun', income: 2390, expense: 3800 },
    ];

    const recentActivity = [
        { id: 1, type: 'invoice', text: 'Invoice #1024 paid', time: '2h ago', amount: '+$1,200' },
        { id: 2, type: 'expense', text: 'Server costs', time: '5h ago', amount: '-$50' },
        { id: 3, type: 'client', text: 'New client added', time: '1d ago', amount: '' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening.</p>
                </div>
                <button
                    onClick={() => signOut(auth)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors md:hidden"
                    title="Log Out"
                >
                    <Icon name="LogOut" size={20} />
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl"><Icon name="DollarSign" className="text-brand-600 dark:text-brand-400" /></div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.revenue}</div>
                    <div className="text-sm text-slate-500">Total Revenue</div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl"><Icon name="Clock" className="text-amber-600 dark:text-amber-400" /></div>
                        <span className="text-xs font-medium text-slate-500">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.pending}</div>
                    <div className="text-sm text-slate-500">Invoices Pending</div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl"><Icon name="TrendingUp" className="text-emerald-600 dark:text-emerald-400" /></div>
                        <span className="text-xs font-medium text-emerald-600">+8%</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.netIncome}</div>
                    <div className="text-sm text-slate-500">Net Income</div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl"><Icon name="PieChart" className="text-purple-600 dark:text-purple-400" /></div>
                        <span className="text-xs font-medium text-slate-500">Est.</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.tax}</div>
                    <div className="text-sm text-slate-500">Estimated Tax</div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Financial Chart */}
                <Card className="lg:col-span-2">
                    <h3 className="font-bold text-lg mb-6">Financial Overview</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="income" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Activity & Quick Actions */}
                <div className="space-y-8">
                    <Card title="Quick Actions">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setActiveTab('invoices')} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center group">
                                <div className="w-10 h-10 mx-auto bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Icon name="FileText" size={20} />
                                </div>
                                <span className="text-sm font-medium">New Invoice</span>
                            </button>
                            <button onClick={() => setActiveTab('expenses')} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center group">
                                <div className="w-10 h-10 mx-auto bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Icon name="Receipt" size={20} />
                                </div>
                                <span className="text-sm font-medium">Add Expense</span>
                            </button>
                            <button onClick={() => setActiveTab('clients')} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center group">
                                <div className="w-10 h-10 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Icon name="Users" size={20} />
                                </div>
                                <span className="text-sm font-medium">Add Client</span>
                            </button>
                            <button onClick={() => alert('Payment Link Copied!')} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center group">
                                <div className="w-10 h-10 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Icon name="Link" size={20} />
                                </div>
                                <span className="text-sm font-medium">Copy Link</span>
                            </button>
                        </div>
                    </Card>

                    <Card title="Recent Activity">
                        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'invoice' ? 'bg-emerald-100 text-emerald-600' :
                                        activity.type === 'expense' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                        <Icon name={
                                            activity.type === 'invoice' ? 'ArrowUpRight' :
                                                activity.type === 'expense' ? 'ArrowDownRight' :
                                                    'UserPlus'
                                        } size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{activity.text}</p>
                                        <p className="text-xs text-slate-500">{activity.time}</p>
                                    </div>
                                    {activity.amount && (
                                        <span className={`text-sm font-medium ${activity.type === 'invoice' ? 'text-emerald-600' : 'text-red-600'
                                            }`}>{activity.amount}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
