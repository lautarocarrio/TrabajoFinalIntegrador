import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ClasesPage from './pages/ClasesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MembresiaPage from './pages/MembresiaPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import PerfilPage from './pages/PerfilPage.jsx';
import RecoverPasswordPage from './pages/RecoverPasswordPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { getCurrentUserId } from './services/session.js';

function ProfileRedirect() {
  const userId = getCurrentUserId();
  return <Navigate to={userId ? `/usuarios/${userId}` : '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar-contrasena" element={<RecoverPasswordPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/clases" element={<ClasesPage />} />
        <Route path="/membresia" element={<MembresiaPage />} />
        <Route path="/perfil" element={<ProfileRedirect />} />
        <Route path="/usuarios/:id" element={<PerfilPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
