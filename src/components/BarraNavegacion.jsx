import React from "react";
import "../styles/BarraNavegacion.css";

// Importar imágenes desde src/assets
import menuIcon from "../assets/menu.png";
import userIcon from "../assets/usuario.png";
import notifIcon from "../assets/notificacion.png";

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
  notifications = [],
  notifMenuOpen,
  toggleNotificationMenu,
  onViewAllNotifications
}) {
  const unreadCount = notifications.length;

  const handleViewAllClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleNotificationMenu();
    onViewAllNotifications();
  };

  return (
    <header className="navbar">
      <div className="header-left-group">
        <img
          src={menuIcon}
          alt="Menú"
          className="icon-control-img"
          onClick={onToggleSidebar}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="user-info">
        <div className="profile-info-container">
          <img src={userIcon} alt="Usuario" className="icon-control-img" />
          <span className="user-name">{userName}</span>
        </div>

        <div
          className="notification-dropdown-container"
          onClick={toggleNotificationMenu}
        >
          <img
            src={notifIcon}
            alt="Notificaciones"
            className="icon-control-img notification-icon-img"
          />

          {unreadCount > 0 && (
            <span className="notification-badge" data-count={unreadCount}>
              {unreadCount}
            </span>
          )}

          <div
            className={`dropdown-menu notification-menu ${
              notifMenuOpen ? "visible" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="dropdown-title">
              Notificaciones recientes ({unreadCount})
            </p>

            <div className="notification-list-scrollable">
              {unreadCount > 0 ? (
                notifications.slice(0, 5).map((notif, index) => (
                  <NotificationItem
                    key={index}
                    message={notif.message || `Notificación ${index + 1}`}
                    time={notif.time || `${index + 1}h atrás`}
                  />
                ))
              ) : (
                <div className="dropdown-item notification-empty">
                  No hay notificaciones nuevas.
                </div>
              )}
            </div>

            <a
              href="#"
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
