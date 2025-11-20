// frontend/src/pages/LoginPage.jsx (Implementación del Login)

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚨 Importar Axios
import { AuthContext } from '../context/AuthContext';

// Define la URL base de tu API de Express
const API_URL = 'http://localhost:5000/api/auth/login';

const LoginPage = () => {
    // 1. Obtener la función 'login' del contexto
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    // 2. Estado local para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 3. Estado local para manejo de UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // 4. Función de manejo de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        setError('');
        setIsLoading(true);

        try {
            // 🚨 Llamada al Backend con Axios
            const response = await axios.post(API_URL, {
                email,
                password,
            });

            // La respuesta exitosa contiene { token, user: { id, name, email, role } }
            const userData = response.data; 

            // 5. Llamar a la función de login del Contexto Global
            login(userData); 

            // 6. Redirigir al usuario al Dashboard
            navigate('/dashboard', { replace: true });

        } catch (err) {
            // Manejo de errores
            // El backend devuelve un 401 para credenciales inválidas
            const errorMessage = err.response && err.response.data.message 
                ? err.response.data.message
                : 'Error de conexión con el servidor.';
            
            setError(errorMessage);
            console.error('Login error:', err);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Iniciar Sesión</h2>
            
            {/* Mensaje de Error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Campo de Correo Electrónico */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Campo de Contraseña */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Botón de Enviar */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ 
                        padding: '10px 15px', 
                        // CORRECCIÓN FINAL DE SINTAXIS EN JSX:
                        backgroundColor: isLoading ? '#ccc' : '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {isLoading ? 'Iniciando...' : 'Entrar'}
                </button>
            </form>
            
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                ¿No eres socio? <a href="/register">Regístrate aquí</a>
            </p>
        </div>
    );
};

export default LoginPage;