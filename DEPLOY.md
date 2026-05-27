# Despliegue del proyecto

Este proyecto se publica mejor en dos partes:

- Frontend React en Vercel.
- Backend FastAPI en Render o Railway con PostgreSQL.

No se debe subir a Drive el codigo completo con carpetas pesadas. Para entregar, basta compartir los enlaces publicados y, si el docente lo solicita, el repositorio GitHub sin `node_modules`, `.venv`, `dist`, logs ni bases locales.

## 1. Subir el codigo a GitHub

Antes de subir, verifica que no se incluyan carpetas generadas:

```powershell
git status
```

La configuracion actual ignora:

- `node_modules/`
- `dist/`
- `.venv*/`
- `.env`
- `*.log`
- archivos auxiliares de LaTeX

Luego sube el repositorio:

```powershell
git add .
git commit -m "Preparar proyecto para despliegue"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## 2. Publicar el backend

Opcion recomendada: Render.

1. Crear una cuenta en Render.
2. Crear un nuevo `Web Service` desde el repositorio GitHub.
3. Seleccionar como carpeta raiz: `backend`.
4. Usar Docker como entorno de ejecucion.
5. Crear una base de datos PostgreSQL.
6. Configurar variables de entorno:

```env
DATABASE_URL=postgresql+asyncpg://USUARIO:PASSWORD@HOST:PUERTO/NOMBRE_DB
SECRET_KEY=colocar_una_clave_larga_y_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
SENAMHI_API_URL=https://senamhi.gob.pe/api/
RENIPRESS_CSV_URL=https://www.susalud.gob.pe/registro-nacional/
CORS_ORIGINS=https://tu-frontend.vercel.app
```

El backend quedara con una URL parecida a:

```text
https://salud-preventiva-puno-api.onrender.com
```

Para probarlo:

```text
https://salud-preventiva-puno-api.onrender.com/docs
```

## 3. Publicar el frontend en Vercel

1. Crear una cuenta en Vercel.
2. Importar el repositorio desde GitHub.
3. Indicar como carpeta raiz: `frontend`.
4. Configurar:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Agregar variable de entorno:

```env
VITE_API_URL=https://salud-preventiva-puno-api.onrender.com
```

6. Desplegar.

La aplicacion quedara con una URL parecida a:

```text
https://salud-preventiva-puno.vercel.app
```

## 4. Ajustar CORS

Cuando Vercel entregue la URL final, vuelve al backend y actualiza:

```env
CORS_ORIGINS=https://salud-preventiva-puno.vercel.app
```

Si quieres permitir local y produccion al mismo tiempo:

```env
CORS_ORIGINS=http://localhost:5173,https://salud-preventiva-puno.vercel.app
```

## 5. Credenciales de prueba

El sistema crea usuarios de demostracion al iniciar:

```text
Usuario demo:
demo@puno.pe
password123

Usuario administrador:
admin@puno.pe
admin12345
```

## 6. Que enlaces entregar

Para la sustentacion, entrega:

- URL del frontend en Vercel.
- URL del backend `/docs`.
- Repositorio GitHub.
- PDF del informe tecnico.
- PDF del informe de curso.
- Notebook `.ipynb`.

