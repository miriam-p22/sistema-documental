// src/views/Organigrama.jsx
import React, { Component } from "react";
import "../styles/Organigrama.css";

import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import BotonReutilizable from "../components/BotonReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import CampoFormulario from "../components/CampoFormulario";

// ---------------- DATOS SIMULADOS ----------------
const organigramasMock = [
  { id: 1, titulo: "Organigrama 2024–2027", autorizacion: "Pendiente", caducidad: "Pendiente" },
  { id: 2, titulo: "Organigrama 2021–2024", autorizacion: "10-08-2021", caducidad: "10-08-2024" },
  { id: 3, titulo: "Organigrama 2018–2021", autorizacion: "15-07-2018", caducidad: "15-07-2021" },
  { id: 4, titulo: "Organigrama 2015–2018", autorizacion: "01-07-2015", caducidad: "01-07-2018" },
];

const areasMock = [
  { area: "Presidencia Municipal", nivel: 1, superior: "-" },
  { area: "H. Cabildo", nivel: 1, superior: "Presidencia Municipal" },
  { area: "Contraloría Municipal", nivel: 2, superior: "Presidencia Municipal" },
  { area: "Tesorería Municipal", nivel: 2, superior: "Presidencia Municipal" },
  { area: "Secretaría del Ayuntamiento", nivel: 2, superior: "Presidencia Municipal" },
  { area: "Secretaría Técnica", nivel: 2, superior: "Presidencia Municipal" },
  { area: "Dirección de Obras Públicas", nivel: 3, superior: "Secretaría Técnica" },
  { area: "Dirección de Desarrollo Urbano", nivel: 3, superior: "Secretaría Técnica" },
  { area: "Dirección de Cultura y Deporte", nivel: 3, superior: "Secretaría del Ayuntamiento" },
  { area: "Dirección de Desarrollo Social", nivel: 3, superior: "Secretaría Técnica" },
  { area: "Dirección de Protección Civil", nivel: 3, superior: "Secretaría Técnica" },
  { area: "Jefatura de Archivo y Control Documental", nivel: 4, superior: "Secretaría del Ayuntamiento" },
  { area: "Jefatura de Informática y Sistemas", nivel: 4, superior: "Secretaría Técnica" },
  { area: "Coordinación de Igualdad de Género", nivel: 4, superior: "Secretaría Técnica" },
];

class Organigrama extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organigramas: organigramasMock,
      gestionAreas: areasMock,

      searchQuery: "",
      selectedOrg: null,

      // Modales
      isModalCrearOpen: false,
      isModalVerOpen: false,
      isModalInsertarAreaOpen: false,
      isModalAutorizarOpen: false,

      // Formularios
      nuevoTitulo: "",
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
    };

    this.renderOrganigramaRow = this.renderOrganigramaRow.bind(this);
    this.renderAreaRow = this.renderAreaRow.bind(this);
  }

  // ----------------- FILTRO -----------------
  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  getFilteredOrganigramas() {
    const { organigramas, searchQuery } = this.state;

    return organigramas.filter(o =>
      o.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ----------------- ACCIONES -----------------
  abrirCrear() {
    this.setState({ nuevoTitulo: "", isModalCrearOpen: true });
  }

  abrirVer(org) {
    this.setState({ selectedOrg: org, isModalVerOpen: true });
  }

  abrirAutorizar() {
    this.setState({ isModalAutorizarOpen: true });
  }

  abrirInsertarArea() {
    this.setState({
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
      isModalInsertarAreaOpen: true
    });
  }

  crearOrganigrama() {
    const newOrg = {
      id: Date.now(),
      titulo: this.state.nuevoTitulo,
      autorizacion: "Pendiente",
      caducidad: "Pendiente"
    };

    this.setState(prev => ({
      organigramas: [...prev.organigramas, newOrg],
      isModalCrearOpen: false
    }));
  }

  autorizarOrganigrama() {
    this.setState({ isModalAutorizarOpen: false });
  }

  agregarArea() {
    const nueva = {
      area: this.state.nuevaArea,
      nivel: this.state.nuevoNivel,
      superior: this.state.nuevaSuperior
    };

    this.setState(prev => ({
      gestionAreas: [...prev.gestionAreas, nueva],
      isModalInsertarAreaOpen: false
    }));
  }

  // ----------------- TABLA ORGANIGRAMAS -----------------
  renderOrganigramaRow(org) {
    const autorizado = org.autorizacion !== "Pendiente";

    return (
      <tr key={org.id}>
        <td>{org.titulo}</td>
        <td>{org.autorizacion}</td>
        <td>{org.caducidad}</td>

        <td>
          <div className="actions-cell">

            {/* SI NO ESTÁ AUTORIZADO -> MOSTRAR EDITAR */}
            {!autorizado && (
              <BotonReutilizable
                className="btn-action edit"
                onClick={() => this.abrirCrear(org)}
              >
                Editar
              </BotonReutilizable>
            )}

            {/* SIEMPRE MOSTRAR VER */}
            <BotonReutilizable
              className="btn-action status-active"
              onClick={() => this.abrirVer(org)}
            >
              Ver
            </BotonReutilizable>
          </div>
        </td>
      </tr>
    );
  }

  // ----------------- TABLA GESTIÓN DE ÁREAS -----------------
  renderAreaRow(area, index) {
    return (
      <tr key={index}>
        <td>{area.area}</td>
        <td>{area.nivel}</td>
        <td>{area.superior}</td>
      </tr>
    );
  }

  // ----------------- VISTA -----------------
  render() {
    const { selectedOrg } = this.state;

    return (
      <main className="content-area">
        <section className="content-section">
          <h2 className="card-title">Organigrama</h2>

          {/* BOTÓN CREAR */}
          <div className="management-buttons-container">
            <BotonReutilizable onClick={() => this.abrirCrear()}>
              Crear Organigrama
            </BotonReutilizable>
          </div>

          {/* TABLA ORGANIGRAMAS */}
          <Card>
            <TablaReutilizable
              columns={[
                "Título del Organigrama",
                "Fecha de autorización",
                "Fecha de caducidad",
                "Acciones"
              ]}
              data={this.getFilteredOrganigramas()}
              renderRow={(item) => this.renderOrganigramaRow(item)}
            />
          </Card>

          {/* --------- SECCIÓN GESTIÓN ORGANIZACIONAL --------- */}
          <h2 className="card-title">Gestión organizacional</h2>

          <div className="management-buttons-container">
            <BotonReutilizable onClick={() => this.abrirInsertarArea()}>
              Agregar áreas
            </BotonReutilizable>

            <BotonReutilizable
              className="status-active"
              onClick={() => this.abrirAutorizar()}
            >
              Autorizar Organigrama
            </BotonReutilizable>
          </div>

          <Card>
            <TablaReutilizable
              columns={["Área", "Nivel", "Área superior"]}
              data={this.state.gestionAreas}
              renderRow={(item, index) => this.renderAreaRow(item, index)}
            />
          </Card>
        </section>

        {/* ---------------- MODAL CREAR ---------------- */}
        <ModalReutilizable
          title="Nueva versión de organigrama"
          isOpen={this.state.isModalCrearOpen}
          onClose={() => this.setState({ isModalCrearOpen: false })}
          onAccept={() => this.crearOrganigrama()}
          acceptButtonText="Crear"
        >
          <CampoFormulario
            label="Título del organigrama"
            value={this.state.nuevoTitulo}
            onChange={(e) => this.setState({ nuevoTitulo: e.target.value })}
            placeholder="Ej. Organigrama 2025–2028"
          />
        </ModalReutilizable>

        {/* ---------------- MODAL VER CON ORGANIGRAMA VISUAL ---------------- */}
        <ModalReutilizable
          title="Organigrama Autorizado"
          isOpen={this.state.isModalVerOpen}
          onClose={() => this.setState({ isModalVerOpen: false })}
          onAccept={() => this.setState({ isModalVerOpen: false })}
          acceptButtonText="Cerrar"
        >
          <div className="organigrama-visual-container">
            <img
              src="/imagenes/organigrama_demo.png"
              alt="Organigrama"
              style={{
                width: "100%",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
          </div>
        </ModalReutilizable>

        {/* ---------------- MODAL AUTORIZAR ---------------- */}
        <ModalReutilizable
          title="Autorizar organigrama"
          isOpen={this.state.isModalAutorizarOpen}
          onClose={() => this.setState({ isModalAutorizarOpen: false })}
          onAccept={() => this.autorizarOrganigrama()}
          acceptButtonText="Solicitar"
        >
          <p>¿Desea solicitar la autorización del organigrama actual?</p>
        </ModalReutilizable>

        {/* ---------------- MODAL INSERTAR ÁREA ---------------- */}
        <ModalReutilizable
          title="Agregar área"
          isOpen={this.state.isModalInsertarAreaOpen}
          onClose={() => this.setState({ isModalInsertarAreaOpen: false })}
          onAccept={() => this.agregarArea()}
          acceptButtonText="Agregar"
        >
          <CampoFormulario
            label="Nombre del área"
            value={this.state.nuevaArea}
            onChange={(e) => this.setState({ nuevaArea: e.target.value })}
            placeholder="Dirección de..."
          />

          <CampoFormulario
            label="Nivel"
            type="number"
            value={this.state.nuevoNivel}
            onChange={(e) => this.setState({ nuevoNivel: e.target.value })}
          />

          <CampoFormulario
            label="Área superior"
            value={this.state.nuevaSuperior}
            onChange={(e) => this.setState({ nuevaSuperior: e.target.value })}
            placeholder="Presidencia Municipal"
          />
        </ModalReutilizable>

      </main>
    );
  }
}

export default Organigrama;
