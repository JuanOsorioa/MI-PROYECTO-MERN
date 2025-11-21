// frontend/src/pages/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const gallery = [
    { id: 1, type: 'Retablo Tradicional', price: '$45' },
    { id: 2, type: 'Fotografía Artística', price: '$30' },
    { id: 3, type: 'Retablo Personalizado', price: '$60' },
    { id: 4, type: 'Álbum de Bodas', price: '$120' },
    { id: 5, type: 'Retablo Familiar', price: '$75' },
    { id: 6, type: 'Fotografía en Lienzo', price: '$50' }
  ];

  const handleOrder = (e) => {
    e.preventDefault();
    alert('¡Pedido enviado! Te contactaremos pronto para confirmar los detalles.');
    setShowOrder(false);
  };

  // Íconos SVG como componentes
  const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
      <path d="M20 7h-2.586l-1.707-1.707A1 1 0 0015 5h-4a1 1 0 00-.707.293L8.586 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z"/>
    </svg>
  );

  const ImageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );

  const PackageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  return (
    <div className="photography-website">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <CameraIcon />
            <span className="logo-text">Arte & Memoria</span>
          </div>
          
          <div className="nav-links">
            <a href="#inicio" className="nav-link">Inicio</a>
            <a href="#galeria" className="nav-link">Galería</a>
            <a href="#servicios" className="nav-link">Servicios</a>
            <button 
              onClick={() => setShowOrder(true)}
              className="order-btn"
            >
              Hacer Pedido
            </button>
            <Link to="/login" className="nav-link login-link">
              <UserIcon />
              <span>Acceder</span>
            </Link>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="mobile-menu">
            <a href="#inicio" className="mobile-nav-link">Inicio</a>
            <a href="#galeria" className="mobile-nav-link">Galería</a>
            <a href="#servicios" className="mobile-nav-link">Servicios</a>
            <button 
              onClick={() => setShowOrder(true)}
              className="mobile-order-btn"
            >
              Hacer Pedido
            </button>
            <Link to="/login" className="mobile-login-btn">
              Acceder
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">Capturamos</span>
              <br />
              <span className="hero-subtitle">tus momentos únicos</span>
            </h1>
            <p className="hero-description">
              Fotografía profesional y retablos personalizados que cuentan tu historia. 
              Transforma tus recuerdos en obras de arte únicas.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => setShowOrder(true)}
                className="primary-btn"
              >
                Solicitar Encargo
              </button>
              <a 
                href="#galeria"
                className="secondary-btn"
              >
                Ver Galería
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-decoration"></div>
            <div className="image-content">
              <div className="image-placeholder">
                <CameraIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="services-section">
        <div className="services-container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon camera">
                <CameraIcon />
              </div>
              <h3 className="service-title">Fotografía</h3>
              <p className="service-description">Sesiones profesionales para eventos, retratos y momentos especiales</p>
              <ul className="service-features">
                <li><StarIcon /> Bodas y eventos</li>
                <li><StarIcon /> Retratos familiares</li>
                <li><StarIcon /> Fotografía artística</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon image">
                <ImageIcon />
              </div>
              <h3 className="service-title">Retablos</h3>
              <p className="service-description">Obras únicas que transforman tus fotos en arte tradicional</p>
              <ul className="service-features">
                <li><HeartIcon /> Retablos personalizados</li>
                <li><HeartIcon /> Diseños exclusivos</li>
                <li><HeartIcon /> Arte tradicional</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon package">
                <PackageIcon />
              </div>
              <h3 className="service-title">Álbumes</h3>
              <p className="service-description">Álbumes personalizados que preservan tus mejores momentos</p>
              <ul className="service-features">
                <li><StarIcon /> Diseño a medida</li>
                <li><StarIcon /> Múltiples formatos</li>
                <li><StarIcon /> Entrega rápida</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="gallery-section">
        <div className="gallery-container">
          <h2 className="section-title">Galería de Trabajos</h2>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
              >
                <div className="gallery-image">
                  <ImageIcon />
                </div>
                <div className="gallery-overlay">
                  <h3 className="gallery-item-title">{item.type}</h3>
                  <p className="gallery-item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setShowOrder(false)}
              className="modal-close"
            >
              <CloseIcon />
            </button>
            
            <h2 className="modal-title">Realizar Encargo</h2>
            <form onSubmit={handleOrder} className="order-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nombre completo</label>
                  <input 
                    type="text" 
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de servicio</label>
                <select className="form-input">
                  <option>Fotografía</option>
                  <option>Retablo personalizado</option>
                  <option>Álbum personalizado</option>
                  <option>Combinación</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fecha deseada</label>
                <input 
                  type="date" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detalles de personalización</label>
                <textarea 
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe tu visión: colores, tamaño, estilo, elementos especiales..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="submit-btn"
              >
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <CameraIcon />
            <span className="footer-logo-text">Arte & Memoria</span>
          </div>
          <p className="footer-description">Transformando momentos en arte desde 2020</p>
          <p className="footer-copyright">© 2024 Arte & Memoria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;