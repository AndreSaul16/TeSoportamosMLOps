import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, List, PlusCircle, BarChart3, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

const Menu: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".menu-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const menuItems = [
        {
            title: "Carga Masiva (ETL)",
            desc: "Importar Clientes e Incidencias desde CSV",
            icon: <Upload size={32} />,
            path: "/etl",
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Listados",
            desc: "Ver Clientes e Incidencias",
            icon: <List size={32} />,
            path: "/list",
            color: "from-indigo-500 to-purple-500"
        },
        {
            title: "Nueva Entrada",
            desc: "Registrar Cliente o Incidencia",
            icon: <PlusCircle size={32} />,
            path: "/create",
            color: "from-pink-500 to-rose-500"
        },
        {
            title: "Actualizar Estado",
            desc: "Gestionar estado de incidencias",
            icon: <RefreshCw size={32} />,
            path: "/update",
            color: "from-orange-500 to-amber-500"
        },
        {
            title: "Dashboard BI",
            desc: "Estadísticas y Métricas",
            icon: <BarChart3 size={32} />,
            path: "/dashboard",
            color: "from-emerald-500 to-teal-500",
            fullWidth: true
        }
    ];

    return (
        <div ref={containerRef} className="flex flex-col justify-center h-full">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-2">Bienvenido</h2>
                <p className="text-slate-400">Selecciona una operación para comenzar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className={`menu-card group relative overflow-hidden rounded-2xl p-6 glass-panel border-0
              hover:scale-[1.02] transition-transform duration-300 cursor-pointer
              ${item.fullWidth ? 'md:col-span-2' : ''}`}
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${item.color}`} />

                        <div className="relative z-10 flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;
