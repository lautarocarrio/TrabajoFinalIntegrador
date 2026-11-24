import { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { authService } from '../services/authService.js';

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await authService.recoverPassword({ email });

      if (!response.ok) {
        setError(response.body);
        return;
      }

      setSuccess(response.body);
      setEmail('');
    } catch {
      setError({
        message: 'No se pudo enviar la solicitud. Intentá nuevamente en unos segundos.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-title">Recuperar contraseña</h2>
      <p className="form-subtitle">
        Ingresá tu correo y te enviaremos un enlace para restablecerla.
      </p>

      <Message type="error" payload={error} />
      <Message type="success" payload={success} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Enviando…' : 'Enviar enlace'}
        </button>
      </form>

      <Link className="back-link" to="/login">
        ← Volver al inicio de sesión
      </Link>
    </>
  );
}
