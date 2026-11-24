import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo" aria-hidden="true">
            TF
          </span>
          <h1>Trabajo Final Integrador</h1>
          <p>Prototipo · acceso al sistema</p>
        </div>
        <Outlet />
      </div>
      <footer className="auth-footer">Prototipo sin base de datos · respuestas simuladas</footer>
    </main>
  );
}
