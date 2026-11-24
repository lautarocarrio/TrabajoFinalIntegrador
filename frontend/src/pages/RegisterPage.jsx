import { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { authService } from '../services/authService.js';

const emptyForm = { name: '', email: '', password: '', confirmPassword: '' };

export default function RegisterPage() {
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
      const response = await authService.register(form);

      if (!response.ok) {
        setError(response.body);
        return;
      }

      setSuccess({ message: response.body.message });
      setForm(emptyForm);
    } catch {
      setError({
        message: 'No se pudo completar el registro. Intentá nuevamente en unos segundos.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-title">Crear cuenta</h2>
      <p className="form-subtitle">Completá tus datos para registrar un usuario mock.</p>

      <Message type="error" payload={error} />
      <Message type="success" payload={success} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <input
            className="form-input"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

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
            placeholder="nombre@correo.com"
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
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Repetir contraseña
          </label>
          <input
            className="form-input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repetí la contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Registrando…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="form-footer">
        ¿Ya tenés cuenta? <Link to="/login">Volver a iniciar sesión</Link>
      </p>
    </>
  );
}
