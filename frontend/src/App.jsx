// frontend/src/App.jsx (Actualizado con PrivateRoute)

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // 🚨 Nuevo
import PrivateRoute from './components/PrivateRoute'; // 🚨 Nuevo

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🚨 Ruta Protegida: Usamos PrivateRoute como elemento padre */}
        <Route element={<PrivateRoute />}>
            {/* Si el usuario está autenticado, se renderiza el Outlet (DashboardPage) */}
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Aquí irán otras rutas privadas: /transactions, /admin, etc. */}
        </Route>

        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </div>
  );
};

export default App;