import React, { useState } from "react";
import Layout from "../components/Layout";
import CardReutilizable from "../components/CardReutilizable";
import TablaReutilizable from "../components/TablaReutilizable";
import BotonReutilizable from "../components/BotonReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import CampoFormulario from "../components/CampoFormulario";

const Organigrama = () => {
  const [modalCrear, setModalCrear] = useState(false);
  const [modalAutorizar, setModalAutorizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [vista, setVista] = useState("principal");
  const [organigramas] = useState([]);
  const [areas] = useState([]);

  // Columnas para la tabla 
  const columnasOrganigrama = [
    "Título del organigrama",
    "Fecha de autorización",
    "Fecha de caducidad",
    "Acciones",
  ];

  const columnasAreas = ["Área", "Nivel", "Área superior"];

  return (
    <Layout>
      {/* Vista principal */}
      {vista === "principal" && (
        <CardReutilizable title="Organigrama">
          <div className="acciones">
            <BotonReutilizable onClick={() => setModalCrear(true)}>
              Crear
            </BotonReutilizable>
          </div>

          <div style={{ overflowX: "auto", background: "#fff", padding: "10px", borderRadius: "8px" }}>
            <TablaReutilizable columns={columnasOrganigrama} data={organigramas} />
          </div>

          <ModalReutilizable
            id="modalCrearOrganigrama"
            title="Nueva versión de organigrama"
            isOpen={modalCrear}
            onClose={() => setModalCrear(false)}
            onAccept={() => setModalCrear(false)}
            acceptButtonText="Crear"
          >
            <CampoFormulario
              label="Título del organigrama"
              placeholder="Ej. Organigrama 2025–2028"
              required
            />
          </ModalReutilizable>
        </CardReutilizable>
      )}

      {/* Vista añadir areas */}
      {vista === "gestion" && (
        <CardReutilizable title="Gestión Organizacional">
          <div className="acciones">
            <BotonReutilizable onClick={() => setModalInsertar(true)}>
              Agregar áreas
            </BotonReutilizable>
            <BotonReutilizable onClick={() => setModalAutorizar(true)}>
              Autorizar
            </BotonReutilizable>
            <BotonReutilizable className="ghost" onClick={() => setVista("principal")}>
              Regresar
            </BotonReutilizable>
          </div>

          {/* Tabla Reutilizable (sin datos) */}
          <div style={{ overflowX: "auto", background: "#fff", padding: "10px", borderRadius: "8px" }}>
            <TablaReutilizable columns={columnasAreas} data={areas} />
          </div>
        </CardReutilizable>
      )}

      {/* Modal Autorizar */}
      <ModalReutilizable
        id="modalAutorizarOrganigrama"
        title="Autorizar organigrama"
        isOpen={modalAutorizar}
        onClose={() => setModalAutorizar(false)}
        onAccept={() => setModalAutorizar(false)}
        acceptButtonText="Solicitar"
      >
        <p>¿Desea solicitar la autorización del organigrama actual?</p>
      </ModalReutilizable>

      {/* Modal Insertar Área */}
      <ModalReutilizable
        id="modalInsertarArea"
        title="Agregar área"
        isOpen={modalInsertar}
        onClose={() => setModalInsertar(false)}
        onAccept={() => setModalInsertar(false)}
        acceptButtonText="Agregar"
      >
        <div className="grid two">
          <CampoFormulario label="Nombre del área" placeholder="Ej. Secretaría Técnica" />
          <CampoFormulario label="Nivel" isSelect>
            <option value="">Selecciona...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </CampoFormulario>
          <CampoFormulario label="Área superior" isSelect>
            <option value="Presidencia Municipal">Presidencia Municipal</option>
            <option value="Secretaría Técnica">Secretaría Técnica</option>
          </CampoFormulario>
        </div>
      </ModalReutilizable>

      {/* Modal Ver Organigrama */}
      <ModalReutilizable
        id="modalVerOrganigrama"
        title="Organigrama autorizado"
        isOpen={modalVer}
        onClose={() => setModalVer(false)}
        onAccept={() => setModalVer(false)}
        acceptButtonText="Cerrar"
      >
        <div className="organigrama-contenedor">
          <p>Aquí se mostrará la estructura del organigrama autorizado.</p>
        </div>
      </ModalReutilizable>
    </Layout>
  );
};

export default Organigrama;
