import React, { useState } from 'react';
import Card from '../components/ui/Card.js';
import Button from '../components/ui/Button.js';
import Icon from '../components/ui/Icon.js';

const StudioAI = ({ plan, t }) => {
    const isLocked = plan !== 'ULTRA';
    const [activeTool, setActiveTool] = useState('cull');
    const [processing, setProcessing] = useState(false);
    const [images, setImages] = useState([]);

    const handleUpload = () => {
        setProcessing(true);
        setTimeout(() => {
            setImages(Array(8).fill(0).map((_, i) => ({ id: i, status: Math.random() > 0.3 ? 'good' : 'bad', tags: ['Bride', 'Outdoor'] })));
            setProcessing(false);
        }, 2000);
    };

    if (isLocked) return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6"><Icon name="Lock" size={40} className="text-slate-400" /></div>
            <h2 className="text-3xl font-bold mb-2">Studio AI is Locked</h2>
            <p className="text-slate-500 max-w-md mb-8">Upgrade to Ultra plan to access AI-powered image culling and album layout tools.</p>
            <Button variant="ultra">Upgrade to Ultra</Button>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex items-center gap-4">
                <h1 className="text-3xl font-bold ultra-text">{t('Studio AI')}</h1>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button onClick={() => setActiveTool('cull')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTool === 'cull' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>AI Culling</button>
                    <button onClick={() => setActiveTool('layout')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTool === 'layout' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>Smart Layout</button>
                </div>
            </header>

            {activeTool === 'cull' && (
                <Card>
                    {!images.length ? (
                        <div onClick={handleUpload} className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center cursor-pointer hover:border-brand-500 transition-colors">
                            {processing ? (
                                <div className="animate-pulse">
                                    <div className="w-12 h-12 bg-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center"><Icon name="Loader2" className="animate-spin text-brand-600" /></div>
                                    <h3 className="font-bold text-lg">Analyzing 1000+ photos...</h3>
                                    <p className="text-slate-500">Detecting focus, smiles, and composition.</p>
                                </div>
                            ) : (
                                <>
                                    <Icon name="UploadCloud" size={48} className="mx-auto text-slate-300 mb-4" />
                                    <h3 className="font-bold text-lg">Drop RAW files here</h3>
                                    <p className="text-slate-500">or click to browse</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map(img => (
                                <div key={img.id} className="relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden group">
                                    <div className={`absolute inset-0 border-4 ${img.status === 'good' ? 'border-emerald-500/50' : 'border-red-500/50'} z-10`} />
                                    <div className="absolute top-2 right-2 z-20">
                                        {img.status === 'good' ? <div className="bg-emerald-500 text-white p-1 rounded-full"><Icon name="Check" size={12} /></div> : <div className="bg-red-500 text-white p-1 rounded-full"><Icon name="X" size={12} /></div>}
                                    </div>
                                    <div className="absolute bottom-2 left-2 z-20 flex gap-1">
                                        {img.tags.map(tag => <span key={tag} className="text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">{tag}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            )}

            {activeTool === 'layout' && (
                <Card>
                    <div className="grid grid-cols-3 gap-4 h-96">
                        <div className="col-span-2 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-400">Select images to generate layout</p>
                        </div>
                        <div className="space-y-2 overflow-y-auto pr-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:ring-2 ring-brand-500 transition-all" />
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default StudioAI;
