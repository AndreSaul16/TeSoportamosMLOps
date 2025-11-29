import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardBI: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/estadisticas')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-20">Cargando métricas...</div>;
    if (!stats) return <div className="text-center mt-20 text-red-400">Error al cargar datos</div>;

    const priorityData = [
        { name: 'Crítica', value: stats.por_prioridad.critica, color: '#ef4444' }, // Red
        { name: 'Alta', value: stats.por_prioridad.alta, color: '#f97316' }, // Orange
        { name: 'Media', value: stats.por_prioridad.media, color: '#eab308' }, // Yellow
        { name: 'Normal', value: stats.por_prioridad.normal, color: '#22c55e' }, // Green
    ];

    const statusData = [
        { name: 'Abierta', value: stats.por_estado.abierta, color: '#3b82f6' },
        { name: 'En Proceso', value: stats.por_estado.en_proceso, color: '#8b5cf6' },
        { name: 'Cerrada', value: stats.por_estado.cerrada, color: '#64748b' },
    ];

    return (
        <div className="max-w-6xl mx-auto w-full animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-3xl font-bold">Dashboard de Métricas</h2>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-panel p-6 text-center">
                    <h3 className="text-slate-400 text-sm mb-2">Total Clientes</h3>
                    <p className="text-4xl font-bold text-indigo-400">{stats.total_clientes}</p>
                </div>
                <div className="glass-panel p-6 text-center">
                    <h3 className="text-slate-400 text-sm mb-2">Total Incidencias</h3>
                    <p className="text-4xl font-bold text-pink-400">{stats.total_incidencias}</p>
                </div>
                <div className="glass-panel p-6 text-center">
                    <h3 className="text-slate-400 text-sm mb-2">Críticas</h3>
                    <p className="text-4xl font-bold text-red-500">{stats.por_prioridad.critica}</p>
                </div>
                <div className="glass-panel p-6 text-center">
                    <h3 className="text-slate-400 text-sm mb-2">Abiertas</h3>
                    <p className="text-4xl font-bold text-blue-400">{stats.por_estado.abierta}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 h-96">
                    <h3 className="text-xl font-semibold mb-6 text-center">Incidencias por Prioridad (IA)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={priorityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 text-xs mt-4">
                        {priorityData.map((item) => (
                            <div key={item.name} className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 h-96">
                    <h3 className="text-xl font-semibold mb-6 text-center">Estado de Incidencias</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardBI;
