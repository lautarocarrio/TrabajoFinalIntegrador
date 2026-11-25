import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { estadosValidos } from '../mocks/membresias.mock.js';
import { membresiasService } from '../services/membresiasService.js';

const formularioVacio = {
  usuario_id: '',
  fecha_inicio: '',
  fecha_fin: '',
  estado: 'activa',
};

export default function MembresiaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esNuevo = !id;

  const [form, setForm] = useState(formularioVacio);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(!esNuevo);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let activo = true;

    membresiasService
      .getUsuarios()
      .then((response) => {
        if (activo && response.ok) setUsuarios(response.body.data);
      })
      .catch(() => {});

    if (esNuevo) {
      return () => {
        activo = false;
      };
    }

    membresiasService
      .getById(id)
      .then((response) => {
        if (!activo) return;
        if (!response.ok) {
          setError(response.body);
          setLoading(false);
          return;
        }

        const { usuario_id, fecha_inicio, fecha_fin, estado } = response.body.data;
        setForm({
          usuario_id: String(usuario_id),
          fecha_inicio,
          fecha_fin,
          estado,
        });
        setLoading(false);
      })
      .catch(() => {
        if (activo) {
          setError({ message: 'No se pudo cargar la membresía.' });
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [id, esNuevo]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((actual) => ({ ...actual, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const response = esNuevo
        ? await membresiasService.create(form)
        : await membresiasService.update(id, form);

      if (!response.ok) {
        setError(response.body);
        return;
      }

      setSuccess({ message: response.body.message });
      if (esNuevo) navigate(`/membresias/${response.body.data.id_membresia}`);
    } catch {
      setError({ message: 'No se pudo guardar la membresía.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar esta membresía?')) return;

    setError(null);
    setDeleting(true);

    try {
      const response = await membresiasService.remove(id);
      if (!response.ok) {
        setError(response.body);
        return;
      }
      navigate('/membresias');
    } catch {
      setError({ message: 'No se pudo eliminar la membresía.' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="loading">Cargando membresía…</p>;

  return (
    <section className="form-page">
      <header className="list-header">
        <div>
          <h2 className="form-title">{esNuevo ? 'Nueva membresía' : `Membresía #${id}`}</h2>
          <p className="form-subtitle">
            {esNuevo
              ? 'Completá los datos para dar de alta una membresía.'
              : 'Visualizá, editá o eliminá el registro.'}
          </p>
        </div>
        <div className="header-actions">
          <Link className="button button--small button--outline" to="/menu">
            Volver al menú
          </Link>
          <Link className="button button--small button--outline" to="/membresias">
            Volver al listado
          </Link>
        </div>
      </header>

      <Message type="error" payload={error} />
      <Message type="success" payload={success} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="usuario_id">
            Socio
          </label>
          <select
            className="form-input"
            id="usuario_id"
            name="usuario_id"
            value={form.usuario_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar socio</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nombre} {usuario.apellido} · {usuario.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="fecha_inicio">
              Fecha inicio
            </label>
            <input
              className="form-input"
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              value={form.fecha_inicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="fecha_fin">
              Fecha fin
            </label>
            <input
              className="form-input"
              id="fecha_fin"
              name="fecha_fin"
              type="date"
              value={form.fecha_fin}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="estado">
            Estado
          </label>
          <select
            className="form-input"
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            {estadosValidos.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Guardando…' : esNuevo ? 'Crear membresía' : 'Guardar cambios'}
          </button>
          {!esNuevo && (
            <button
              className="button button--danger"
              type="button"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? 'Eliminando…' : 'Eliminar'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
