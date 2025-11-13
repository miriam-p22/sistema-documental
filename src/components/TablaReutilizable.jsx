import React from "react";
import "../styles/TablaReutilizable.css";

const TablaReutilizable = ({ columns, data }) => {
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
            <td colSpan={columns.length} className="center-content">
              No hay datos para mostrar.
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablaReutilizable;
