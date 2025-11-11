import React from 'react';
import EtiquetaEstado from './EtiquetaEstado';
import BotonReutilizable from './BotonReutilizable';
import BotonDesplegable from './BotonDesplegable';

const FilaUsuario = ({ user, onEdit, onStatusChange, onRowClick, isSelected }) => { 
  
  const handleEditClick = (e) => {
    e.stopPropagation(); 
    onEdit(user);
  };
  
  const statusOptions = [
    { 
        label: (<span><i className="fas fa-check-circle"></i> Activo</span>), 
        onClick: () => onStatusChange(user.id, 'Activo'),
        statusClass: 'status-active' //Clase para el color verde
    },
    { 
        label: (<span><i className="fas fa-times-circle"></i> Inactivo</span>), 
        onClick: () => onStatusChange(user.id, 'Inactivo'),
        statusClass: 'status-inactive' // Clase para el color rojo
    },
  ];

  return (
    <tr
      className={isSelected ? 'selected-user' : ''}
      onClick={() => onRowClick(user.id)}
    >
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
            className="btn-action edit" 
            title="Editar Usuario" 
            onClick={handleEditClick} 
          >
            Editar 
          </BotonReutilizable>
          
          <BotonDesplegable 
            title="Estado"
            options={statusOptions}
          />
          
        </div>
      </td>
    </tr>
  );
};

export default FilaUsuario;