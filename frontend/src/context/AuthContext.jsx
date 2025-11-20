// frontend/src/context/AuthContext.jsx

import { createContext, useState, useEffect } from 'react';
// Usaremos 'jwt-decode' para leer la información del token JWT.
import { jwtDecode } from 'jwt-decode'; 

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear el Proveedor de Contexto (AuthContextProvider)
// Este componente envolverá a toda nuestra aplicación en App.jsx
export const AuthContextProvider = ({ children }) => {
    // 🚨 Estado: user almacena el objeto del socio logueado (ej: {id, name, email, role})
    const [user, setUser] = useState(null); 
    // 🚨 Estado: Indica si el contexto está listo (importante para la carga inicial)
    const [isLoading, setIsLoading] = useState(true); 

    // Función que lee el token del localStorage y establece el estado 'user'
    const initializeUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decodificar el token para obtener los datos del socio
                const decodedUser = jwtDecode(token);

                // Aquí deberíamos validar si el token ha expirado. 
                // Por simplicidad, solo verificaremos que el token existe.
                if (decodedUser) {
                    // Si el token es válido y no expirado (simplificado), establecemos el usuario
                    setUser(decodedUser);
                } else {
                    // Si el token es inválido o expiró, lo borramos
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error("Error al decodificar token:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setIsLoading(false); // La carga inicial ha terminado
    };

    // useEffect se ejecuta solo una vez al montar el componente
    useEffect(() => {
        initializeUser();
    }, []); 

    // Función para iniciar sesión (se llama desde el componente Login)
    const login = (userData) => {
        localStorage.setItem('token', userData.token); // Guardar el token
        setUser(userData); // Guardar los datos del socio
    };

    // Función para cerrar sesión (se llama desde el Navbar o Dashboard)
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Redirigir al inicio o login (lo haremos en el componente)
    };

    // El valor que se comparte con toda la aplicación
    const contextValue = {
        user,
        isAuthenticated: !!user, // Booleano: ¿Hay un usuario logueado?
        isLoading,
        login,
        logout,
    };

    // Si aún está cargando, podemos mostrar un spinner o null
    if (isLoading) {
        return <div>Cargando aplicación...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};