// frontend/src/pages/DashboardPage.jsx

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>📊 Dashboard del Fondo UCC</h2>
      {isAuthenticated && <p>Bienvenido, <strong>{user.name}</strong> ({user.role}).</p>}
      <button onClick={logout}>Cerrar Sesión</button>
      <p>Aquí verás tu balance personal y podrás realizar transacciones.</p>
    </div>
  );
};

export default DashboardPage;