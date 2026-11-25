/**
 * Resumen de USUARIOS usado para el join simulado con MEMBRESIAS.
 * Reemplazar por una consulta real a la tabla USUARIOS cuando corresponda.
 */
export const mockUsuarios = [
  { id_usuario: 1, nombre: 'Usuario', apellido: 'Demo', email: 'demo@test.com' },
  { id_usuario: 2, nombre: 'Sofía', apellido: 'Gómez', email: 'sofia@test.com' },
  { id_usuario: 3, nombre: 'Martín', apellido: 'López', email: 'martin@test.com' },
  { id_usuario: 4, nombre: 'Camila', apellido: 'Ruiz', email: 'camila@test.com' },
  { id_usuario: 5, nombre: 'Facundo', apellido: 'Torres', email: 'facundo@test.com' },
  { id_usuario: 6, nombre: 'Lucía', apellido: 'Ferreyra', email: 'lucia@test.com' },
];

export const getUsuarioResumen = (id_usuario) => {
  const usuario = mockUsuarios.find((item) => item.id_usuario === Number(id_usuario));
  return usuario ? { ...usuario } : null;
};

export const existeUsuario = (id_usuario) => Boolean(getUsuarioResumen(id_usuario));
