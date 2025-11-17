import React from "react";
import "../styles/BarraNavegacion.css";

// Componente para una notificación individual (usado internamente)
const NotificationItem = ({ message, time }) => (
    <div className="notification-item">
      <p className="notification-message">{message}</p>
      <span className="notification-time">{time}</span>
    </div>
);

function Navbar({
  onToggleSidebar,
  userName,
  notifications = [], //array de notificaciones
  notifMenuOpen,
  toggleNotificationMenu,
  onViewAllNotifications // Función para manejar el clic en 'Ver todas'
}) {
  const unreadCount = notifications.length;

  // Maneja el clic en "Ver todas"
  const handleViewAllClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    toggleNotificationMenu(); // Cierra el menú (opcional, si el padre no lo cierra automáticamente)
    onViewAllNotifications(); // Llama a la acción principal
  };

  return (
    <header className="navbar">
      <div className="header-left-group">
        <img
          src="/imagenes/menu.png"
          alt="Menú"
          className="icon-control-img"
          onClick={onToggleSidebar}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="user-info">
        <div className="profile-info-container">
          <img src="/imagenes/usuario.png" alt="Usuario" className="icon-control-img" />
          <span className="user-name">{userName}</span>
        </div>

        <div
          className="notification-dropdown-container"
          onClick={toggleNotificationMenu}
        >
          <img
            src="/imagenes/notificacion.png"
            alt="Notificaciones"
            className="icon-control-img notification-icon-img"
          />

          {unreadCount > 0 && (
            //se usa 'data-count' para que el CSS pueda mostrarlo condicionalmente
            <span className="notification-badge" data-count={unreadCount}>{unreadCount}</span>
          )}

          {/* Menú desplegable */}
          <div className={`dropdown-menu notification-menu ${notifMenuOpen ? 'visible' : ''}`}
               // Parar la propagación de clics dentro del menú para que no lo cierre
               onClick={e => e.stopPropagation()} 
          >
            <p className="dropdown-title">Notificaciones recientes ({unreadCount})</p>
            
            <div className="notification-list-scrollable">
              {unreadCount > 0 ? (
                notifications.slice(0, 5).map((notif, index) => ( // Muestra solo las 5 más recientes
                  <NotificationItem 
                    key={index}
                    message={notif.message || `Notificación de prueba ${index + 1}`}
                    time={notif.time || `${index + 1}h atrás`} 
                  />
                ))
              ) : (
                <div className="dropdown-item notification-empty">No hay notificaciones nuevas.</div>
              )}
            </div>
            
            {/* Opción para Ver Todas las Notificaciones */}
            <a 
              href="#" // Usamos <a> para el estilo de enlace, pero se controla con JS
              className="dropdown-item view-all"
              onClick={handleViewAllClick}
            >
              Ver todas las notificaciones
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;