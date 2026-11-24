/**
 * Capa de acceso a la API de autenticación.
 *
 * Por defecto usa mocks en el propio frontend (VITE_USE_MOCKS=true), así el
 * prototipo funciona sin backend. Cambiando VITE_USE_MOCKS=false se hace que se
 * consuma la API real sin modificar las pantallas.
 * La forma de la respuesta siempre es: { ok, status, body: { success, message, data, errors } }
 */

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initialAccount = {
  id: 1,
  name: 'Usuario Demo',
  email: 'demo@test.com',
  password: '123456',
  role: 'admin',
};

let mockAccounts = [initialAccount];

const toPublicUser = ({ id, name, email, role }) => ({ id, name, email, role });

const mockResult = (success, status, message, data = null, errors = []) => ({
  ok: success,
  status,
  body: { success, message, data, errors },
});

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();

const request = async (path, payload) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return { ok: response.ok, status: response.status, body: await response.json() };
};

const mockLogin = async ({ email, password }) => {
  await wait(400);

  const account = mockAccounts.find((item) => item.email === normalizeEmail(email));

  if (!account || account.password !== password) {
    return mockResult(false, 401, 'Credenciales inválidas', null, [
      'El email o la contraseña son incorrectos.',
    ]);
  }

  return mockResult(true, 200, 'Ingreso simulado correctamente', {
    user: toPublicUser(account),
    token: `mock-token-${account.id}`,
  });
};

const mockRegister = async ({ name, email, password, confirmPassword }) => {
  await wait(400);

  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('El nombre debe tener al menos 2 caracteres.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('El email no tiene un formato válido.');
  if (!password || String(password).length < 6) errors.push('La contraseña debe tener al menos 6 caracteres.');
  if (password !== confirmPassword) errors.push('Las contraseñas no coinciden.');

  if (errors.length > 0) return mockResult(false, 400, 'Datos de registro inválidos', null, errors);

  if (mockAccounts.some((item) => item.email === normalizeEmail(email))) {
    return mockResult(false, 409, 'El email ya está registrado', null, ['Probá con otro correo.']);
  }

  const account = {
    id: mockAccounts.length + 1,
    name: String(name).trim(),
    email: normalizeEmail(email),
    password: String(password),
    role: 'user',
  };
  mockAccounts = [...mockAccounts, account];

  return mockResult(true, 201, 'Registro simulado correctamente', {
    user: toPublicUser(account),
    token: `mock-token-${account.id}`,
  });
};

const mockRecoverPassword = async ({ email }) => {
  await wait(400);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return mockResult(false, 400, 'Email no válido', null, ['Ingresá un correo electrónico válido.']);
  }

  return mockResult(
    true,
    200,
    'Si el correo existe en el sistema, se envió un enlace de recuperación.',
    { email: normalizeEmail(email) },
  );
};

export const authService = {
  login: (payload) => (USE_MOCKS ? mockLogin(payload) : request('/auth/login', payload)),
  register: (payload) => (USE_MOCKS ? mockRegister(payload) : request('/auth/register', payload)),
  recoverPassword: (payload) =>
    USE_MOCKS ? mockRecoverPassword(payload) : request('/auth/forgot-password', payload),
};
