import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ETLView: React.FC = () => (
    <div className="glass-panel p-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"><ArrowLeft size={20} /> Volver</Link>
        <h2 className="text-2xl font-bold mb-4">Carga Masiva (ETL)</h2>
        <p>Próximamente: Interfaz de carga de archivos.</p>
    </div>
);

export const ClientListView: React.FC = () => (
    <div className="glass-panel p-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"><ArrowLeft size={20} /> Volver</Link>
        <h2 className="text-2xl font-bold mb-4">Listado de Clientes</h2>
        <p>Próximamente: Tabla de clientes y buscador.</p>
    </div>
);

export const CreateView: React.FC = () => (
    <div className="glass-panel p-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"><ArrowLeft size={20} /> Volver</Link>
        <h2 className="text-2xl font-bold mb-4">Crear Nuevo</h2>
        <p>Próximamente: Formularios de creación.</p>
    </div>
);

export const UpdateView: React.FC = () => (
    <div className="glass-panel p-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"><ArrowLeft size={20} /> Volver</Link>
        <h2 className="text-2xl font-bold mb-4">Actualizar Estado</h2>
        <p>Próximamente: Gestión de estados.</p>
    </div>
);
