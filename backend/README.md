# Backend

API REST del prototipo, construida con **Express**. En esta etapa solo están
instaladas las dependencias y configurado ESLint; todavía no hay servidor ni rutas.

## Requisitos

- Node.js `^20.19.0 || ^22.13.0 || >=24` (requerido por ESLint 10)
- npm >= 10

## Instalación

```bash
cd backend
npm install
Copy-Item sample.env .env     # PowerShell en Windows
# cp sample.env .env         # macOS / Linux
```

El archivo `.env` está ignorado por Git. Nunca se versiona: se commitea solo `sample.env`.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `PORT` | Puerto del servidor Express | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `CORS_ORIGIN` | Origen permitido por CORS | `http://localhost:5173` |

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el servidor con recarga automática (próximo commit) |
| `npm start` | Inicia el servidor en producción (próximo commit) |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `npm run lint:fix` | Ejecuta ESLint y corrige lo que puede corregir |

## Dependencias principales

- `express`: servidor HTTP y enrutamiento.
- `cors`: configuración de CORS para el deploy.
- `dotenv`: carga de variables de entorno.
- `eslint`, `@eslint/js`, `globals` (dev): estandarización de código.

## Próximos pasos

1. Crear `src/server.js` con el servidor Express y CORS.
2. Unificar el formato de respuestas HTTP (2xx / 4xx / 5xx).
3. Agregar los endpoints `/api/v1/...` con datos mock.
