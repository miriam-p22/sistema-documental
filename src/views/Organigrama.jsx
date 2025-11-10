import React, { Component } from 'react';
import BotonReutilizable from '../components/BotonReutilizable';
import FiltroBusqueda from '../components/FiltroBusqueda';
import TablaReutilizable from '../components/TablaReutilizable';
import ModalReutilizable from '../components/ModalReutilizable';

class Organigrama extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organigramas: [],
      searchTerm: '',
      isModalCrearOpen: false,
      isModalAutorizarOpen: false,
      isModalVerOpen: false,
      organigramaActual: {},
    };
  }

  handleSearchChange = (e) => this.setState({ searchTerm: e.target.value });

  openModal = (modalName, org = {}) => {
    this.setState({ [modalName]: true, organigramaActual: org });
  };

  closeModal = (modalName) => {
    this.setState({ [modalName]: false });
  };

  render() {
    const { organigramas, searchTerm, isModalCrearOpen, isModalAutorizarOpen, isModalVerOpen } = this.state;
    const filtered = organigramas.filter((o) =>
      o.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = ['Título del Organigrama', 'Fecha de Solicitud', 'Fecha de Autorización', 'Acciones'];

    return (
      <div className="main-content-wrapper">
        <main className="content-area">
          <section className="content-section">
            <div className="table-container">
              <h2 className="card-title">Organigrama</h2>

              <div className="management-buttons-container">
                <BotonReutilizable onClick={() => this.openModal('isModalCrearOpen')}>
                  Crear Organigrama
                </BotonReutilizable>
              </div>

              <TablaReutilizable
                columns={columns}
                data={filtered}
                renderActions={(org) => (
                  <>
                    <button
                      className="btn-action edit"
                      onClick={() => this.openModal('isModalAutorizarOpen', org)}
                    >
                      Autorizar
                    </button>
                    <button
                      className="btn-action btn-blue"
                      onClick={() => this.openModal('isModalVerOpen', org)}
                    >
                      Ver
                    </button>
                  </>
                )}
              />
            </div>
          </section>
        </main>

        {/* MODALES */}
        <ModalReutilizable
          id="modalCrearOrganigrama"
          title="Nueva versión de organigrama"
          isOpen={isModalCrearOpen}
          onClose={() => this.closeModal('isModalCrearOpen')}
          onAccept={() => this.closeModal('isModalCrearOpen')}
          acceptButtonText="Crear"
        >
          <label className="field">
            <span>Título del organigrama</span>
            <input className="input" type="text" placeholder="Ej. Organigrama 2025–2028" />
          </label>
        </ModalReutilizable>

        <ModalReutilizable
          id="modalAutorizarOrganigrama"
          title="Autorizar organigrama"
          isOpen={isModalAutorizarOpen}
          onClose={() => this.closeModal('isModalAutorizarOpen')}
          onAccept={() => this.closeModal('isModalAutorizarOpen')}
          acceptButtonText="Solicitar"
        >
          <p>¿Desea solicitar la autorización del organigrama actual?</p>
        </ModalReutilizable>

        <ModalReutilizable
          id="modalVerOrganigrama"
          title="Organigrama autorizado"
          isOpen={isModalVerOpen}
          onClose={() => this.closeModal('isModalVerOpen')}
        >
          <div id="contenedorOrganigrama" style={{ minHeight: '300px' }}>
            <p>Vista del organigrama autorizado aquí.</p>
          </div>
        </ModalReutilizable>
      </div>
    );
  }
}

export default Organigrama;
