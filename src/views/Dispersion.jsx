import React, { Component } from "react";
import "../styles/Dispersion.css";
import TablaReutilizable from "../components/TablaReutilizable";
import BotonReutilizable from "../components/BotonReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import EtiquetaEstado from "../components/EtiquetaEstado";
import Card from "../components/Card";
import VisorDocumento from "../components/VisorDocumento";
import GrupoEntrada from "../components/GrupoEntrada";
import CheckboxArea from "../components/CheckboxArea";
import DropdownReutilizable from "../components/DropdownReutilizable";

// --- Datos Mock ---
const initialData = [
  { id: 1, asunto: "Solicitud para iniciar obras en la vía pública.", numOficio: "Oficio No. 001/2025/DG", tipo: "Notificación de trabajos.pdf", fRecepcion: "20-09-2025", fAsignacion: "20-09-2025", fRespuesta: "21-09-2025", estatus: "Turnado", detalle: "Notificación de Trabajos sobre el Derecho de Vía" },
  { id: 3, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "Respondido", detalle: "Permiso para evento deportivo en plaza central" },
  { id: 4, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "Vencido", detalle: "Permiso para evento deportivo en plaza central" },
  { id: 4, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "En proceso", detalle: "Permiso para evento deportivo en plaza central" },
];

const initialRespuestas = [
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
];

const estatusOptions = [
  { label: "Mostrar Todos", status: "all" },
  { label: "Turnado", status: "Turnado" },
  { label: "En proceso", status: "En proceso" },
  { label: "Respondido", status: "Respondido" },
  { label: "Vencido", status: "Vencido" },
];

const areas = ["Presidencia", "Secretaría Técnica", "Jurídico", "Ley de Archivo"];

class Dispersion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: initialData,
      searchQuery: "",
      activeFilter: "all",
      selectedDocument: null,
      formState: {
        asunto: "",
        fechalimite: "",
        areasDestino: [],
      },
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.setFormState = this.setFormState.bind(this);
    this.renderDocumentoRow = this.renderDocumentoRow.bind(this);
    this.renderRespuestaRow = this.renderRespuestaRow.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  setSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  setActiveFilter(filter) {
    this.setState({ activeFilter: filter });
  }

  setFormState(newState) {
    this.setState((prevState) => ({
      formState: { ...prevState.formState, ...newState },
    }));
  }

  filterData() {
    const { data, searchQuery, activeFilter } = this.state;

    return data.filter((doc) => {
      const matchesSearch =
        doc.asunto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.numOficio &&
          doc.numOficio.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        activeFilter === "all" || doc.estatus === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }

  handleRowClick(doc) {
    this.setState({
      selectedDocument: doc,
      formState: {
        ...this.state.formState,
        asunto: doc.detalle,
        fechalimite: "",
        areasDestino: [],
      },
    });
  }

  handleAreaChange(area) {
    this.setState((prevState) => {
      const newAreas = prevState.formState.areasDestino.includes(area)
        ? prevState.formState.areasDestino.filter((a) => a !== area)
        : [...prevState.formState.areasDestino, area];

      return {
        formState: { ...prevState.formState, areasDestino: newAreas },
      };
    });
  }

  renderDocumentoRow(doc) {
    const { selectedDocument } = this.state;

    return (
      <tr
        key={doc.id}
        onClick={() => this.handleRowClick(doc)}
        className={
          selectedDocument && selectedDocument.id === doc.id
            ? "selected-row"
            : ""
        }
      >
        <td>
          <div className="asunto-container">
            <div className="asunto-text">{doc.asunto}</div>
            {doc.numOficio && (
              <div className="num-oficio-text">{doc.numOficio}</div>
            )}
          </div>
        </td>
        <td>{doc.tipo}</td>
        <td>{doc.fRecepcion}</td>
        <td>{doc.fAsignacion}</td>
        <td>{doc.fRespuesta}</td>
        <td>
          <EtiquetaEstado estatus={doc.estatus} />
        </td>
      </tr>
    );
  }

  renderRespuestaRow(resp) {
    return (
      <tr key={resp.documento}>
        <td>{resp.documento}</td>
        <td>{resp.respuesta}</td>
        <td>{resp.fechaEntrega}</td>
      </tr>
    );
  }

  render() {
    const { selectedDocument, formState, activeFilter } = this.state;
    const filteredData = this.filterData();

    return (
      <main className="content-area">
        <div className="main-layout">
          <Card title="Correspondencia" className="table-component">
            <div className="toolbar-container">
              <FiltroBusqueda
                onSearch={this.setSearchQuery}
                placeholder="Buscar por Asunto o No. Oficio..."
              />

              <DropdownReutilizable
                title="Filtrar por Estatus"
                options={estatusOptions}
                onFilterChange={this.setActiveFilter}
                activeFilter={activeFilter}
              />
            </div>

            {/* TABLA PRINCIPAL */}
            <div className="tabla-wrapper">
              <TablaReutilizable
                columns={[
                  "Asunto/Num. Oficio",
                  "Tipo de Documento",
                  "Fecha Recepción",
                  "Fecha Asignación",
                  "Fecha Respuesta",
                  "Estatus",
                ]}
                data={filteredData}
                renderRow={this.renderDocumentoRow}
                className="tabla-principal"
              />
            </div>

            <hr className="divider" />
            <h2 className="card-title">Respuestas y Entregas</h2>

            <div className="button-group-top">
              <BotonReutilizable className="btn-accion">
                Recibí Respuesta
              </BotonReutilizable>
              <BotonReutilizable className="btn-accion">
                Entregué Respuesta
              </BotonReutilizable>
            </div>

            <div className="tabla-wrapper">
              <TablaReutilizable
                columns={[
                  "Documentos",
                  "Respuesta Recibida",
                  "Fecha de Entrega",
                ]}
                data={initialRespuestas}
                renderRow={this.renderRespuestaRow}
                className="tabla-respuestas"
              />
            </div>
          </Card>

          {/* FORMULARIO */}
          <Card className="form-component">
            <h2>
              {selectedDocument
                ? selectedDocument.detalle
                : "Seleccione un documento para dispersar"}
            </h2>

            <VisorDocumento
              documentUrl={
                selectedDocument ? `/docs/${selectedDocument.tipo}` : null
              }
              documentTitle={selectedDocument ? selectedDocument.detalle : null}
            />

            <GrupoEntrada label="Asunto:" id="asunto">
              <textarea
                id="asunto"
                rows="2"
                placeholder="Escribe el asunto..."
                value={formState.asunto}
                onChange={(e) =>
                  this.setFormState({ asunto: e.target.value })
                }
              />
            </GrupoEntrada>

            <GrupoEntrada label="Fecha límite" id="fechalimite">
              <input
                type="text"
                id="fechalimite"
                placeholder="Fecha límite"
                value={formState.fechalimite}
                onChange={(e) =>
                  this.setFormState({ fechalimite: e.target.value })
                }
              />
            </GrupoEntrada>

            <div className="form-group">
              <label>Área de Destino</label>
              <div id="area-checkboxes" className="checkbox-group">
                {areas.map((area) => (
                  <CheckboxArea
                    key={area}
                    areaName={area}
                    isChecked={formState.areasDestino.includes(area)}
                    onChange={() => this.handleAreaChange(area)}
                  />
                ))}
              </div>
            </div>

            <BotonReutilizable
              className="btn-confirmar"
              onClick={() =>
                console.log("Confirmar Dispersión", formState)
              }
            >
              Confirmar Dispersión
            </BotonReutilizable>
          </Card>
        </div>
      </main>
    );
  }
}

export default Dispersion;
