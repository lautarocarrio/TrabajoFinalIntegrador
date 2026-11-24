# Frontend

SPA del prototipo construida con **React + Vite + React Router**. Incluye las
pantallas de login, registro y recuperación de contraseña con estilo minimalista.
Por defecto funciona con **mocks en el propio frontend**, sin necesidad de backend.

## Requisitos

- Node.js `^20.19.0 || >=22.12.0` (requerido por Vite 8)
- npm >= 10

## Instalación

```bash
cd frontend
npm install
Copy-Item sample.env .env     # PowerShell en Windows
# cp sample.env .env         # macOS / Linux
```

El archivo `.env` está ignorado por Git. Nunca se versiona: se commitea solo `sample.env`.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API consumida por el frontend | `http://localhost:3000/api/v1` |
| `VITE_USE_MOCKS` | `true` = mocks locales, `false` = API real | `true` |

Cuando el backend esté corriendo, cambiá `VITE_USE_MOCKS` a `false` y las mismas
pantallas van a consumir los endpoints Express sin modificarse.

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Levanta Vite en modo desarrollo (`http://localhost:5173`) |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `npm run lint:fix` | Ejecuta ESLint y corrige lo que puede corregir |

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/recuperar-contrasena` | Recuperación de contraseña |

Cualquier otra ruta redirige a `/login`.

Usuario de prueba: `demo@test.com` / `123456`.

## Estructura

```
src/
├── components/Message.jsx     # mensajes de error / éxito
├── layouts/AuthLayout.jsx     # layout común de autenticación
├── pages/                     # Login, Register y Recuperar contraseña
├── services/authService.js    # mocks / llamadas a la API
├── styles/global.css          # estilos minimalistas
├── App.jsx                    # rutas
└── main.jsx                   # arranque de React
```

## Próximos pasos

1. Armar el layout principal (Header, Footer, menú y perfil) y el dashboard.
2. Agregar las pantallas de cada entidad con lista, detalle y exportación.
3. Conectar con el backend real usando `VITE_USE_MOCKS=false`.
