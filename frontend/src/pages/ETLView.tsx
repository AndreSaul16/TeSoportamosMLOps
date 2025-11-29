import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ETLView: React.FC = () => {
    const [clientesFile, setClientesFile] = useState<File | null>(null);
    const [incidenciasFile, setIncidenciasFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async () => {
        if (!clientesFile && !incidenciasFile) {
            setError("Selecciona al menos un archivo.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        if (clientesFile) formData.append('clientes_file', clientesFile);
        if (incidenciasFile) formData.append('incidencias_file', incidenciasFile);

        try {
            const res = await fetch('http://localhost:8000/api/etl/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Error en la carga");
            }

            const data = await res.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-3xl font-bold">Carga Masiva (ETL)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upload Form */}
                <div className="glass-panel p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Upload className="text-indigo-400" /> Subir Archivos CSV
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Fichero de Clientes (clientes.csv)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setClientesFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className={`input-field flex items-center justify-between ${clientesFile ? 'border-indigo-500 bg-indigo-500/10' : ''}`}>
                                    <span className="truncate">{clientesFile ? clientesFile.name : "Seleccionar archivo..."}</span>
                                    <FileText size={18} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Fichero de Incidencias (incidencias.csv)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setIncidenciasFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className={`input-field flex items-center justify-between ${incidenciasFile ? 'border-pink-500 bg-pink-500/10' : ''}`}>
                                    <span className="truncate">{incidenciasFile ? incidenciasFile.name : "Seleccionar archivo..."}</span>
                                    <FileText size={18} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className={`w-full glass-button flex justify-center items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Procesando...' : 'Iniciar Carga ETL'}
                        </button>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 flex items-start gap-3">
                                <AlertCircle className="shrink-0 mt-1" size={18} />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Panel */}
                <div className="glass-panel p-8 flex flex-col justify-center">
                    {!result ? (
                        <div className="text-center text-slate-500">
                            <Upload size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Sube los archivos para ver el resultado del procesamiento aquí.</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-6 text-green-400">
                                <CheckCircle size={32} />
                                <h3 className="text-xl font-bold">Proceso Completado</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                    <p className="text-slate-400 text-sm">Líneas Leídas</p>
                                    <p className="text-3xl font-bold text-white">{result.lineas_leidas}</p>
                                </div>

                                <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                                    <p className="text-indigo-300 text-sm">Inserciones Reales</p>
                                    <p className="text-3xl font-bold text-indigo-400">{result.insertados_reales}</p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-700">
                                    <p className="text-sm text-slate-400 mb-2">Detalles del Log:</p>
                                    <div className="text-xs font-mono bg-black/30 p-3 rounded h-32 overflow-y-auto text-slate-300">
                                        {result.mensaje.split('|').map((msg: string, i: number) => (
                                            <div key={i} className="mb-1">{msg.trim()}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ETLView;
