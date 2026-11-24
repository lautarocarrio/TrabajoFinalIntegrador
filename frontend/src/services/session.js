/**
 * Sesión simulada del prototipo. Se guarda en localStorage para que el id del
 * usuario esté disponible entre pantallas y recargas.
 * Cuando haya autenticación real, reemplazar por el token / usuario del backend.
 */

const STORAGE_KEY = 'tf.auth.session';

export const saveSession = ({ user, token }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
};

export const getSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUserId = () => getSession()?.user?.id ?? null;
