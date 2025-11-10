import React from "react";

const CardReutilizable = ({ title, children, className = "" }) => {
  return (
    <div className={`card-wrapper ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default CardReutilizable;
