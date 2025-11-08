import { useState } from "react";
import "../styles/BarraNavegacion.css";

function Navbar({
  onToggleSidebar,
  userName,
  notifications,
  notifMenuOpen,
  toggleNotificationMenu
}) {
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
          <img src="/imagenes/usuario.png" className="icon-control-img" />
          <span className="user-name">{userName}</span>
        </div>

        <div
          className="notification-dropdown-container"
          onClick={toggleNotificationMenu}
        >
          <img
            src="/imagenes/notificacion.png"
            className="icon-control-img notification-icon-img"
          />

          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}

          {notifMenuOpen && (
            <div className="dropdown-menu notification-menu">
              <p className="dropdown-title">Notificaciones recientes</p>
              <a href="#" className="dropdown-item">
                Tienes {notifications} notificaciones nuevas.
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
