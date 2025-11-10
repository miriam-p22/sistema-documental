// src/components/BotonDesplegable.jsx
import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import '../styles/BotonDesplegable.css';

const BotonDesplegable = ({ title = "Opciones", options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-action">
      <button
        className="dropdown-toggle-status"
        onClick={() => setOpen(!open)}
      >
        {title} <FaChevronDown />
      </button>

      {open && (
        <div className="dropdown-content">
          {options.map((opt, index) => (
            <button
              key={index}
              className="btn-action status-action"
              onClick={() => {
                setOpen(false);
                opt.onClick();
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BotonDesplegable;
