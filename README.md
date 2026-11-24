# Trabajo Final Integrador

Prototipo navegable (mock) para la cursada. El frontend consume una API simulada, sin
movimientos reales en base de datos, de modo que los mocks puedan reemplazarse por
consultas reales sin cambiar el frontend.

## Estructura del repositorio

```
.
├── backend/     # API REST con Express
└── frontend/    # SPA con React + Vite
```

Cada carpeta es un proyecto Node independiente, con su propio `package.json`,
`package-lock.json`, configuración de ESLint, `sample.env` y `README.md`.

## Requisitos

- Node.js `^20.19.0 || >=22.12.0` (se validó con Node 24.15)
- npm >= 10

## Puesta en marcha

Consultar los README de cada carpeta:

- [`backend/README.md`](backend/README.md)
- [`frontend/README.md`](frontend/README.md)

## Estrategia de ramas

| Rama | Uso |
| --- | --- |
| `master` | Producción |
| `develop` | Desarrollo e integración |
| `rama-por-alumno` | Trabajo individual de cada integrante |

Los cambios se integran primero en `develop` y luego se promueven a `master`.

## Estado actual

Etapa de configuración inicial: dependencias y linter. Todavía no hay servidor ni
pantallas implementadas; esos serán los próximos commits.
