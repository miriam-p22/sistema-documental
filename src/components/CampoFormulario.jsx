// src/components/CampoFormulario.jsx
import React from 'react';
import '../styles/CampoFormulario.css';

const CampoFormulario = ({ label, type = 'text', value, onChange, placeholder, required = false, children, isSelect = false, ...props }) => {
  
  const InputElement = isSelect ? 'select' : 'input';

  return (
    <label className="field">
      <span className="label-text">{label}</span>
      <InputElement
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      >
        {children}
      </InputElement>
    </label>
  );
};

export default CampoFormulario;