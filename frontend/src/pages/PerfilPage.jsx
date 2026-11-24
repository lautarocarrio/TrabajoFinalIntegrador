import { useParams } from 'react-router-dom';
import PagePlaceholder from '../components/PagePlaceholder.jsx';

// TODO: implementar la pantalla de Perfil del usuario con los datos del backend.
export default function PerfilPage() {
  const { id } = useParams();

  return <PagePlaceholder title={`Mi perfil · Usuario #${id ?? '—'}`} />;
}
