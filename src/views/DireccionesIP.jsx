import React, { useState } from "react";
import Card from "../components/Card";
import BotonReutilizable from "../components/BotonReutilizable";
import TablaReutilizable from "../components/TablaReutilizable";
import RegistroIP from "../components/RegistroIP";
import "../styles/DireccionesIP.css";

const DireccionesIp = () => {
  const [ips, setIps] = useState([
    { id: 1, adscripcion: "Ley de Archivo", ip: "192.168.1.10" },
    { id: 2, adscripcion: "Cultura y Turismo", ip: "192.168.1.10" },
    { id: 3, adscripcion: "Oficialía de Partes", ip: "192.168.1.11" },
    { id: 4, adscripcion: "Obras Públicas", ip: "192.168.1.12" },
    { id: 5, adscripcion: "Finanzas", ip: "192.168.1.13" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgregar = () => {
    setIsModalOpen(true);
  };

  const handleEliminar = (id) => {
    setIps(ips.filter((i) => i.id !== id));
  };

  const handleRegister = (newIP) => {
    setIps((prev) => [
      ...prev,
      { id: Date.now(), ...newIP },
    ]);
  };

  return (
    <Card title="Direcciones IP" className="card-direcciones-ip">

      {/* Botón agregar */}
      <div className="btn-agregar-ip-wrapper">
        <BotonReutilizable onClick={handleAgregar}>
          + Agregar
        </BotonReutilizable>
      </div>

      {/* Tabla */}
      <TablaReutilizable
        columns={["Adscripción", "Dirección IP", "Acciones"]}
        data={ips}
        renderRow={(row, index) => (
          <tr key={row.id || index}>
            <td>{row.adscripcion}</td>
            <td>{row.ip}</td>
            <td>
              <BotonReutilizable
                className="btn-action delete"
                onClick={() => handleEliminar(row.id)}
              >
                Eliminar
              </BotonReutilizable>
            </td>
          </tr>
        )}
      />

      {/* Modal de registro */}
      <RegistroIP
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegister}
      />

    </Card>
  );
};

export default DireccionesIp;
