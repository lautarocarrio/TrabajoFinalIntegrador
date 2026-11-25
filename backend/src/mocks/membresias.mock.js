import { existeUsuario, getUsuarioResumen } from './usuarios.mock.js';

/**
 * MOCK en memoria de MEMBRESIAS.
 * Los campos guardados respetan exactamente el DER del README:
 * id_membresia, usuario_id, fecha_inicio, fecha_fin, estado.
 * El objeto `usuario` se agrega solo en la respuesta (join simulado).
 */

const ESTADOS_VALIDOS = ['activa', 'vencida', 'pendiente'];

const filas = [
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

let nextId = Math.max(...filas.map((fila) => fila.id_membresia)) + 1;

const conJoin = (fila) => ({
  ...fila,
  usuario: getUsuarioResumen(fila.usuario_id),
});

export const getMembresias = () => filas.map(conJoin);

export const getMembresiaById = (id) => {
  const fila = filas.find((item) => item.id_membresia === Number(id));
  return fila ? conJoin(fila) : null;
};

export const crearMembresia = (payload) => {
  const fila = { id_membresia: nextId++, ...payload };
  filas.push(fila);
  return conJoin(fila);
};

export const actualizarMembresia = (id, payload) => {
  const fila = filas.find((item) => item.id_membresia === Number(id));
  if (!fila) return null;

  Object.assign(fila, payload);
  return conJoin(fila);
};

export const eliminarMembresia = (id) => {
  const indice = filas.findIndex((item) => item.id_membresia === Number(id));
  if (indice === -1) return false;

  filas.splice(indice, 1);
  return true;
};

export const validarMembresia = (payload = {}, parcial = false) => {
  const { usuario_id, fecha_inicio, fecha_fin, estado } = payload;
  const errores = [];

  const obligatorio = !parcial;
  if (obligatorio && (usuario_id === undefined || usuario_id === null)) {
    errores.push('usuario_id es obligatorio.');
  }
  if (obligatorio && !fecha_inicio) errores.push('fecha_inicio es obligatoria.');
  if (obligatorio && !fecha_fin) errores.push('fecha_fin es obligatoria.');
  if (obligatorio && !estado) errores.push('estado es obligatorio.');

  if (usuario_id !== undefined && usuario_id !== null && !existeUsuario(usuario_id)) {
    errores.push('usuario_id no corresponde a un usuario existente.');
  }
  if (fecha_inicio !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(String(fecha_inicio))) {
    errores.push('fecha_inicio debe tener formato YYYY-MM-DD.');
  }
  if (fecha_fin !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(String(fecha_fin))) {
    errores.push('fecha_fin debe tener formato YYYY-MM-DD.');
  }
  if (fecha_inicio && fecha_fin && fecha_fin < fecha_inicio) {
    errores.push('fecha_fin no puede ser anterior a fecha_inicio.');
  }
  if (estado !== undefined && !ESTADOS_VALIDOS.includes(estado)) {
    errores.push(`estado debe ser uno de: ${ESTADOS_VALIDOS.join(', ')}.`);
  }

  return errores;
};

export { ESTADOS_VALIDOS };
