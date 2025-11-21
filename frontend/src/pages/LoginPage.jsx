// frontend/src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css';

const API_URL = 'http://localhost:5000/api/auth/login';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, { email, password });
            const userData = response.data;
            login(userData);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            const errorMessage = err.response && err.response.data.message
                ? err.response.data.message
                : 'Error de conexión con el servidor.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // SVG Icons
    const UserIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );

    const LockIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    );

    const MailIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    );

    const CameraIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
            <path d="M20 7h-2.586l-1.707-1.707A1 1 0 0015 5h-4a1 1 0 00-.707.293L8.586 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z"/>
        </svg>
    );

    const EyeIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    );

    const EyeOffIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 10-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
    );

    const AlertIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
    );

    const ArrowRightIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>
    );

    const SparklesIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    );

    return (
        <div className="login-page">
            {/* Elementos decorativos animados */}
            <div className="decorative-circle circle-1"></div>
            <div className="decorative-circle circle-2"></div>
            <div className="decorative-circle circle-3"></div>

            <div className="login-container">
                {/* Panel Izquierdo - Branding */}
                <div className="branding-panel">
                    {/* Logo y título */}
                    <div className="branding-header">
                        <div className="logo-container">
                            <div className="logo-icon">
                                <CameraIcon />
                            </div>
                            <div className="logo-text">
                                <h1>Arte & Memoria</h1>
                                <p>Capturando momentos únicos</p>
                            </div>
                        </div>
                    </div>

                    {/* Título principal */}
                    <div className="hero-content">
                        <h2>
                            ¡Bienvenido de{' '}
                            <span className="gradient-text">nuevo!</span>
                        </h2>
                        <p>
                            Inicia sesión para acceder a tus proyectos de fotografía y retablos personalizados.
                        </p>
                    </div>

                    {/* Features destacados */}
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <CameraIcon />
                            </div>
                            <div className="feature-content">
                                <h3>Gestiona tus proyectos</h3>
                                <p>Accede a todos tus encargos y personalizaciones</p>
                            </div>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon sparkles">
                                <SparklesIcon />
                            </div>
                            <div className="feature-content">
                                <h3>Seguimiento en tiempo real</h3>
                                <p>Conoce el estado de tus pedidos al instante</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon user">
                                <UserIcon />
                            </div>
                            <div className="feature-content">
                                <h3>Perfil personalizado</h3>
                                <p>Tu galería privada y preferencias guardadas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho - Formulario */}
                <div className="form-panel">
                    <div className="form-container">
                        {/* Header del formulario */}
                        <div className="form-header">
                            <div className="form-logo">
                                <LockIcon />
                            </div>
                            <h2>Iniciar Sesión</h2>
                            <p>Ingresa tus credenciales para continuar</p>
                        </div>

                        {/* Mensaje de Error */}
                        {error && (
                            <div className="error-message">
                                <AlertIcon />
                                <div>
                                    <h4>Error de autenticación</h4>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="login-form">
                            {/* Email */}
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <div className="input-container">
                                    <MailIcon />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="form-group">
                                <label>Contraseña</label>
                                <div className="input-container">
                                    <LockIcon />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Recordar / Olvidé contraseña */}
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Recordarme</span>
                                </label>
                                <Link to="/forgot-password" className="forgot-password">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="submit-button"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div>
                                        <span>Iniciando sesión...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Iniciar Sesión</span>
                                        <ArrowRightIcon />
                                    </>
                                )}
                            </button>

                            {/* Divisor */}
                            <div className="divider">
                                <span>o continúa con</span>
                            </div>

                            {/* Botones sociales */}
                            <div className="social-buttons">
                                <button type="button" className="social-button google">
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span>Google</span>
                                </button>
                                
                                <button type="button" className="social-button facebook">
                                    <svg fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span>Facebook</span>
                                </button>
                            </div>
                        </form>

                        {/* Link de registro */}
                        <div className="register-link">
                            <p>
                                ¿No tienes una cuenta?{' '}
                                <Link to="/register">
                                    Regístrate gratis →
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Logo móvil */}
                    <div className="mobile-logo">
                        <CameraIcon />
                        <span>Arte & Memoria</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;