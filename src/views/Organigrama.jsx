import React, { Component } from "react";
import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import BotonReutilizable from "../components/BotonReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import CampoFormulario from "../components/CampoFormulario";
import ArbolOrganigrama from "../components/ArbolOrganigrama";

// Datos simulados
const organigramasMock = [
  {
    id: 1,
    titulo: "Organigrama 2024–2027",
    fechaSolicitud: "05-01-2025",
    fechaAutorizacion: "Pendiente",
  },
  {
    id: 2,
    titulo: "Organigrama 2021–2024",
    fechaSolicitud: "01-06-2021",
    fechaAutorizacion: "10-08-2021",
  },
  {
    id: 3,
    titulo: "Organigrama 2018–2021",
    fechaSolicitud: "10-05-2018",
    fechaAutorizacion: "15-07-2018",
  },
  {
    id: 4,
    titulo: "Organigrama 2015–2018",
    fechaSolicitud: "15-04-2015",
    fechaAutorizacion: "01-07-2015",
  },
];

const areasMock = [
  // Simulacion de datos para mostrar organigrama
  { area: "Presidencia Municipal", nivel: 1, superior: "-" },
  {
    area: "Dirección de Obras Públicas",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Desarrollo Urbano",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Desarrollo Social",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Cultura y Deporte",
    nivel: 2,
    superior: "Presidencia Municipal",
  },

  {
    area: "Coordinación de Programas Sociales",
    nivel: 3,
    superior: "Dirección de Desarrollo Social",
  },
  {
    area: "Departamento de Atención Ciudadana",
    nivel: 3,
    superior: "Dirección de Desarrollo Social",
  },
];

class Organigrama extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organigramas: organigramasMock,
      gestionAreas: areasMock,

      searchQuery: "",
      selectedOrg: null,

      mostrarGestion: false,

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
    this.gestionOrganizacionalRef = React.createRef();
  }

  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  getFilteredOrganigramas() {
    const { organigramas, searchQuery } = this.state;

    return organigramas.filter((o) =>
      o.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  //Acciones
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
      isModalInsertarAreaOpen: true,
    });
  }

  irAGestion(org) {
    this.setState({ selectedOrg: org }, () => {
      if (this.gestionOrganizacionalRef.current) {
        this.gestionOrganizacionalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  crearOrganigrama() {
    const newOrg = {
      id: Date.now(),
      titulo: this.state.nuevoTitulo,
      fechaSolicitud: "Pendiente",
      fechaAutorizacion: "Pendiente",
    };

    this.setState((prev) => ({
      organigramas: [...prev.organigramas, newOrg],
      isModalCrearOpen: false,
    }));
  }

  autorizarOrganigrama() {
    this.setState({ isModalAutorizarOpen: false });
  }

  agregarArea() {
    const nueva = {
      area: this.state.nuevaArea,
      nivel: this.state.nuevoNivel,
      superior: this.state.nuevaSuperior,
    };

    this.setState((prev) => ({
      gestionAreas: [...prev.gestionAreas, nueva],
      isModalInsertarAreaOpen: false,
    }));
  }

  renderOrganigramaRow(org) {
    const autorizado =
      org.fechaAutorizacion && org.fechaAutorizacion !== "Pendiente";

    return (
      <tr key={org.id}>
        <td>{org.titulo}</td>
        <td>{org.fechaSolicitud}</td>
        <td>{org.fechaAutorizacion}</td>

        <td>
          <div className="actions-cell">
            {!autorizado && (
              <BotonReutilizable
                className="btn-action edit"
                onClick={() => {
                  this.setState({ selectedOrg: org, mostrarGestion: true });
                }}
              >
                Editar
              </BotonReutilizable>
            )}
            {autorizado && (
              <BotonReutilizable
                className="btn-action status-active"
                onClick={() => this.abrirVer(org)}
              >
                Ver
              </BotonReutilizable>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // Tabla gestion areas
  renderAreaRow(area, index) {
    return (
      <tr key={index}>
        <td>{area.area}</td>
        <td>{area.nivel}</td>
        <td>{area.superior}</td>
      </tr>
    );
  }

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
                "Fecha de solicitud",
                "Fecha de autorización",
                "Acciones",
              ]}
              data={this.getFilteredOrganigramas()}
              renderRow={(item) => this.renderOrganigramaRow(item)}
            />
          </Card>

          {/* Gestion organizacional */}
          {this.state.mostrarGestion && (
            <>
              <h2 className="card-title" ref={this.gestionOrganizacionalRef}>
                Gestión organizacional
              </h2>

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
            </>
          )}
        </section>

        {/* Modal crear nueva version  */}
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

        {/* Modal ver organigrama autorizado*/}
        <ModalReutilizable
          title="Organigrama autorizado"
          isOpen={this.state.isModalVerOpen}
          onClose={() => this.setState({ isModalVerOpen: false })}
          onAccept={() => this.setState({ isModalVerOpen: false })}
          acceptButtonText="Cerrar"
          className="modal-organigrama"
        >
          <div className="organigrama-visual-container">
            <div className="organigrama-scroll-x">
              <ArbolOrganigrama areas={this.state.gestionAreas} />
            </div>
          </div>
        </ModalReutilizable>

        {/* Modal solicitar autorizacion */}
        <ModalReutilizable
          title="Autorizar organigrama"
          isOpen={this.state.isModalAutorizarOpen}
          onClose={() => this.setState({ isModalAutorizarOpen: false })}
          onAccept={() => this.autorizarOrganigrama()}
          acceptButtonText="Solicitar"
        >
          <p>¿Desea solicitar la autorización del organigrama actual?</p>
        </ModalReutilizable>

        {/* Modal agregar areas */}
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
