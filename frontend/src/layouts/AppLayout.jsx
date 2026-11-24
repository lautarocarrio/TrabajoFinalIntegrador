import { Link, Outlet } from 'react-router-dom';
import { getCurrentUserId } from '../services/session.js';

export default function AppLayout() {
  const userId = getCurrentUserId();
  const profilePath = userId ? `/usuarios/${userId}` : '/login';

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="app-header__brand" to="/menu">
          <span className="auth-logo" aria-hidden="true">
            TF
          </span>
          <span>Trabajo Final Integrador</span>
        </Link>
        <Link className="app-header__link" to={profilePath}>
          Mi perfil
        </Link>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="auth-footer">Prototipo sin base de datos · respuestas simuladas</footer>
    </div>
  );
}
