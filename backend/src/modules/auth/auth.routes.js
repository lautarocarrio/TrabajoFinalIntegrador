import { Router } from 'express';
import { mockUsers, toPublicUser } from '../../mocks/users.mock.js';
import { created, fail, ok } from '../../utils/http.js';

const router = Router();

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();
const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildToken = (userId) => `mock-token-${userId}-${Date.now()}`;

router.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return fail(res, 'Email y contraseña son obligatorios', 400, [
      'Completá todos los campos requeridos.',
    ]);
  }

  const user = mockUsers.find((candidate) => candidate.email === normalizeEmail(email));

  if (!user || user.password !== password) {
    return fail(res, 'Credenciales inválidas', 401, [
      'El email o la contraseña son incorrectos.',
    ]);
  }

  return ok(
    res,
    { user: toPublicUser(user), token: buildToken(user.id) },
    'Ingreso simulado correctamente',
  );
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body ?? {};
  const errors = [];

  if (!name || String(name).trim().length < 2) errors.push('El nombre debe tener al menos 2 caracteres.');
  if (!isValidEmail(email)) errors.push('El email no tiene un formato válido.');
  if (!password || String(password).length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.');

  if (errors.length > 0) return fail(res, 'Datos de registro inválidos', 400, errors);

  if (mockUsers.some((candidate) => candidate.email === normalizeEmail(email))) {
    return fail(res, 'El email ya está registrado', 409, ['Probá con otro correo electrónico.']);
  }

  const newUser = {
    id: mockUsers.length + 1,
    name: String(name).trim(),
    email: normalizeEmail(email),
    password: String(password),
    role: 'user',
  };

  return created(
    res,
    { user: toPublicUser(newUser), token: buildToken(newUser.id) },
    'Registro simulado correctamente',
  );
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body ?? {};

  if (!isValidEmail(email)) {
    return fail(res, 'Email no válido', 400, ['Ingresá un correo electrónico válido.']);
  }

  // Por seguridad, la respuesta no revela si el correo existe o no.
  return ok(
    res,
    { email: normalizeEmail(email) },
    'Si el correo existe en el sistema, se envió un enlace de recuperación.',
  );
});

export default router;
