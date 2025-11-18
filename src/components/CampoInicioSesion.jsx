import React from "react";
import "../styles/CampoInicioSesion.css";

const CampoInicioSesion = ({ type, value, onChange, placeholder, name }) => {
  return (
    <div className="campo-reutilizable">
      <input
        className="input-reutilizable"
        type={type}
        name={name}            // ✅ importante para actualizar el estado
        value={value}
        onChange={onChange}    // ✅ pasa el evento correctamente
        placeholder={placeholder}
      />
    </div>
  );
};

export default CampoInicioSesion;
