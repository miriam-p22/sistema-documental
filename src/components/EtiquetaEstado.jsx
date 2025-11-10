// src/components/BadgeEstatus.jsx
import React from 'react';
import '../styles/EtiquetaEstado.css';

const EtiquetaEstado = ({ estatus, className = '' }) => {
  // Mapea el estatus a la clase CSS correspondiente
  const statusClass = estatus.toLowerCase() === 'activo' ? 'status-active' : 'status-inactive';
  
  return (
    <span className={`status-badge ${statusClass} ${className}`} data-current-status={estatus.toLowerCase()}>
      {estatus}
    </span>
  );
};

export default EtiquetaEstado;