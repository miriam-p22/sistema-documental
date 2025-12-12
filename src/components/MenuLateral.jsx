import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/MenuLateral.css";

// Imágenes
import IconoLogo from "../assets/logo.png";
import IconoUsuarios from "../assets/usuarios.png";
import IconoDashboard from "../assets/dashboard.png";
import IconoDocumentos from "../assets/documentos.png";
import IconoOrganigrama from "../assets/organigrama.png";
import IconoDispersion from "../assets/enviodocumentos.png";
import IconoLeyArchivo from "../assets/leyarchivo.png";
import IconoConfiguracion from "../assets/configuracion.png";
import IconoCerrarSesion from "../assets/cerrarsesion.png";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Leer el rol almacenado
  const rol = localStorage.getItem("user_rol");

  // Permisos por rol
  const permisos = {
    presidenta: ["dashboard", "logout"],
    recursos_humanos: [
      "usuarios",
      "documentos",
      "organigrama",
      "config",
      "logout"
    ],
    oficialia: ["dispersion", "logout"],
     ley_archivo: ["leyarchivo", "logout"],
  };

  // Obtener accesos del usuario actual
  const accesos = permisos[rol] || [];

  // Submenú de Configuración
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setConfigOpen(false);
  }, [isOpen]);

  /** -----------------------------------------------------------------
   *  Función para desactivar opciones según permisos
   *  ----------------------------------------------------------------- */
  const estaDeshabilitado = (opcion) => !accesos.includes(opcion);

  /** -----------------------------------------------------------------
   *  Si está deshabilitado, evitamos navegación
   *  ----------------------------------------------------------------- */
  const manejarClick = (e, opcion, ruta) => {
    if (estaDeshabilitado(opcion)) {
      e.preventDefault();
      alert("No tienes permisos para acceder a esta sección.");
      return;
    }
    navigate(ruta);
  };

  return (
    <nav className={`sidebar sidebar-off-canvas ${!isOpen ? "collapsed" : ""}`} id="sidebar">
      <ul className="nav">

        {/* LOGO */}
        <li className="nav-item nav-category tlahuapan-item">
          <div className="tlahuapan-logo-text">
            <img src={IconoLogo} alt="Logo" className="tlahuapan-logo" />
            {isOpen && <span className="tlahuapan-text">TLAHUAPAN</span>}
          </div>
        </li>

        {/* USUARIOS */}
        <li
          className={`nav-item ${location.pathname === "/usuarios" ? "active" : ""} 
          ${estaDeshabilitado("usuarios") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "usuarios", "/usuarios")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoUsuarios} className="sidebar-icon-img" alt="Usuarios" />
            </span>
            {isOpen && <span className="menu-title">Usuarios</span>}
          </span>
        </li>

        {/* DASHBOARD */}
        <li
          className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""} 
          ${estaDeshabilitado("dashboard") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "dashboard", "/dashboard")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoDashboard} className="sidebar-icon-img" alt="Dashboard" />
            </span>
            {isOpen && <span className="menu-title">Dashboard</span>}
          </span>
        </li>

        {/* DOCUMENTOS */}
        <li
          className={`nav-item ${location.pathname === "/documentos" ? "active" : ""} 
          ${estaDeshabilitado("documentos") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "documentos", "/documentos")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoDocumentos} className="sidebar-icon-img" alt="Documentos" />
            </span>
            {isOpen && <span className="menu-title">Documentos</span>}
          </span>
        </li>

        {/* ORGANIGRAMA */}
        <li
          className={`nav-item ${location.pathname === "/organigrama" ? "active" : ""} 
          ${estaDeshabilitado("organigrama") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "organigrama", "/organigrama")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoOrganigrama} className="sidebar-icon-img" alt="Organigrama" />
            </span>
            {isOpen && <span className="menu-title">Organigrama</span>}
          </span>
        </li>

        {/* DISPERSIÓN */}
        <li
          className={`nav-item ${location.pathname === "/dispersion" ? "active" : ""} 
          ${estaDeshabilitado("dispersion") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "dispersion", "/dispersion")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoDispersion} className="sidebar-icon-img" alt="Dispersión" />
            </span>
            {isOpen && <span className="menu-title">Dispersión</span>}
          </span>
        </li>

        {/* LEY DE ARCHIVO */}
        <li
          className={`nav-item ${location.pathname === "/leyarchivo" ? "active" : ""} 
          ${estaDeshabilitado("leyarchivo") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "leyarchivo", "/leyarchivo")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoLeyArchivo} className="sidebar-icon-img" alt="Ley de Archivo" />
            </span>
            {isOpen && <span className="menu-title">Ley de Archivo</span>}
          </span>
        </li>

        {/* CONFIGURACIÓN */}
        <li
          className={`nav-item ${location.pathname.includes("/config") ? "active" : ""} 
          ${estaDeshabilitado("config") ? "disabled-menu" : ""}`}
          onClick={(e) => {
            if (estaDeshabilitado("config")) {
              e.preventDefault();
              alert("No tienes permisos para acceder.");
              return;
            }
            setConfigOpen(!configOpen);
          }}
        >
          <div className="nav-link submenu-toggle">
            <span className="icon-bg">
              <img src={IconoConfiguracion} className="sidebar-icon-img" alt="Configuración" />
            </span>

            {isOpen && <span className="menu-title">Configuración</span>}
          </div>

          {/* Submenú */}
          {configOpen && isOpen && (
            <ul className="submenu">
              <li className="submenu-item">
                <Link to="/config/notificacion-conexion">Notificaciones y conexión a BD</Link>
              </li>
              <li className="submenu-item">
                <Link to="/config/direcciones-ip">Direcciones IP</Link>
              </li>
            </ul>
          )}
        </li>

        {/* CERRAR SESIÓN */}
        <li
          className={`nav-item ${estaDeshabilitado("logout") ? "disabled-menu" : ""}`}
          onClick={(e) => manejarClick(e, "logout", "/login")}
        >
          <span className="nav-link">
            <span className="icon-bg">
              <img src={IconoCerrarSesion} className="sidebar-icon-img" alt="Cerrar Sesión" />
            </span>
            {isOpen && <span className="menu-title">Cerrar Sesión</span>}
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
