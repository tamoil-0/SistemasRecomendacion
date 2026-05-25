# Sistema de Recomendacion de Centros de Salud Preventiva - Puno

Sistema funcional para recomendar establecimientos de salud preventiva en la Region Puno usando filtrado basado en contenido, capacidad operativa, distancia geografica y penalidad climatica.

## Requisitos previos

- Python 3.10+ o 3.11+
- Node 20+ recomendado
- Docker y Docker Compose
- PostgreSQL 16 si se ejecuta sin Docker y con base externa

## Estructura del proyecto

```text
backend/
  app/
    models/
    schemas/
    routers/
    services/
    ml/
    utils/
  alembic/
  data/
  tests/
frontend/
  src/
    api/
    context/
    pages/
    components/
    hooks/
notebook/
  data/
  models/
  sistema_recomendacion_salud_puno.ipynb
informe/
  informe_tecnico.tex
  referencias.bib
```

## Instalacion paso a paso

### Backend local con SQLite

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\backend"
.\.venv_backend\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

La API queda en:

```text
http://localhost:8000
http://localhost:8000/docs
```

Si necesitas recrear el entorno:

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\backend"
py -3.10 -m venv .venv_backend
.\.venv_backend\Scripts\python.exe -m pip install -r requirements.txt
```

### Frontend

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\frontend"
npm install --cache C:\tmp\npm-cache
npm run dev
```

La aplicacion queda en:

```text
http://localhost:5173
```

## Variables de entorno

Backend local:

```env
DATABASE_URL=sqlite+aiosqlite:///./salud_puno_dev.db
SECRET_KEY=clave_local_de_desarrollo_cambiar_en_produccion
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
SENAMHI_API_URL=https://senamhi.gob.pe/api/
RENIPRESS_CSV_URL=https://www.susalud.gob.pe/registro-nacional/
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

Backend Docker/PostgreSQL:

```env
DATABASE_URL=postgresql+asyncpg://salud_user:salud_pass@db:5432/salud_puno
```

Frontend:

```env
VITE_API_URL=http://localhost:8000
```

## Ejecucion con Docker

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\backend"
docker-compose up --build
```

Servicios:

- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`
- Frontend Nginx: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

## Cargar datos

Al iniciar, el backend crea tablas y carga datos reproducibles desde:

```text
backend/data/renipress_puno_seed.csv
```

Tambien crea alertas SENAMHI equivalentes desde el servicio interno.

Endpoints administrativos:

```http
POST /api/v1/admin/sync-renipress
POST /api/v1/admin/sync-senamhi
POST /api/v1/admin/retrain
```

Estos endpoints requieren JWT y usuario administrador.

## Uso del sistema

1. Inicia el backend en `http://localhost:8000`.
2. Inicia el frontend en `http://localhost:5173`.
3. Registra un usuario:

```text
Nombre: Usuario Demo
Email: demo@puno.pe
Password: password123
```

4. Ingresa al formulario de busqueda.
5. Selecciona tipo de atencion, edad, ubicacion, distancia maxima y Top-N.
6. Visualiza recomendaciones, mapa, alertas y score final.
7. Consulta el historial desde la opcion Historial.

## Tests

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\backend"
$env:PYTHONDONTWRITEBYTECODE='1'
.\.venv_backend\Scripts\python.exe -m pytest -p no:cacheprovider tests
```

Resultado verificado:

```text
13 passed
```

## Notebook

Abrir:

```text
notebook/sistema_recomendacion_salud_puno.ipynb
```

El notebook incluye:

- Carga RENIPRESS y SENAMHI.
- Limpieza y EDA.
- Mapas Folium.
- Matriz de servicios.
- Modelo content-based.
- Precision@K, Recall@K y baseline SVD/sintetico.
- Serializacion en `notebook/models/`.

## Informe tecnico

Archivos:

```text
informe/informe_tecnico.tex
informe/referencias.bib
```

Compilacion:

```powershell
cd "D:\SISTEMAS DE RECOMENDACION\Prototipo\informe"
pdflatex informe_tecnico.tex
bibtex informe_tecnico
pdflatex informe_tecnico.tex
pdflatex informe_tecnico.tex
```

## Etica y privacidad

El sistema no almacena datos clinicos individuales. Solo registra consultas preventivas operativas: ubicacion, tipo de atencion, edad, distancia maxima y recomendaciones generadas. El tratamiento se documenta bajo principios de minimizacion y finalidad, alineado con la Ley N. 29733 y el Decreto Supremo N. 003-2013-JUS.

