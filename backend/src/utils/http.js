/**
 * Unifica el formato de todas las respuestas HTTP de la API.
 * Formato: { success, message, data, errors }
 */
export const ok = (res, data = null, message = 'OK', status = 200) =>
  res.status(status).json({ success: true, message, data, errors: [] });

export const created = (res, data = null, message = 'Recurso creado correctamente') =>
  ok(res, data, message, 201);

export const fail = (res, message = 'Error', status = 400, errors = []) =>
  res.status(status).json({ success: false, message, data: null, errors });

export const notFound = (res, message = 'Recurso no encontrado') => fail(res, message, 404);
