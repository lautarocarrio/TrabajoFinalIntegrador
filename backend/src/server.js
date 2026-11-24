import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import authRoutes from './modules/auth/auth.routes.js';
import { fail, notFound, ok } from './utils/http.js';

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get('/api/v1/health', (_req, res) => ok(res, { status: 'ok' }, 'API mock activa'));
app.use('/api/v1/auth', authRoutes);

app.use((_req, res) => notFound(res, 'Ruta no encontrada'));

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return fail(res, 'JSON inválido', 400, ['Revisá el cuerpo de la petición.']);
  }

  console.error(err);
  return fail(res, 'Error interno del servidor', 500);
});

app.listen(env.port, () => {
  console.log(`Backend mock corriendo en http://localhost:${env.port}`);
});
