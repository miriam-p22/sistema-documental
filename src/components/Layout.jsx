import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

import Navbar from "./BarraNavegacion"; // Componente Navbar
import Sidebar from "./MenuLateral";

const Layout = () => {
  // 1. Estado para controlar si el Sidebar está abierto (true) o colapsado (false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. Función para alternar el estado del Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    // 3. Aplicar la clase condicional al contenedor principal
    // Esta clase ('sidebar-collapsed') se usará en CSS para reducir el ancho del Sidebar
    <div className={`layout-container ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>

      {/* 4. Pasar el estado 'isOpen' al Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className="main-area">
        {/* 5. Pasar la función 'toggleSidebar' a la Navbar */}
        <Navbar 
          onToggleSidebar={toggleSidebar} 
          userName="Usuario Ejemplo" // Pasa el nombre de usuario real aquí
          notifications={3} // Pasa el número real de notificaciones
          // (Asegúrate de pasar también 'notifMenuOpen' y 'toggleNotificationMenu' si son necesarios)
        />

        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;