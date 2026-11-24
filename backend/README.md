# Backend

API REST del prototipo construida con **Express**. No hay base de datos: los datos
son **mocks en memoria** y todas las respuestas siguen una estructura única, de modo
que se puedan reemplazar por consultas reales sin cambiar el frontend.

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
| `npm run dev` | Inicia el servidor con recarga automática |
| `npm start` | Inicia el servidor en producción |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `npm run lint:fix` | Ejecuta ESLint y corrige lo que puede corregir |

## Endpoints mock

Base: `http://localhost:3000/api/v1`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/health` | Verificación de que la API está activa |
| `POST` | `/auth/login` | Ingreso simulado |
| `POST` | `/auth/register` | Registro simulado (no persiste) |
| `POST` | `/auth/forgot-password` | Recuperación simulada |

Todas las respuestas tienen el formato:

```json
{
  "success": true,
  "message": "Ingreso simulado correctamente",
  "data": { "user": { "id": 1, "name": "Usuario Demo", "email": "demo@test.com", "role": "admin" }, "token": "mock-token-..." },
  "errors": []
}
```

Usuario de prueba: `demo@test.com` / `123456`.

Ejemplo rápido:

```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/v1/auth/login `
  -Method Post -ContentType 'application/json' `
  -Body '{"email":"demo@test.com","password":"123456"}'
```

## Estructura

```
src/
├── config/env.js              # carga de variables de entorno
├── mocks/users.mock.js        # usuarios simulados
├── modules/auth/auth.routes.js# rutas de autenticación
├── utils/http.js              # respuestas HTTP unificadas
└── server.js                  # Express + CORS + middlewares
```

## Próximos pasos

1. Agregar las entidades de cada alumno (listado paginado, detalle y ABM mock).
2. Exportar la colección de Postman.
3. Configurar el deploy (CORS con la URL real del frontend).
