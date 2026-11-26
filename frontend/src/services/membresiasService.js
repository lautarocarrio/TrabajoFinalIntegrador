/**
 * Acceso a la API de MEMBRESIAS.
 * Con VITE_USE_MOCKS=true todo se resuelve en memoria (sin backend).
 * Con VITE_USE_MOCKS=false se consumen los endpoints Express.
 * Respuesta uniforme: { ok, status, body: { success, message, data, errors } }
 */

import { estadosValidos, membresiasIniciales, usuariosMock } from '../mocks/membresias.mock.js';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const envelope = (success, status, message, data = null, errors = []) => ({
  ok: success,
  status,
  body: { success, message, data, errors },
});

let filas = membresiasIniciales.map((fila) => ({ ...fila }));
let nextId = Math.max(...filas.map((fila) => fila.id_membresia)) + 1;

const conJoin = (fila) => ({
  ...fila,
  usuario: usuariosMock.find((item) => item.id_usuario === fila.usuario_id) ?? null,
});

const queryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return { ok: response.ok, status: response.status, body: await response.json() };
};

const validar = (payload = {}, parcial = false) => {
  const { usuario_id, fecha_inicio, fecha_fin, estado } = payload;
  const errores = [];

  if (!parcial && !usuario_id) errores.push('usuario_id es obligatorio.');
  if (!parcial && !fecha_inicio) errores.push('fecha_inicio es obligatoria.');
  if (!parcial && !fecha_fin) errores.push('fecha_fin es obligatoria.');
  if (!parcial && !estado) errores.push('estado es obligatorio.');

  if (usuario_id && !usuariosMock.some((item) => item.id_usuario === Number(usuario_id))) {
    errores.push('usuario_id no corresponde a un usuario existente.');
  }
  if (fecha_inicio && !/^\d{4}-\d{2}-\d{2}$/.test(String(fecha_inicio))) {
    errores.push('fecha_inicio debe tener formato YYYY-MM-DD.');
  }
  if (fecha_fin && !/^\d{4}-\d{2}-\d{2}$/.test(String(fecha_fin))) {
    errores.push('fecha_fin debe tener formato YYYY-MM-DD.');
  }
  if (fecha_inicio && fecha_fin && fecha_fin < fecha_inicio) {
    errores.push('fecha_fin no puede ser anterior a fecha_inicio.');
  }
  if (estado && !estadosValidos.includes(estado)) {
    errores.push(`estado debe ser uno de: ${estadosValidos.join(', ')}.`);
  }

  return errores;
};

const normalizar = (payload = {}) => ({
  ...(payload.usuario_id !== undefined && { usuario_id: Number(payload.usuario_id) }),
  ...(payload.fecha_inicio !== undefined && { fecha_inicio: String(payload.fecha_inicio) }),
  ...(payload.fecha_fin !== undefined && { fecha_fin: String(payload.fecha_fin) }),
  ...(payload.estado !== undefined && { estado: String(payload.estado) }),
});

const mockList = async (params = {}) => {
  await wait(250);

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const sortBy = params.sortBy || 'id_membresia';
  const order = params.order || 'asc';

  let items = filas.map(conJoin);

  if (params.estado) items = items.filter((item) => item.estado === params.estado);
  if (params.usuario_id) {
    items = items.filter((item) => item.usuario_id === Number(params.usuario_id));
  }
  if (params.fechaDesde) items = items.filter((item) => item.fecha_inicio >= params.fechaDesde);
  if (params.fechaHasta) items = items.filter((item) => item.fecha_inicio <= params.fechaHasta);

  items.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;
    const resultado = a[sortBy] < b[sortBy] ? -1 : 1;
    return order === 'asc' ? resultado : -resultado;
  });

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pagina = Math.min(page, totalPages);
  const inicio = (pagina - 1) * limit;

  return envelope(true, 200, 'Listado de membresías', {
    items: items.slice(inicio, inicio + limit),
    page: pagina,
    limit,
    total,
    totalPages,
  });
};

const mockGetById = async (id) => {
  await wait(200);
  const fila = filas.find((item) => item.id_membresia === Number(id));
  return fila
    ? envelope(true, 200, 'Membresía encontrada', conJoin(fila))
    : envelope(false, 404, 'Membresía no encontrada');
};

const mockCreate = async (payload) => {
  await wait(300);
  const datos = normalizar(payload);
  const errores = validar(datos, false);
  if (errores.length > 0) return envelope(false, 400, 'Datos de membresía inválidos', null, errores);

  const fila = { id_membresia: nextId++, ...datos };
  filas = [...filas, fila];
  return envelope(true, 201, 'Membresía creada correctamente', conJoin(fila));
};

const mockUpdate = async (id, payload) => {
  await wait(300);
  const indice = filas.findIndex((item) => item.id_membresia === Number(id));
  if (indice === -1) return envelope(false, 404, 'Membresía no encontrada');

  const datos = normalizar(payload);
  const errores = validar(datos, true);
  if (errores.length > 0) return envelope(false, 400, 'Datos de membresía inválidos', null, errores);

  const fila = { ...filas[indice], ...datos };
  filas = filas.map((item, i) => (i === indice ? fila : item));
  return envelope(true, 200, 'Membresía actualizada correctamente', conJoin(fila));
};

const mockRemove = async (id) => {
  await wait(250);
  const existe = filas.some((item) => item.id_membresia === Number(id));
  if (!existe) return envelope(false, 404, 'Membresía no encontrada');

  filas = filas.filter((item) => item.id_membresia !== Number(id));
  return envelope(true, 200, 'Membresía eliminada correctamente', {
    id_membresia: Number(id),
  });
};

export const membresiasService = {
  list: (params) => (USE_MOCKS ? mockList(params) : request(`/membresias${queryString(params)}`)),
  getById: (id) => (USE_MOCKS ? mockGetById(id) : request(`/membresias/${id}`)),
  create: (payload) =>
    USE_MOCKS
      ? mockCreate(payload)
      : request('/membresias', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    USE_MOCKS
      ? mockUpdate(id, payload)
      : request(`/membresias/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => (USE_MOCKS ? mockRemove(id) : request(`/membresias/${id}`, { method: 'DELETE' })),
  getUsuarios: () =>
    USE_MOCKS
      ? Promise.resolve(envelope(true, 200, 'Usuarios disponibles', usuariosMock))
      : request('/membresias/usuarios'),
};
