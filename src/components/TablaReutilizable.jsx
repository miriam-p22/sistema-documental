// src/components/TablaReutilizable.jsx
import React from "react";
import "../styles/TablaReutilizable.css";

const TablaReutilizable = ({ columns, data, renderRow, className }) => {
  return (
    <table className={className}>
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
            <td colSpan={columns.length} className="center-content">
              No hay datos para mostrar.
            </td>
          </tr>
        ) : renderRow ? (
          /** 👉 Modo personalizado (Dispersión) */
          data.map((row, index) => renderRow(row, index))
        ) : (
          /** 👉 Modo automático (Usuarios y otros) */
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cell = row[col];

                // Si la celda contiene {main, sub}
                if (cell && typeof cell === "object") {
                  return (
                    <td key={colIndex}>
                      <div>{cell.main}</div>
                      {cell.sub && (
                        <div className="sub-value">{cell.sub}</div>
                      )}
                    </td>
                  );
                }

                // Si es un valor simple
                return <td key={colIndex}>{cell || ""}</td>;
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablaReutilizable;
