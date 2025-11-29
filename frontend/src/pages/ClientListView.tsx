import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, User, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

interface Incidencia {
    id: number;
    fecha: string;
    descripcion: string;
    estado: string;
    prioridad_ia: string;
}

const ClientListView: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/clientes/sorted')
            .then(res => res.json())
            .then(data => {
                setClientes(data);
                setLoading(false);
            });
    }, []);

    const handleSelectCliente = async (cliente: Cliente) => {
        setSelectedCliente(cliente);
        const res = await fetch(`http://localhost:8000/api/clientes/${cliente.id}/incidencias`);
        const data = await res.json();
        setIncidencias(data);
    };

    const filteredClientes = clientes.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'CRÍTICA': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'ALTA': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'MEDIA': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-green-500 bg-green-500/10 border-green-500/20';
        }
    };

    return (
        <div className="max-w-6xl mx-auto w-full animate-fade-in h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center gap-4 mb-6 shrink-0">
                <Link to="/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-3xl font-bold">Listado de Clientes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow overflow-hidden">
                {/* Client List */}
                <div className="glass-panel flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10 py-2"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-grow p-2 space-y-2">
                        {loading ? (
                            <div className="text-center p-4 text-slate-400">Cargando...</div>
                        ) : filteredClientes.map(cliente => (
                            <div
                                key={cliente.id}
                                onClick={() => handleSelectCliente(cliente)}
                                className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3
                  ${selectedCliente?.id === cliente.id
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'hover:bg-white/5 text-slate-300'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                  ${selectedCliente?.id === cliente.id ? 'bg-white/20' : 'bg-slate-700'}`}>
                                    <User size={18} />
                                </div>
                                <div className="truncate">
                                    <p className="font-semibold truncate">{cliente.nombre}</p>
                                    <p className={`text-xs truncate ${selectedCliente?.id === cliente.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                                        {cliente.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident Details */}
                <div className="md:col-span-2 glass-panel flex flex-col overflow-hidden">
                    {!selectedCliente ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                            <User size={64} className="mb-4 opacity-20" />
                            <p>Selecciona un cliente para ver sus incidencias</p>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <h3 className="text-2xl font-bold mb-1">{selectedCliente.nombre}</h3>
                                <div className="flex gap-4 text-sm text-slate-400">
                                    <span>ID: {selectedCliente.id}</span>
                                    <span>•</span>
                                    <span>{selectedCliente.email}</span>
                                    <span>•</span>
                                    <span>{selectedCliente.telefono}</span>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                                {incidencias.length === 0 ? (
                                    <div className="text-center text-slate-500 py-10">Este cliente no tiene incidencias registradas.</div>
                                ) : incidencias.map(inc => (
                                    <div key={inc.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar size={14} />
                                                <span>{inc.fecha}</span>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getPriorityColor(inc.prioridad_ia)}`}>
                                                {inc.prioridad_ia}
                                            </span>
                                        </div>

                                        <p className="text-slate-200 mb-4">{inc.descripcion}</p>

                                        <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                                            <div className="flex items-center gap-2">
                                                {inc.estado === 'ABIERTA' && <AlertTriangle size={16} className="text-blue-400" />}
                                                {inc.estado === 'EN PROCESO' && <Clock size={16} className="text-purple-400" />}
                                                {inc.estado === 'CERRADA' && <CheckCircle size={16} className="text-slate-400" />}
                                                <span className="text-sm font-medium">{inc.estado}</span>
                                            </div>
                                            <span className="text-xs text-slate-500">ID: {inc.id}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientListView;
