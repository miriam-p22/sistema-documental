import React from "react";
import "../styles/DropdownReutilizable.css"; 

const DropdownReutilizable = ({ label, options, value, onChange }) => {
  return (
    <div className="filtro-grupo">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((opcion, index) => (
          <option key={index} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownReutilizable;
