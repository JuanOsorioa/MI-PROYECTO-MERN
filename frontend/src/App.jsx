// frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom'; // 🚨 Importar componentes de rutas

// Importar los componentes de páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Definiremos un DashboardPage más adelante, por ahora la omitimos.
// import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <div className="App">
      {/* Aquí podemos añadir un <Navbar /> o un <Footer /> que se mostrarán en todas las páginas */}
      
      {/* Routes define el área donde se renderizarán los componentes de ruta */}
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ejemplo de una ruta que usaremos más adelante (Ruta Protegida) */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

        {/* Ruta comodín para manejar URL's no encontradas (404) */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </div>
  );
};

export default App;