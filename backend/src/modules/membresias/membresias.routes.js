import { Router } from 'express';
import {
  ESTADOS_VALIDOS,
  actualizarMembresia,
  crearMembresia,
  eliminarMembresia,
  getMembresiaById,
  getMembresias,
  validarMembresia,
} from '../../mocks/membresias.mock.js';
import { mockUsuarios } from '../../mocks/usuarios.mock.js';
import { created, fail, notFound, ok } from '../../utils/http.js';

const router = Router();

const CAMPOS_ORDEN = ['id_membresia', 'usuario_id', 'fecha_inicio', 'fecha_fin', 'estado'];

const enteroValido = (valor, defecto, minimo, maximo) => {
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= minimo && numero <= maximo ? numero : defecto;
};

const payloadValido = (body = {}) => ({
  ...(body.usuario_id !== undefined && { usuario_id: Number(body.usuario_id) }),
  ...(body.fecha_inicio !== undefined && { fecha_inicio: String(body.fecha_inicio) }),
  ...(body.fecha_fin !== undefined && { fecha_fin: String(body.fecha_fin) }),
  ...(body.estado !== undefined && { estado: String(body.estado).trim().toLowerCase() }),
});

// Opciones para el formulario (join simulado con USUARIOS).
router.get('/usuarios', (_req, res) => ok(res, mockUsuarios, 'Usuarios disponibles'));

router.get('/', (req, res) => {
  const page = enteroValido(req.query.page, 1, 1, Number.MAX_SAFE_INTEGER);
  const limit = enteroValido(req.query.limit, 10, 1, 50);
  const sortBy = CAMPOS_ORDEN.includes(req.query.sortBy) ? req.query.sortBy : 'id_membresia';
  const order = String(req.query.order ?? 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
  const estado = req.query.estado ? String(req.query.estado).toLowerCase() : null;
  const usuarioId = req.query.usuario_id ? Number(req.query.usuario_id) : null;
  const fechaDesde = req.query.fechaDesde ? String(req.query.fechaDesde) : null;
  const fechaHasta = req.query.fechaHasta ? String(req.query.fechaHasta) : null;

  let items = getMembresias();

  if (estado) items = items.filter((item) => item.estado === estado);
  if (usuarioId !== null) items = items.filter((item) => item.usuario_id === usuarioId);
  if (fechaDesde) items = items.filter((item) => item.fecha_inicio >= fechaDesde);
  if (fechaHasta) items = items.filter((item) => item.fecha_inicio <= fechaHasta);

  items.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;
    const resultado = a[sortBy] < b[sortBy] ? -1 : 1;
    return order === 'asc' ? resultado : -resultado;
  });

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pagina = Math.min(page, totalPages);
  const inicio = (pagina - 1) * limit;

  return ok(
    res,
    {
      items: items.slice(inicio, inicio + limit),
      page: pagina,
      limit,
      total,
      totalPages,
    },
    'Listado de membresías',
  );
});

router.get('/:id', (req, res) => {
  const membresia = getMembresiaById(req.params.id);
  if (!membresia) return notFound(res, 'Membresía no encontrada');

  return ok(res, membresia, 'Membresía encontrada');
});

router.post('/', (req, res) => {
  const payload = payloadValido(req.body);
  const errores = validarMembresia(payload, false);

  if (errores.length > 0) return fail(res, 'Datos de membresía inválidos', 400, errores);

  return created(res, crearMembresia(payload), 'Membresía creada correctamente');
});

router.put('/:id', (req, res) => {
  if (!getMembresiaById(req.params.id)) return notFound(res, 'Membresía no encontrada');

  const payload = payloadValido(req.body);
  const errores = validarMembresia(payload, true);

  if (errores.length > 0) return fail(res, 'Datos de membresía inválidos', 400, errores);

  return ok(res, actualizarMembresia(req.params.id, payload), 'Membresía actualizada correctamente');
});

router.delete('/:id', (req, res) => {
  if (!eliminarMembresia(req.params.id)) return notFound(res, 'Membresía no encontrada');

  return ok(res, { id_membresia: Number(req.params.id) }, 'Membresía eliminada correctamente');
});

export { CAMPOS_ORDEN, ESTADOS_VALIDOS };
export default router;
