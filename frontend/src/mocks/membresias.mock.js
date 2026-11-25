/**
 * Espejo local del mock del backend (backend/src/mocks/membresias.mock.js).
 * Se usa solo cuando VITE_USE_MOCKS=true. Mantener ambos sincronizados.
 * Campos según el DER: id_membresia, usuario_id, fecha_inicio, fecha_fin, estado.
 */

export const usuariosMock = [
  { id_usuario: 1, nombre: 'Usuario', apellido: 'Demo', email: 'demo@test.com' },
  { id_usuario: 2, nombre: 'Sofía', apellido: 'Gómez', email: 'sofia@test.com' },
  { id_usuario: 3, nombre: 'Martín', apellido: 'López', email: 'martin@test.com' },
  { id_usuario: 4, nombre: 'Camila', apellido: 'Ruiz', email: 'camila@test.com' },
  { id_usuario: 5, nombre: 'Facundo', apellido: 'Torres', email: 'facundo@test.com' },
  { id_usuario: 6, nombre: 'Lucía', apellido: 'Ferreyra', email: 'lucia@test.com' },
];

export const membresiasIniciales = [
  { id_membresia: 1, usuario_id: 1, fecha_inicio: '2026-01-01', fecha_fin: '2026-12-31', estado: 'activa' },
  { id_membresia: 2, usuario_id: 2, fecha_inicio: '2026-02-15', fecha_fin: '2026-11-30', estado: 'vencida' },
  { id_membresia: 3, usuario_id: 3, fecha_inicio: '2026-03-01', fecha_fin: '2027-02-28', estado: 'activa' },
  { id_membresia: 4, usuario_id: 4, fecha_inicio: '2026-04-10', fecha_fin: '2026-10-10', estado: 'vencida' },
  { id_membresia: 5, usuario_id: 5, fecha_inicio: '2026-05-05', fecha_fin: '2026-12-05', estado: 'pendiente' },
  { id_membresia: 6, usuario_id: 6, fecha_inicio: '2026-06-01', fecha_fin: '2027-05-31', estado: 'activa' },
  { id_membresia: 7, usuario_id: 1, fecha_inicio: '2025-07-01', fecha_fin: '2025-12-31', estado: 'vencida' },
  { id_membresia: 8, usuario_id: 2, fecha_inicio: '2026-07-15', fecha_fin: '2026-12-15', estado: 'activa' },
  { id_membresia: 9, usuario_id: 3, fecha_inicio: '2026-08-01', fecha_fin: '2026-09-01', estado: 'vencida' },
  { id_membresia: 10, usuario_id: 4, fecha_inicio: '2026-09-20', fecha_fin: '2027-09-19', estado: 'activa' },
  { id_membresia: 11, usuario_id: 5, fecha_inicio: '2026-10-01', fecha_fin: '2026-11-01', estado: 'pendiente' },
  { id_membresia: 12, usuario_id: 6, fecha_inicio: '2026-11-01', fecha_fin: '2027-10-31', estado: 'activa' },
];

export const estadosValidos = ['activa', 'vencida', 'pendiente'];
