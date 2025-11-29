import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, FilePlus, CheckCircle, AlertCircle } from 'lucide-react';

const CreateView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'cliente' | 'incidencia'>('cliente');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Client Form State
    const [clientForm, setClientForm] = useState({ nombre: '', email: '', telefono: '' });

    // Incident Form State
    const [incidentForm, setIncidentForm] = useState({ id_cliente: '', descripcion: '', estado: 'ABIERTA' });

    const handleClientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('http://localhost:8000/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientForm),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Error al crear cliente");
            }

            const data = await res.json();
            setSuccess(`Cliente creado con éxito! ID: ${data.id}`);
            setClientForm({ nombre: '', email: '', telefono: '' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleIncidentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('http://localhost:8000/api/incidencias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...incidentForm,
                    id_cliente: parseInt(incidentForm.id_cliente),
                    fecha: new Date().toLocaleDateString('es-ES').replace(/\//g, '-') // Formato DD-MM-YYYY
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Error al crear incidencia");
            }

            const data = await res.json();
            setSuccess(`Incidencia creada con éxito! ID: ${data.id} (Prioridad IA: ${data.prioridad_ia})`);
            setIncidentForm({ id_cliente: '', descripcion: '', estado: 'ABIERTA' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-3xl font-bold">Nueva Entrada</h2>
            </div>

            <div className="glass-panel overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => { setActiveTab('cliente'); setSuccess(null); setError(null); }}
                        className={`flex-1 py-4 text-center font-semibold transition-colors flex items-center justify-center gap-2
              ${activeTab === 'cliente' ? 'bg-indigo-600/20 text-indigo-300 border-b-2 border-indigo-500' : 'hover:bg-white/5 text-slate-400'}`}
                    >
                        <UserPlus size={20} /> Nuevo Cliente
                    </button>
                    <button
                        onClick={() => { setActiveTab('incidencia'); setSuccess(null); setError(null); }}
                        className={`flex-1 py-4 text-center font-semibold transition-colors flex items-center justify-center gap-2
              ${activeTab === 'incidencia' ? 'bg-pink-600/20 text-pink-300 border-b-2 border-pink-500' : 'hover:bg-white/5 text-slate-400'}`}
                    >
                        <FilePlus size={20} /> Nueva Incidencia
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'cliente' ? (
                        <form onSubmit={handleClientSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Nombre Completo</label>
                                <input
                                    required
                                    type="text"
                                    value={clientForm.nombre}
                                    onChange={e => setClientForm({ ...clientForm, nombre: e.target.value })}
                                    className="input-field"
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    value={clientForm.email}
                                    onChange={e => setClientForm({ ...clientForm, email: e.target.value })}
                                    className="input-field"
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Teléfono</label>
                                <input
                                    required
                                    type="tel"
                                    value={clientForm.telefono}
                                    onChange={e => setClientForm({ ...clientForm, telefono: e.target.value })}
                                    className="input-field"
                                    placeholder="+34 600 000 000"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full glass-button mt-4 flex justify-center"
                            >
                                {loading ? 'Guardando...' : 'Crear Cliente'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleIncidentSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">ID del Cliente</label>
                                <input
                                    required
                                    type="number"
                                    value={incidentForm.id_cliente}
                                    onChange={e => setIncidentForm({ ...incidentForm, id_cliente: e.target.value })}
                                    className="input-field"
                                    placeholder="ID numérico del cliente"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Descripción del Problema</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={incidentForm.descripcion}
                                    onChange={e => setIncidentForm({ ...incidentForm, descripcion: e.target.value })}
                                    className="input-field resize-none"
                                    placeholder="Describe el problema (ej: El servidor se ha caído, urge arreglarlo)"
                                />
                                <p className="text-xs text-slate-500 mt-1">La IA analizará este texto para asignar prioridad.</p>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Estado Inicial</label>
                                <select
                                    value={incidentForm.estado}
                                    onChange={e => setIncidentForm({ ...incidentForm, estado: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="ABIERTA">ABIERTA</option>
                                    <option value="EN PROCESO">EN PROCESO</option>
                                    <option value="CERRADA">CERRADA</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full glass-button mt-4 flex justify-center"
                            >
                                {loading ? 'Guardando...' : 'Crear Incidencia'}
                            </button>
                        </form>
                    )}

                    {/* Feedback Messages */}
                    {success && (
                        <div className="mt-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 flex items-center gap-3 animate-fade-in">
                            <CheckCircle size={20} />
                            <p>{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 flex items-center gap-3 animate-fade-in">
                            <AlertCircle size={20} />
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateView;
