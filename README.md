# TeSoportamos MLOps v2.0 🚀

**TeSoportamos** es un sistema de gestión de incidencias premium, diseñado con una arquitectura moderna de microservicios (Backend FastAPI + Frontend React) y capacidades de MLOps para la priorización inteligente de tickets.

![TeSoportamos Banner](https://via.placeholder.com/1200x400?text=TeSoportamos+Premium+Dashboard)

## ✨ Características Principales

### 🧠 Inteligencia Artificial & MLOps
- **Priorización Automática**: Un algoritmo de reglas (fácilmente escalable a ML) analiza la descripción de cada incidencia y asigna una prioridad (CRÍTICA, ALTA, MEDIA, NORMAL) en tiempo real.
- **ETL Robusto**: Pipeline de extracción, transformación y carga (ETL) para procesar ficheros CSV masivos de Clientes e Incidencias, validando duplicados e integridad referencial.

### 🎨 Frontend Premium (Mobile First)
- **Diseño Glassmorphism**: Interfaz moderna con efectos de vidrio, gradientes y orbes animados.
- **Animaciones GSAP**: Transiciones fluidas y efectos "wow" en cada interacción.
- **100% Responsive**: Optimizado específicamente para dispositivos móviles (Galaxy S22) y escritorio.
- **Dashboard BI**: Visualización de datos en tiempo real con gráficos de sectores y barras (Recharts).

### 🛠️ Backend Potente
- **FastAPI**: Alto rendimiento y documentación automática (Swagger UI).
- **MySQL**: Persistencia de datos robusta y escalable.
- **Arquitectura Limpia**: Separación de esquemas (Pydantic), modelos (SQLAlchemy) y lógica de negocio.

---

## 🏗️ Stack Tecnológico

### Backend
- **Lenguaje**: Python 3.10+
- **Framework**: FastAPI
- **Base de Datos**: MySQL
- **ORM**: SQLAlchemy
- **Procesamiento de Datos**: Pandas
- **Servidor**: Uvicorn

### Frontend
- **Framework**: React 19 + Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: GSAP (GreenSock)
- **Gráficos**: Recharts
- **Iconos**: Lucide React

---

## 🚀 Guía de Instalación

### Prerrequisitos
- Python 3.10+
- Node.js 18+
- MySQL Server (corriendo en localhost:3306)
- Credenciales BD: Usuario `admin`, Contraseña `admin` (o configurar en `backend/main.py`)

### 1. Configuración del Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
.\venv\Scripts\activate

# Instalar dependencias
pip install fastapi uvicorn sqlalchemy mysql-connector-python pandas python-multipart

# Iniciar servidor
python -m uvicorn main:app --reload
```
*El backend correrá en `http://localhost:8000`*

### 2. Configuración del Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```
*El frontend correrá en `http://localhost:5175` (o el puerto que indique Vite)*

---

## 📖 Guía de Uso

1.  **Menú Principal**: Navega a través de las tarjetas animadas para acceder a las funcionalidades.
2.  **Carga Masiva (ETL)**:
    *   Ve a "Carga Masiva".
    *   Sube los archivos `clientes.csv` e `incidencias.csv`.
    *   El sistema procesará los datos, evitará duplicados y asignará prioridades automáticamente.
3.  **Listados**:
    *   Ve a "Listados".
    *   Busca un cliente por nombre o email.
    *   Haz clic para ver su historial de incidencias ordenadas por fecha.
4.  **Nueva Entrada**:
    *   Crea nuevos clientes o incidencias manualmente.
    *   La IA asignará la prioridad a la incidencia al momento de crearla.
5.  **Actualizar Estado**:
    *   Cambia el estado de una incidencia (ABIERTA -> CERRADA).
    *   Recibe un mensaje de confirmación detallado con todos los datos de la operación.
6.  **Dashboard BI**:
    *   Visualiza métricas clave y distribución de incidencias por estado y prioridad.

---

## 📂 Estructura del Proyecto

```
te_soportamos_mlops/
├── backend/                # API FastAPI
│   ├── main.py             # Punto de entrada y lógica
│   ├── clientes.csv        # Datos de prueba
│   └── incidencias.csv     # Datos de prueba
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Layout)
│   │   ├── pages/          # Vistas (Menu, Dashboard, ETL, etc.)
│   │   └── index.css       # Estilos globales Tailwind
│   └── ...
└── README.md               # Documentación
```

---

**Desarrollado por [Tu Nombre/Equipo]** - *TeSoportamos v2.0*
