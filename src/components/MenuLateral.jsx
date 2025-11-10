import { Link } from "react-router-dom";
import "../styles/BarraLateral.css";

function Sidebar({ collapsed }) {
  return (
    <nav className={`sidebar sidebar-off-canvas ${collapsed ? "collapsed" : ""}`} id="sidebar">
      <ul className="nav">

        <li className="nav-item nav-category tlahuapan-item">
          <div className="tlahuapan-logo-text">
            <img
              src="/imagenes/logo.png"
              alt="Logo"
              className="tlahuapan-logo"
            />
            {!collapsed && <span className="tlahuapan-text">TLAHUAPAN</span>}
          </div>
        </li>

        <li className="nav-item active" id="menu-usuarios">
          <Link className="nav-link" to="/usuarios">
            <span className="icon-bg">
              <img src="/imagenes/usuarios.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Usuarios</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-dashboard">
          <Link className="nav-link" to="/dashboard">
            <span className="icon-bg">
              <img src="/imagenes/dashboard.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Dashboard</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-documentos">
          <Link className="nav-link" to="/documentos">
            <span className="icon-bg">
              <img src="/imagenes/documentos.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Documentos</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-organigrama">
          <Link className="nav-link" to="/organigrama">
            <span className="icon-bg">
              <img src="/imagenes/organigrama.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Organigrama</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-dispersion">
          <Link className="nav-link" to="/dispersion">
            <span className="icon-bg">
              <img src="/imagenes/enviodocumentos.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Dispersión</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-leyarchivo">
          <Link className="nav-link" to="/leyarchivo">
            <span className="icon-bg">
              <img src="/imagenes/leyarchivo.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Ley de Archivo</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-configuracion">
          <Link className="nav-link" to="/configuracion">
            <span className="icon-bg">
              <img src="/imagenes/configuracion.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Configuración</span>}
          </Link>
        </li>

        <li className="nav-item" id="menu-cerrarsesion">
          <Link className="nav-link" to="/logout">
            <span className="icon-bg">
              <img src="/imagenes/cerrarsesion.png" className="sidebar-icon-img" />
            </span>
            {!collapsed && <span className="menu-title">Cerrar Sesión</span>}
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;