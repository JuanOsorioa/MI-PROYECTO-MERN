// frontend/src/components/PrivateRoute.jsx

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Este componente requiere que se esté autenticado para renderizar el contenido.
const PrivateRoute = () => {
    // 🚨 Usar el contexto para acceder al estado global
    const { isAuthenticated } = useContext(AuthContext);

    // Outlet renderiza el componente hijo de la ruta
    // Navigate redirige a otra ruta
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;