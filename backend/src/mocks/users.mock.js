/**
 * Usuarios simulados. Reemplazar por consultas a la base de datos cuando
 * pase a haber una. La estructura de respuesta NO debe cambiar.
 */
export const mockUsers = [
  {
    id: 1,
    name: 'Usuario Demo',
    email: 'demo@test.com',
    password: '123456',
    role: 'admin',
  },
];

export const toPublicUser = ({ id, name, email, role }) => ({ id, name, email, role });
