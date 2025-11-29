import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Search, MessageSquare } from 'lucide-react';

const UpdateView: React.FC = () => {
    const [incidenciaId, setIncidenciaId] = useState('');
    const [nuevoEstado, setNuevoEstado] = useState('CERRADA');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!incidenciaId) return;

        setLoading(true);
        setMensaje(null);
        setError(null);

        try {
            const res = await fetch(`http://localhost:8000/api/incidencias/${incidenciaId}/estado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Error al actualizar");
            }

            const data = await res.json();
            setMensaje(data.mensaje);
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
                <h2 className="text-3xl font-bold">Actualizar Estado</h2>
            </div>

            <div className="glass-panel p-8">
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">ID de la Incidencia</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                required
                                type="number"
                                value={incidenciaId}
                                onChange={e => setIncidenciaId(e.target.value)}
                                className="input-field pl-10"
                                placeholder="Introduzca ID..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Nuevo Estado</label>
                        <select
                            value={nuevoEstado}
                            onChange={e => setNuevoEstado(e.target.value)}
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
                        className="w-full glass-button flex justify-center items-center gap-2"
                    >
                        {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                        Actualizar Incidencia
                    </button>
                </form>

                {/* Result Message */}
                {mensaje && (
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 animate-fade-in">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-300 shrink-0">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Actualización Exitosa</h4>
                                <p className="text-slate-300 leading-relaxed italic">"{mensaje}"</p>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-center animate-fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateView;
