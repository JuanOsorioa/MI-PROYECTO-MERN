// frontend/src/pages/DashboardPage.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  // Estados para cambiar contraseña
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estados para actualizar perfil
  const [profileData, setProfileData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    fetchUserData();
    fetchUserOrders();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(response.data.user);
      setProfileData({
        name: response.data.user.name,
        phone: response.data.user.phone || ''
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (changePasswordData.newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/change-password', 
        {
          currentPassword: changePasswordData.currentPassword,
          newPassword: changePasswordData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Contraseña cambiada exitosamente');
      setChangePasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'Error al cambiar la contraseña');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/profile', 
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Perfil actualizado exitosamente');
      setUserInfo(response.data.user);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando tu información...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>Mi Cuenta</h2>
            <p>Bienvenido, {userInfo?.name}</p>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              📝 Perfil
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📦 Mis Pedidos
            </button>
            <button 
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              🔒 Cambiar Contraseña
            </button>
            <button onClick={logout} className="logout-btn">
              🚪 Cerrar Sesión
            </button>
          </nav>
        </div>

        {/* Contenido principal */}
        <div className="dashboard-content">
          {/* Pestaña de Perfil */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h3>Información del Perfil</h3>
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userInfo?.email}
                    disabled
                    className="disabled-input"
                  />
                  <small>El email no se puede cambiar</small>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Actualizar Perfil
                </button>
              </form>
            </div>
          )}

          {/* Pestaña de Pedidos */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h3>Mis Pedidos</h3>
              {orders.length === 0 ? (
                <div className="no-orders">
                  <p>📭 No tienes pedidos realizados.</p>
                  <p>Visita nuestra galería para hacer tu primer pedido.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <h4>Pedido #{order.orderNumber}</h4>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <p><strong>Total:</strong> ${order.totalAmount}</p>
                        <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Items:</strong> {order.items.length} producto(s)</p>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-type">{item.productType}</span>
                            <span className="item-title">{item.title}</span>
                            <span className="item-price">${item.price}</span>
                          </div>
                        ))}
                      </div>
                      {order.status === 'pendiente' && (
                        <button className="cancel-btn">
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pestaña de Cambiar Contraseña */}
          {activeTab === 'password' && (
            <div className="tab-content">
              <h3>Cambiar Contraseña</h3>
              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label>Contraseña Actual</label>
                  <input
                    type="password"
                    value={changePasswordData.currentPassword}
                    onChange={(e) => setChangePasswordData({
                      ...changePasswordData,
                      currentPassword: e.target.value
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nueva Contraseña</label>
                  <input
                    type="password"
                    value={changePasswordData.newPassword}
                    onChange={(e) => setChangePasswordData({
                      ...changePasswordData,
                      newPassword: e.target.value
                    })}
                    required
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    value={changePasswordData.confirmPassword}
                    onChange={(e) => setChangePasswordData({
                      ...changePasswordData,
                      confirmPassword: e.target.value
                    })}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;