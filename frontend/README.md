# Frontend

SPA del prototipo construida con **React + Vite + React Router**. Incluye las
pantallas de login, registro y recuperación de contraseña, el menú principal con
botones grandes adaptados a mobile y placeholders para las pantallas de cada
alumno. Estilo minimalista. Por defecto funciona con **mocks en el propio
frontend**, sin necesidad de backend.

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
| `/login` | Inicio de sesión (redirige a `/menu` cuando el login es exitoso) |
| `/register` | Registro de usuario |
| `/recuperar-contrasena` | Recuperación de contraseña |
| `/menu` | Menú principal con accesos a Clases, Membresía y Perfil |
| `/clases` | Placeholder — a implementar por el alumno responsable |
| `/membresia` | Placeholder — a implementar por el alumno responsable |
| `/perfil` | Redirige a `/usuarios/{id}` del usuario logueado |
| `/usuarios/:id` | Perfil del usuario (placeholder — a implementar) |

Cualquier otra ruta redirige a `/login`.

Usuario de prueba: `demo@test.com` / `123456`. Al ingresar se guarda la sesión simulada
en `localStorage`, y "Mi perfil" apunta a `/usuarios/1` (el id de ese usuario).

## Estructura

```
src/
├── components/Message.jsx     # mensajes de error / éxito
├── components/PagePlaceholder.jsx # placeholder reutilizable
├── layouts/AuthLayout.jsx     # layout común de autenticación
├── layouts/AppLayout.jsx      # header + contenido + footer del área autenticada
├── pages/                     # Login, Register, Recuperar, Menú y placeholders
├── services/authService.js    # mocks / llamadas a la API
├── services/session.js        # usuario logueado guardado en localStorage
├── styles/global.css          # estilos minimalistas
├── App.jsx                    # rutas
└── main.jsx                   # arranque de React
```

## Próximos pasos

1. Que cada alumno reemplace su placeholder (`ClasesPage`, `MembresiaPage`,
   `PerfilPage`) por la interfaz definitiva.
2. Agregar listado, detalle y exportación de cada entidad.
3. Conectar con el backend real usando `VITE_USE_MOCKS=false`.
