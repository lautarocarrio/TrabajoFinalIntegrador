import { Link } from 'react-router-dom';

/**
 * Placeholder temporal para las pantallas que todavía no implementa cada alumno.
 * Reemplazar el contenido de esta página por la interfaz definitiva.
 */
export default function PagePlaceholder({ title }) {
  return (
    <section className="placeholder-page">
      <h2>{title}</h2>
      <p className="form-subtitle">Pantalla en construcción.</p>
      <Link className="back-link" to="/menu">
        ← Volver al menú
      </Link>
    </section>
  );
}
