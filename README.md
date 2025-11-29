# TeSoportamos MLOps v3.0 🚀🧠

**TeSoportamos** es un sistema de gestión de incidencias premium, potenciado con **Inteligencia Artificial** para el análisis de sentimiento y la predicción de demanda. Diseñado con una arquitectura moderna de microservicios (Backend FastAPI + Frontend React).

![TeSoportamos Banner](https://via.placeholder.com/1200x400?text=TeSoportamos+AI+Dashboard)

## ✨ Características Principales

### 🧠 Inteligencia Artificial & MLOps (Nuevo en v3.0)
- **Análisis de Sentimiento**: Detecta automáticamente si el cliente está enfadado (😡), neutro (😐) o feliz (😃) basándose en la descripción de la incidencia.
- **Predicción de Demanda**: Modelo de Machine Learning (`RandomForest`) que predice el volumen de incidencias para los próximos 7 días basándose en datos históricos.
- **Priorización Automática**: Algoritmo que asigna prioridad (CRÍTICA, ALTA, MEDIA, NORMAL) según palabras clave.

### 🎨 Frontend Premium (Mobile First)
- **Diseño Glassmorphism**: Interfaz moderna con efectos de vidrio, gradientes y orbes animados.
- **Animaciones GSAP**: Transiciones fluidas y efectos "wow" en cada interacción.
- **Dashboard BI Avanzado**: Gráficos de sentimiento, predicción de demanda, estado y prioridad.
- **100% Responsive**: Optimizado para móviles y escritorio.

### 🛠️ Backend Potente
- **FastAPI**: Alto rendimiento y documentación automática.
- **MySQL**: Persistencia de datos robusta.
- **ETL Integrado**: Carga masiva de datos con validación.

---

## 🏗️ Stack Tecnológico

### Backend
- **Lenguaje**: Python 3.10+
- **Framework**: FastAPI
- **ML/Data**: `scikit-learn`, `pandas`, `textblob`, `numpy`
- **Base de Datos**: MySQL
- **ORM**: SQLAlchemy

### Frontend
- **Framework**: React 19 + Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: GSAP
- **Gráficos**: Recharts

---

## 🚀 Guía de Instalación

### Prerrequisitos
- Python 3.10+
- Node.js 18+
- MySQL Server (corriendo en localhost:3306)
- Credenciales BD: Usuario `admin`, Contraseña `admin`

### 1. Configuración del Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
.\venv\Scripts\activate

# Instalar dependencias (incluyendo ML)
pip install fastapi uvicorn sqlalchemy mysql-connector-python pandas python-multipart scikit-learn textblob

# Descargar corpus para análisis de sentimiento
python -m textblob.download_corpora

# (Opcional) Generar datos históricos para probar la predicción
# Esto borrará la BD actual y creará 500 incidencias falsas
python reset_db.py
python dummy_data_generator.py

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
*El frontend correrá en `http://localhost:5175`*

---

## 📖 Guía de Uso

1.  **Dashboard BI**: Visualiza la predicción de demanda futura y el sentimiento de los clientes en tiempo real.
2.  **Listado de Clientes**: Observa los emojis de sentimiento (😡/😐/😃) junto a cada incidencia.
3.  **Nueva Incidencia**: Al crear una incidencia, el sistema calcula automáticamente su prioridad y sentimiento.
4.  **Carga Masiva (ETL)**: Sube archivos CSV para procesar grandes volúmenes de datos.

---

## 📂 Estructura del Proyecto

```
te_soportamos_mlops/
├── backend/
│   ├── main.py                 # API y Lógica ML
│   ├── dummy_data_generator.py # Generador de datos sintéticos
│   ├── reset_db.py             # Utilidad para resetear BD
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/              # DashboardBI, ClientListView, etc.
│   │   └── ...
│   └── ...
└── README.md
```

---

**Desarrollado por [Tu Nombre/Equipo]** - *TeSoportamos v3.0*
