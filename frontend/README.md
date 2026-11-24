# Frontend

SPA del prototipo construida con **React + Vite**. En esta etapa solo están
instaladas las dependencias y configurado ESLint; todavía no hay pantallas.

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

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Levanta Vite en modo desarrollo (próximo commit) |
| `npm run build` | Genera el build de producción (próximo commit) |
| `npm run preview` | Sirve el build localmente (próximo commit) |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `npm run lint:fix` | Ejecuta ESLint y corrige lo que puede corregir |

## Dependencias principales

- `react`, `react-dom`: biblioteca de interfaz.
- `vite`, `@vitejs/plugin-react` (dev): servidor de desarrollo y build.
- `eslint`, `@eslint/js`, `globals`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh` (dev): estandarización de código.

## Próximos pasos

1. Crear `index.html` y `src/main.jsx` con el arranque de React.
2. Armar el layout global: Header, Footer, menú y perfil.
3. Conectar el frontend con la API mock usando `VITE_API_URL`.
