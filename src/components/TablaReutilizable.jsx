// src/components/TablaReutilizable.jsx
import React from 'react';
import '../styles/TablaReutilizable.css';
import FilaUsuario from './FilaUsuario';

const TablaReutilizable = ({ columns, data, onEditUser, onStatusChange }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="center-content">No hay datos para mostrar.</td>
          </tr>
        ) : (
          data.map(user => (
            <FilaUsuario 
              key={user.id} 
              user={user} 
              onEdit={onEditUser} 
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablaReutilizable;