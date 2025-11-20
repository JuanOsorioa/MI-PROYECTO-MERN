// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 🚨 Importar
import App from './App.jsx';
// Ya no usamos ningún archivo CSS, por eso los eliminamos.
// import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter permite que React Router funcione y escuche los cambios de URL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);