// frontend/src/pages/RegisterPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './RegisterPage.css';

const API_URL = 'http://localhost:5000/api/auth/register';

const RegisterPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!acceptTerms) {
            setError('Debes aceptar los términos y condiciones');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
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

    // Validación de fortaleza de contraseña
    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, text: '', color: '' };
        
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength <= 2) return { strength, text: 'Débil', color: 'strength-weak' };
        if (strength <= 3) return { strength, text: 'Media', color: 'strength-medium' };
        return { strength, text: 'Fuerte', color: 'strength-strong' };
    };

    const passwordStrength = getPasswordStrength();

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

    const PhoneIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
    );

    const CheckCircleIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    );

    return (
        <div className="register-page">
            {/* Elementos decorativos animados */}
            <div className="decorative-circle circle-1"></div>
            <div className="decorative-circle circle-2"></div>
            <div className="decorative-circle circle-3"></div>

            <div className="register-container">
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
                            Únete a{' '}
                            <span className="gradient-text">nosotros</span>
                        </h2>
                        <p>
                            Crea tu cuenta y comienza a transformar tus momentos en obras de arte únicas.
                        </p>
                    </div>

                    {/* Beneficios */}
                    <div className="benefits-list">
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <CheckCircleIcon />
                            </div>
                            <div className="benefit-content">
                                <h3>Registro rápido y fácil</h3>
                                <p>Solo necesitas unos minutos para comenzar</p>
                            </div>
                        </div>
                        
                        <div className="benefit-item">
                            <div className="benefit-icon sparkles">
                                <SparklesIcon />
                            </div>
                            <div className="benefit-content">
                                <h3>Ofertas exclusivas</h3>
                                <p>Accede a promociones especiales para nuevos miembros</p>
                            </div>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon camera">
                                <CameraIcon />
                            </div>
                            <div className="benefit-content">
                                <h3>Galería personal</h3>
                                <p>Guarda y organiza todos tus proyectos</p>
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
                                <UserIcon />
                            </div>
                            <h2>Crear Cuenta</h2>
                            <p>Completa el formulario para registrarte</p>
                        </div>

                        {/* Mensaje de Error */}
                        {error && (
                            <div className="error-message">
                                <AlertIcon />
                                <div>
                                    <h4>Error en el registro</h4>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="register-form">
                            {/* Nombre completo */}
                            <div className="form-group">
                                <label>Nombre completo</label>
                                <div className="input-container">
                                    <UserIcon />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <div className="input-container">
                                    <MailIcon />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="form-group">
                                <label>
                                    Teléfono <span className="optional">(opcional)</span>
                                </label>
                                <div className="input-container">
                                    <PhoneIcon />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+57 300 123 4567"
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                
                                {/* Barra de fortaleza de contraseña */}
                                {formData.password && (
                                    <div className="password-strength">
                                        <div className="strength-header">
                                            <span>Fortaleza:</span>
                                            <span className={`strength-text ${passwordStrength.color}`}>
                                                {passwordStrength.text}
                                            </span>
                                        </div>
                                        <div className="strength-bar">
                                            <div 
                                                className={`strength-progress ${passwordStrength.color}`}
                                                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirmar Contraseña */}
                            <div className="form-group">
                                <label>Confirmar Contraseña</label>
                                <div className="input-container">
                                    <LockIcon />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirma tu contraseña"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="password-toggle"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="password-error">Las contraseñas no coinciden</p>
                                )}
                            </div>

                            {/* Términos y condiciones */}
                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="terms-checkbox"
                                />
                                <label className="terms-label" onClick={() => setAcceptTerms(!acceptTerms)}>
                                    Acepto los{' '}
                                    <Link to="/terms" className="terms-link">
                                        términos y condiciones
                                    </Link>
                                    {' '}y la{' '}
                                    <Link to="/privacy" className="terms-link">
                                        política de privacidad
                                    </Link>
                                </label>
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
                                        <span>Creando cuenta...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Crear Cuenta</span>
                                        <ArrowRightIcon />
                                    </>
                                )}
                            </button>

                            {/* Divisor */}
                            <div className="divider">
                                <span>o regístrate con</span>
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

                        {/* Link de login */}
                        <div className="login-link">
                            <p>
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login">
                                    Inicia sesión →
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

export default RegisterPage;