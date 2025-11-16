import React, { Component } from "react";

import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import EtiquetaEstado from "../components/EtiquetaEstado";
import BotonReutilizable from "../components/BotonReutilizable";
import BotonDesplegable from "../components/BotonDesplegable";
import ModalReutilizable from "../components/ModalReutilizable";
import VisorDocumento from "../components/VisorDocumento";
import CampoFormulario from "../components/CampoFormulario";

// ---------------- DATOS SIMULADOS ----------------
const initialDocs = [
  {
    id: 1,
    numOficio: "OF-2025-001",
    titulo: "Acta constitutiva",
    estado: "Recibido",
    fechaLimite: "2025-11-10",
    tiempo: "2 días",
    archivo: "acta.pdf"
  },
  {
    id: 2,
    numOficio: "OF-2025-002",
    titulo: "Reporte 2024",
    estado: "Recibido",
    fechaLimite: "2025-11-03",
    tiempo: "Vencido",
    archivo: "reporte2024.pdf"
  },
  {
    id: 3,
    numOficio: "OF-2025-003",
    titulo: "Oficio de Presidencia",
    estado: "Pendiente",
    fechaLimite: "2025-10-25",
    tiempo: "1 día",
    archivo: "presidencia.pdf"
  },
];

class Documentos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      documentos: initialDocs,
      searchQuery: "",
      selectedDoc: null,

      // Modales
      isModalVerOpen: false,
      isModalEstadoOpen: false,
      isModalRespuestaOpen: false,

      // Formulario Respuesta
      comentarioRespuesta: "",
      estadoSeleccionado: "Recibido",
    };

    this.renderRow = this.renderRow.bind(this);
  }

  // ------------------ FILTROS ------------------
  
  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  // ------------------ ACCIONES ------------------

  abrirVer(doc) {
    this.setState({
      selectedDoc: doc,
      isModalVerOpen: true
    });
  }

  abrirEstado(doc) {
    this.setState({
      selectedDoc: doc,
      estadoSeleccionado: doc.estado,
      isModalEstadoOpen: true
    });
  }

  abrirRespuesta(doc) {
    this.setState({
      selectedDoc: doc,
      comentarioRespuesta: "",
      isModalRespuestaOpen: true
    });
  }

  cambiarEstadoDocumento() {
    this.setState(prev => ({
      documentos: prev.documentos.map(d =>
        d.id === prev.selectedDoc.id
          ? { ...d, estado: prev.estadoSeleccionado }
          : d
      ),
      isModalEstadoOpen: false
    }));
  }

  enviarRespuesta() {
    console.log("Documento respondido:", {
      documento: this.state.selectedDoc,
      comentario: this.state.comentarioRespuesta
    });

    this.setState({ isModalRespuestaOpen: false });
  }

  // ------------------ FILTROS ------------------
  getFilteredDocs() {
    const { documentos, searchQuery } = this.state;

    return documentos.filter(doc =>
      doc.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.numOficio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ------------------ TABLA: FILAS PERSONALIZADAS ------------------
  renderRow(doc) {
    return (
      <tr key={doc.id}>
        <td>{doc.numOficio}</td>
        <td>{doc.titulo}</td>
        <td><EtiquetaEstado estatus={doc.estado} /></td>
        <td>{doc.tiempo}</td>

        <td>
          <div className="actions-cell">
            <BotonReutilizable
              className="btn-action edit"
              onClick={() => this.abrirVer(doc)}
            >
              Ver
            </BotonReutilizable>

            <BotonReutilizable
              className="btn-action btn-blue"
              onClick={() => this.abrirEstado(doc)}
            >
              Estado
            </BotonReutilizable>

            <BotonReutilizable
              className="btn-action btn-gray"
              onClick={() => this.abrirRespuesta(doc)}
            >
              Respuesta
            </BotonReutilizable>
          </div>
        </td>
      </tr>
    );
  }

  // ------------------ RENDER ------------------
  render() {
    const { selectedDoc } = this.state;

    return (
      <main className="content-area">
        <section className="content-section">
          <h2 className="card-title">Gestión Documental</h2>

          <Card className="table-component">

            {/* BUSCADOR */}
            <div className="toolbar-container">
              <FiltroBusqueda
                value={this.state.searchQuery}
                onChange={(e) => this.setSearchQuery(e.target.value)}
                placeholder="Buscar por título o número de oficio..."
              />
            </div>

            {/* TABLA */}
            <TablaReutilizable
              columns={[
                "Número de Oficio",
                "Título",
                "Estado",
                "Tiempo de respuesta",
                "Acciones",
              ]}
              data={this.getFilteredDocs()}
              renderRow={this.renderRow}
            />

          </Card>
        </section>

        {/* ---------------- MODAL VER ---------------- */}
        <ModalReutilizable
          title="Visualización del documento"
          isOpen={this.state.isModalVerOpen}
          onClose={() => this.setState({ isModalVerOpen: false })}
          onAccept={() => this.setState({ isModalVerOpen: false })}
          acceptButtonText="Cerrar"
        >
          <VisorDocumento
            documentUrl={selectedDoc ? `/docs/${selectedDoc.archivo}` : null}
            documentTitle={selectedDoc ? selectedDoc.titulo : ""}
          />
        </ModalReutilizable>

        {/* ---------------- MODAL ESTADO ---------------- */}
        <ModalReutilizable
          title="Cambiar estado del documento"
          isOpen={this.state.isModalEstadoOpen}
          onClose={() => this.setState({ isModalEstadoOpen: false })}
          onAccept={() => this.cambiarEstadoDocumento()}
          acceptButtonText="Actualizar estado"
        >
          <CampoFormulario
            label="Estado del documento"
            isSelect
            value={this.state.estadoSeleccionado}
            onChange={(e) => this.setState({ estadoSeleccionado: e.target.value })}
          >
            <option value="Recibido">Recibido</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Devuelto">Devuelto</option>
          </CampoFormulario>
        </ModalReutilizable>

        {/* ---------------- MODAL RESPUESTA ---------------- */}
        <ModalReutilizable
          title="Entregar respuesta"
          isOpen={this.state.isModalRespuestaOpen}
          onClose={() => this.setState({ isModalRespuestaOpen: false })}
          onAccept={() => this.enviarRespuesta()}
          acceptButtonText="Enviar"
        >
          <p><strong>Fecha de envío:</strong> {new Date().toLocaleDateString()}</p>

          <CampoFormulario
            label="Comentario (opcional)"
            type="text"
            value={this.state.comentarioRespuesta}
            onChange={(e) => this.setState({ comentarioRespuesta: e.target.value })}
            placeholder="Agrega un comentario..."
          />
        </ModalReutilizable>

      </main>
    );
  }
}

export default Documentos;
