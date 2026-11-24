import { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { authService } from '../services/authService.js';

const emptyForm = { email: '', password: '' };

export default function LoginPage() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await authService.login(form);

      if (!response.ok) {
        setError(response.body);
        return;
      }

      setSuccess({
        message: response.body.message,
        user: response.body.data.user,
      });
    } catch {
      setError({
        message: 'No se pudo conectar con la API. Verificá que el backend esté corriendo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-title">Iniciar sesión</h2>
      <p className="form-subtitle">Ingresá con tu correo y contraseña.</p>

      <Message type="error" payload={error} />
      {success && (
        <Message
          type="success"
          payload={{ message: `${success.message} Bienvenido/a, ${success.user.name}.` }}
        />
      )}

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
            placeholder="demo@test.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Tu contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Link className="form-link" to="/recuperar-contrasena">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="form-footer">
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>

      <div className="hint">
        <strong>Usuario de prueba:</strong> demo@test.com / 123456
      </div>
    </>
  );
}
