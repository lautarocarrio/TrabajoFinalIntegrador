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

### Membresías

Campos respetando el DER (`MEMBRESIAS`): `id_membresia`, `usuario_id`,
`fecha_inicio`, `fecha_fin`, `estado` (`activa` / `vencida` / `pendiente`).
Cada respuesta incluye además `usuario` con un join simulado a `USUARIOS`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/membresias` | Listado paginado, ordenado y filtrado |
| `GET` | `/membresias/usuarios` | Opciones de usuarios para el formulario |
| `GET` | `/membresias/:id` | Detalle de una membresía |
| `POST` | `/membresias` | Alta (devuelve 201) |
| `PUT` | `/membresias/:id` | Modificación parcial o total |
| `DELETE` | `/membresias/:id` | Baja lógica sobre el mock en memoria |

Query params del listado:

| Parámetro | Descripción | Ejemplo |
| --- | --- | --- |
| `page` | Página (desde 1) | `page=2` |
| `limit` | Registros por página (1-50) | `limit=10` |
| `sortBy` | `id_membresia`, `usuario_id`, `fecha_inicio`, `fecha_fin`, `estado` | `sortBy=fecha_inicio` |
| `order` | `asc` / `desc` | `order=desc` |
| `estado` | Filtro por estado | `estado=activa` |
| `usuario_id` | Filtro por socio | `usuario_id=1` |
| `fechaDesde` / `fechaHasta` | Rango sobre `fecha_inicio` | `fechaDesde=2026-01-01` |

Ejemplo:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/v1/membresias?page=1&limit=5&estado=activa&sortBy=fecha_inicio&order=desc'
```

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
├── mocks/users.mock.js        # usuarios simulados (login)
├── mocks/usuarios.mock.js     # resumen de USUARIOS para el join
├── mocks/membresias.mock.js   # MEMBRESIAS en memoria + validaciones
├── modules/auth/auth.routes.js # rutas de autenticación
├── modules/membresias/        # rutas CRUD de membresías
├── utils/http.js              # respuestas HTTP unificadas
└── server.js                  # Express + CORS + middlewares
```

## Próximos pasos

1. Agregar las entidades de cada alumno (listado paginado, detalle y ABM mock).
2. Exportar la colección de Postman.
3. Configurar el deploy (CORS con la URL real del frontend).
