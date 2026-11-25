import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.jsx';
import { estadosValidos } from '../mocks/membresias.mock.js';
import { membresiasService } from '../services/membresiasService.js';

const filtrosIniciales = {
  page: 1,
  limit: 10,
  estado: '',
  usuario_id: '',
  fechaDesde: '',
  fechaHasta: '',
  sortBy: 'id_membresia',
  order: 'asc',
};

const listaVacia = { items: [], page: 1, limit: 10, total: 0, totalPages: 1 };

export default function MembresiaPage() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [lista, setLista] = useState(listaVacia);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { page, limit, estado, usuario_id, fechaDesde, fechaHasta, sortBy, order } = filtros;

  useEffect(() => {
    let activo = true;

    membresiasService
      .getUsuarios()
      .then((response) => {
        if (activo && response.ok) setUsuarios(response.body.data);
      })
      .catch(() => {});

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    let activo = true;

    membresiasService
      .list({ page, limit, estado, usuario_id, fechaDesde, fechaHasta, sortBy, order })
      .then((response) => {
        if (!activo) return;
        if (!response.ok) {
          setError(response.body);
          return;
        }
        setLista(response.body.data);
      })
      .catch(() => {
        if (activo) setError({ message: 'No se pudo obtener el listado de membresías.' });
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [page, limit, estado, usuario_id, fechaDesde, fechaHasta, sortBy, order]);

  const handleChange = ({ target: { name, value } }) => {
    setFiltros((actuales) => ({ ...actuales, [name]: value, page: 1 }));
    setLoading(true);
    setError(null);
  };

  const irAPagina = (paginaNueva) => {
    setFiltros((actuales) => ({ ...actuales, page: paginaNueva }));
    setLoading(true);
    setError(null);
  };

  return (
    <section className="list-page">
      <header className="list-header">
        <div>
          <h2 className="form-title">Membresías</h2>
          <p className="form-subtitle">Listado simulado con paginado y filtros.</p>
        </div>
        <div className="header-actions">
          <Link className="button button--small button--outline" to="/menu">
            Volver al menú
          </Link>
          <Link className="button button--small" to="/membresias/nuevo">
            Nueva membresía
          </Link>
        </div>
      </header>

      <div className="filter-bar">
        <label className="form-group">
          <span className="form-label">Estado</span>
          <select className="form-input" name="estado" value={filtros.estado} onChange={handleChange}>
            <option value="">Todos</option>
            {estadosValidos.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </label>

        <label className="form-group">
          <span className="form-label">Socio</span>
          <select
            className="form-input"
            name="usuario_id"
            value={filtros.usuario_id}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nombre} {usuario.apellido}
              </option>
            ))}
          </select>
        </label>

        <label className="form-group">
          <span className="form-label">Desde</span>
          <input
            className="form-input"
            type="date"
            name="fechaDesde"
            value={filtros.fechaDesde}
            onChange={handleChange}
          />
        </label>

        <label className="form-group">
          <span className="form-label">Hasta</span>
          <input
            className="form-input"
            type="date"
            name="fechaHasta"
            value={filtros.fechaHasta}
            onChange={handleChange}
          />
        </label>

        <label className="form-group">
          <span className="form-label">Ordenar por</span>
          <select className="form-input" name="sortBy" value={filtros.sortBy} onChange={handleChange}>
            <option value="id_membresia">ID</option>
            <option value="usuario_id">Socio</option>
            <option value="fecha_inicio">Fecha inicio</option>
            <option value="fecha_fin">Fecha fin</option>
            <option value="estado">Estado</option>
          </select>
        </label>

        <label className="form-group">
          <span className="form-label">Dirección</span>
          <select className="form-input" name="order" value={filtros.order} onChange={handleChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>

        <label className="form-group">
          <span className="form-label">Por página</span>
          <select className="form-input" name="limit" value={filtros.limit} onChange={handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      <Message type="error" payload={error} />

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Socio</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.items.map((item) => (
              <tr
                key={item.id_membresia}
                className="data-row"
                onClick={() => navigate(`/membresias/${item.id_membresia}`)}
              >
                <td>{item.id_membresia}</td>
                <td>
                  {item.usuario
                    ? `${item.usuario.nombre} ${item.usuario.apellido}`
                    : `Socio #${item.usuario_id}`}
                </td>
                <td>{item.fecha_inicio}</td>
                <td>{item.fecha_fin}</td>
                <td>
                  <span className={`badge badge--${item.estado}`}>{item.estado}</span>
                </td>
                <td>
                  <Link
                    to={`/membresias/${item.id_membresia}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
            {lista.items.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="table-empty">
                  No hay membresías para los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="pagination">
        <span>
          Página {lista.page} de {lista.totalPages} · {lista.total} registros
        </span>
        <div className="pagination__actions">
          <button
            className="button button--small button--outline"
            type="button"
            disabled={lista.page <= 1 || loading}
            onClick={() => irAPagina(lista.page - 1)}
          >
            Anterior
          </button>
          <button
            className="button button--small button--outline"
            type="button"
            disabled={lista.page >= lista.totalPages || loading}
            onClick={() => irAPagina(lista.page + 1)}
          >
            Siguiente
          </button>
        </div>
      </footer>

      {loading && <p className="loading">Cargando membresías…</p>}
    </section>
  );
}
