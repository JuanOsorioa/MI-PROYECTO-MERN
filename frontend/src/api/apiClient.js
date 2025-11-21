// frontend/src/api/apiClient.js

import axios from 'axios';

// Obtener la URL base desde las variables de entorno de Vite
const baseURL = import.meta.env.VITE_API_URL;

// Crear una instancia de Axios con la configuración base
const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Interceptor de Solicitudes (Añadir JWT) ---
// Esta función se ejecuta antes de que se envíe CUALQUIER petición a la API
apiClient.interceptors.request.use(
    (config) => {
        // Obtener el token del localStorage (donde lo guardaremos al hacer login)
        const token = localStorage.getItem('token'); 
        
        // Si existe un token, lo adjuntamos al encabezado Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Manejar cualquier error de la petición (antes de ser enviada)
        return Promise.reject(error);
    }
);

export default apiClient;