// src/components/FilaUsuario.jsx
import React from 'react';
import EtiquetaEstado from './EtiquetaEstado';
import BotonReutilizable from './BotonReutilizable';

const FilaUsuario = ({ user, onEdit, onStatusChange }) => {
  // Manejo del dropdown de estado (simulación de lógica de apertura/cierre)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleStatusClick = (newStatus) => {
    onStatusChange(user.id, newStatus);
    setIsDropdownOpen(false); // Cierra el dropdown después de la acción
  };

  return (
    <tr>
      <td>{user.nombre}</td>
      <td className="center-content">{user.numTrabajador}</td>
      <td className="center-content">{user.correo}</td>
      <td className="center-content">{user.usuario}</td>
      <td>{user.adscripcion}</td>
      <td className="status-cell">
        <EtiquetaEstado estatus={user.estatus} />
      </td>
      <td className="actions-cell">
        <div className="actions-cell-content">
          <BotonReutilizable 
            className="edit" 
            title="Editar Usuario" 
            onClick={() => onEdit(user)}
          >
            Editar 
          </BotonReutilizable>
          
          <div className="dropdown-action">
            <button className="dropdown-toggle-status" title="Cambiar Estado" onClick={toggleDropdown}>
              Estado <i className="fas fa-chevron-down"></i>
            </button>
            
            {/* Contenido del Dropdown de Estado Reutilizable */}
            <div className="dropdown-content" style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <button 
                className="btn-action status-action status-active" 
                onClick={() => handleStatusClick('Activo')}
              >
                <i className="fas fa-check-circle"></i> Activo
              </button>
              <button 
                className="btn-action status-action status-inactive" 
                onClick={() => handleStatusClick('Inactivo')}
              >
                <i className="fas fa-times-circle"></i> Inactivo
              </button>
              {/* Se pueden añadir otros estados aquí */}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FilaUsuario;