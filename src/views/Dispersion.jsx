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
  { id: 5, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "En proceso", detalle: "Permiso para evento deportivo en plaza central" },
];

const initialRespuestas = [
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

  // --- Setters del estado ---
  setSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  setActiveFilter(filter) {
    this.setState({ activeFilter: filter });
  }

  setFormState(newState) {
    this.setState(prevState => ({
      formState: { ...prevState.formState, ...newState }
    }));
  }

  // --- Filtrado ---
  filterData() {
    const { data, searchQuery, activeFilter } = this.state;
    return data.filter((doc) => {
      const matchesSearch =
        doc.asunto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.numOficio?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = activeFilter === "all" || doc.estatus === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }

  // --- Al seleccionar fila ---
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
    this.setState(prev => {
      const updated = prev.formState.areasDestino.includes(area)
        ? prev.formState.areasDestino.filter(a => a !== area)
        : [...prev.formState.areasDestino, area];

      return {
        formState: { ...prev.formState, areasDestino: updated }
      };
    });
  }

  // --- Renderizar filas ---
  renderDocumentoRow(doc) {
    const selected = this.state.selectedDocument?.id === doc.id;

    return (
      <tr
        key={doc.id}
        className={selected ? "selected-row" : ""}
        onClick={() => this.handleRowClick(doc)}
      >
        <td>
          <div className="asunto-container">
            <div className="asunto-text">{doc.asunto}</div>
            {doc.numOficio && <div className="num-oficio-text">{doc.numOficio}</div>}
          </div>
        </td>
        <td>{doc.tipo}</td>
        <td>{doc.fRecepcion}</td>
        <td>{doc.fAsignacion}</td>
        <td>{doc.fRespuesta}</td>
        <td><EtiquetaEstado estatus={doc.estatus} /></td>
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

  // --- Render principal ---
  render() {
    const { selectedDocument, formState, activeFilter } = this.state;
    const filteredData = this.filterData();

    return (
      <main className="content-area">
        <div className="main-layout">

          {/* ---------- TABLA PRINCIPAL ---------- */}
          <Card title="Correspondencia" className="table-component">

            <div className="toolbar-container">
              <FiltroBusqueda
                value={this.state.searchQuery}
                onChange={(e) => this.setSearchQuery(e.target.value)}
                placeholder="Buscar por Asunto o No. Oficio..."
              />

              <DropdownReutilizable
                label="Filtrar por Estatus"
                options={estatusOptions}
                value={activeFilter}
                onChange={(v) => this.setActiveFilter(v)}
              />
            </div>

            <div className="tabla-wrapper">
              <TablaReutilizable
                columns={[
                  "Asunto/Num. Oficio",
                  "Tipo de Documento",
                  "Fecha Recepción",
                  "Fecha Asignada",
                  "Fecha Respuesta",
                  "Estatus"
                ]}
                data={filteredData}
                renderRow={this.renderDocumentoRow}
              />
            </div>

            {/* ---------- RESPUESTAS ---------- */}
            <hr className="divider" />
            <h2 className="card-title">Respuestas y Entregas</h2>

            <div className="button-group-top">
              <BotonReutilizable>Recibí Respuesta</BotonReutilizable>
              <BotonReutilizable>Entregué Respuesta</BotonReutilizable>
            </div>

            <div className="tabla-wrapper">
              <TablaReutilizable
                columns={["Documentos", "Respuesta Recibida", "Fecha de Entrega"]}
                data={initialRespuestas}
                renderRow={this.renderRespuestaRow}
              />
            </div>

          </Card>

          {/* ---------- FORMULARIO DE DISPERSIÓN ---------- */}
          <Card className="form-component">
            <h2>{selectedDocument ? selectedDocument.detalle : "Seleccione un documento para dispersar"}</h2>

            <VisorDocumento
              documentUrl={selectedDocument ? `/docs/${selectedDocument.tipo}` : null}
              documentTitle={selectedDocument ? selectedDocument.detalle : null}
            />

            <GrupoEntrada label="Asunto:" id="asunto">
              <textarea
                id="asunto"
                rows="2"
                placeholder="Escribe el asunto..."
                value={formState.asunto}
                onChange={(e) => this.setFormState({ asunto: e.target.value })}
              />
            </GrupoEntrada>

            <GrupoEntrada label="Fecha límite" id="fechalimite">
              <input
                id="fechalimite"
                type="text"
                placeholder="Fecha límite"
                value={formState.fechalimite}
                onChange={(e) => this.setFormState({ fechalimite: e.target.value })}
              />
            </GrupoEntrada>

            <div className="form-group">
              <label>Área de Destino</label>
              <div className="checkbox-group">
                {areas.map(area => (
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
              onClick={() => console.log("Confirmar Dispersión:", formState)}
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
