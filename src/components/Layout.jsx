import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Sidebar from "./MenuLateral";
import Navbar from "./BarraNavegacion";

const Layout = () => {
  // 1. Estado para controlar si el Sidebar está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. Estado para controlar si el MENÚ DE NOTIFICACIONES está abierto
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false); 

  // 3. Función para alternar el estado del Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  // 4. Función para alternar el estado del Menú de Notificaciones
  const toggleNotificationMenu = () => { 
    setIsNotifMenuOpen(prev => !prev);
  };

  // Función  para ver todas las notificaciones (Necesaria para Navbar)
  const handleViewAllNotifications = () => {
      console.log("Navegando a la pantalla de todas las notificaciones...");
      // Aquí se podrías usar navigate('/notifications'); si se usa react-router-dom
  };
  
  // Datos para el ejemplo
  const mockNotifications = [
      { message: "Solicitud pendiente de aprobación", time: "2h" },
      { message: "El reporte diario está listo.", time: "4h" },
      { message: "Nueva tarea asignada por Admin.", time: "1d" },
  ];

  return (
    <div className={`layout-container ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>

      <Sidebar isOpen={isSidebarOpen} />

      <div className="main-area">
        {/* 5. PASAR EL ESTADO Y EL TOGGLE A LA NAVBAR */}
        <Navbar 
          onToggleSidebar={toggleSidebar} 
          userName="Usuario Ejemplo"
          notifications={mockNotifications} // Pasar el array de notificaciones
          
          // PROPS CRUCIALES PARA EL DROPDOWN DE NOTIFICACIONES
          notifMenuOpen={isNotifMenuOpen}
          toggleNotificationMenu={toggleNotificationMenu}
          onViewAllNotifications={handleViewAllNotifications}
        />

        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;