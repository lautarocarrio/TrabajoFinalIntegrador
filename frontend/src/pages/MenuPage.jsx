import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../services/session.js';

export default function MenuPage() {
  const userId = getCurrentUserId();
  const profilePath = userId ? `/usuarios/${userId}` : '/login';

  const options = [
    {
      label: 'Clases',
      to: '/clases',
      icon: '▦',
      description: 'Gestión de clases',
    },
    {
      label: 'Membresía',
      to: '/membresia',
      icon: '◆',
      description: 'Planes y socios',
    },
    {
      label: 'Mi perfil',
      to: profilePath,
      icon: '◉',
      description: userId ? `Usuario #${userId}` : 'Iniciá sesión',
    },
  ];

  return (
    <section className="menu-page">
      <header className="menu-header">
        <h2 className="form-title">Menú principal</h2>
        <p className="form-subtitle">Elegí a dónde querés ir.</p>
      </header>

      <nav className="menu-grid" aria-label="Menú principal">
        {options.map(({ label, to, icon, description }) => (
          <Link className="menu-card" to={to} key={to}>
            <span className="menu-card__icon" aria-hidden="true">
              {icon}
            </span>
            <span className="menu-card__label">{label}</span>
            <span className="menu-card__description">{description}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
