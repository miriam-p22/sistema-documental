import { Link, useLocation } from "react-router-dom";
import "../styles/MenuLateral.css";

// Importar imágenes desde src/assets
import logo from "../assets/logo.png";
import usuariosIcon from "../assets/usuarios.png";
import dashboardIcon from "../assets/dashboard.png";
import documentosIcon from "../assets/documentos.png";
import organigramaIcon from "../assets/organigrama.png";
import dispersionIcon from "../assets/enviodocumentos.png";
import leyarchivoIcon from "../assets/leyarchivo.png";
import configuracionIcon from "../assets/configuracion.png";
import cerrarsesionIcon from "../assets/cerrarsesion.png";

function Sidebar({ isOpen }) {
  const location = useLocation();
  
  return (
    <nav
      className={`sidebar sidebar-off-canvas ${!isOpen ? "collapsed" : ""}`}
      id="sidebar"
    >
      <ul className="nav">

        <li className="nav-item nav-category tlahuapan-item">
          <div className="tlahuapan-logo-text">
            <img src={logo} alt="Logo" className="tlahuapan-logo" />
            {isOpen && <span className="tlahuapan-text">TLAHUAPAN</span>}
          </div>
        </li>

        <li className={`nav-item ${location.pathname === "/usuarios" ? "active" : ""}`}>
          <Link className="nav-link" to="/usuarios">
            <span className="icon-bg">
              <img src={usuariosIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Usuarios</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
          <Link className="nav-link" to="/dashboard">
            <span className="icon-bg">
              <img src={dashboardIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Dashboard</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/documentos" ? "active" : ""}`}>
          <Link className="nav-link" to="/documentos">
            <span className="icon-bg">
              <img src={documentosIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Documentos</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/organigrama" ? "active" : ""}`}>
          <Link className="nav-link" to="/organigrama">
            <span className="icon-bg">
              <img src={organigramaIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Organigrama</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/dispersion" ? "active" : ""}`}>
          <Link className="nav-link" to="/dispersion">
            <span className="icon-bg">
              <img src={dispersionIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Dispersión</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/leyarchivo" ? "active" : ""}`}>
          <Link className="nav-link" to="/leyarchivo">
            <span className="icon-bg">
              <img src={leyarchivoIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Ley de Archivo</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/configuracion" ? "active" : ""}`}>
          <Link className="nav-link" to="/configuracion">
            <span className="icon-bg">
              <img src={configuracionIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Configuración</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}>
          <Link className="nav-link" to="/login">
            <span className="icon-bg">
              <img src={cerrarsesionIcon} className="sidebar-icon-img" />
            </span>
            {isOpen && <span className="menu-title">Cerrar Sesión</span>}
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;
