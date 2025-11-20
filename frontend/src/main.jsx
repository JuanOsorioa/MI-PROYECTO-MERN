// frontend/src/main.jsx (Actualizado)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// 🚨 Importar el proveedor de contexto
import { AuthContextProvider } from './context/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        {/* 🚨 Envolver toda la aplicación para que todos los componentes tengan acceso al contexto */}
        <AuthContextProvider> 
            <App />
        </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);