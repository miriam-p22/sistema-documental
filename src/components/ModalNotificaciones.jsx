import React from "react";
import ModalReutilizable from "./ModalReutilizable";
import BotonReutilizable from "./BotonReutilizable";

const ModalCentroNotificaciones = ({ isOpen, onClose }) => (
  <ModalReutilizable
    id="modalNotificaciones"
    title="Centro de Notificaciones"
    isOpen={isOpen}
    onClose={onClose}
    onAccept={onClose}
    acceptButtonText="Cerrar"
  >
    <div className="notifications-container">
      <div className="notification-item unread">
        <p><strong>Recursos Humanos:</strong> Solicita autorización del nuevo organigrama 2025–2028.</p>
        <BotonReutilizable className="btn-small status-active">Aceptar</BotonReutilizable>
        <BotonReutilizable className="btn-small status-active">Rechazar</BotonReutilizable>
        <span className="notification-time">Hace 10 minutos</span>
      </div>
      <div className="notification-item unread">
        <p><strong>Presidencia:</strong> Tienes un nuevo documento asignado.</p>
        <span className="notification-time">Hace 5 minutos</span>
      </div>
      <div className="notification-item">
        <p><strong>Contraloría:</strong> Se ha autorizado el organigrama 2024–2027.</p>
        <span className="notification-time">Ayer</span>
      </div>
    </div>
  </ModalReutilizable>
);

export default ModalCentroNotificaciones;
