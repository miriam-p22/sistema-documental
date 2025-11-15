import React, { Component } from "react";
import "../styles/Usuarios.css";

import BotonReutilizable from "../components/BotonReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import TablaReutilizable from "../components/TablaReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import FormularioUsuario from "../components/FormularioUsuario";
import FormularioPrivilegios from "../components/FormularioPrivilegios";
import EtiquetaEstado from "../components/EtiquetaEstado";
import BotonDesplegable from "../components/BotonDesplegable";

// Datos de ejemplo
const initialUsers = [
  { id: 1, nombre: 'Jacob Pérez', numTrabajador: '012', correo: 'jacob@ejemplo.com', usuario: 'Jacob', adscripcion: 'Ley Archivo', estatus: 'Activo' },
  { id: 2, nombre: 'Melissa López', numTrabajador: '003', correo: 'melissa@ejemplo.com', usuario: 'Melissa', adscripcion: 'Oficialía de Partes', estatus: 'Inactivo' },
  { id: 3, nombre: 'John Carreon', numTrabajador: '010', correo: 'john@ejemplo.com', usuario: 'John', adscripcion: 'Turismo y Cultura', estatus: 'Activo' },
  { id: 4, nombre: 'Sofía Martínez', numTrabajador: '125', correo: 'smartinez@ejemplo.com', usuario: 'SMartinez', adscripcion: 'Presidencia municipal', estatus: 'Activo' },
  { id: 5, nombre: 'Carlos Ruiz', numTrabajador: '045', correo: 'cruiz@ejemplo.com', usuario: 'CRuiz', adscripcion: 'Contraloria', estatus: 'Inactivo' },
  { id: 6, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
];

class Usuarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: initialUsers,
      searchTerm: "",
      isModalAddOpen: false,
      isModalEditOpen: false,
      isModalPrivilegesOpen: false,
      currentUser: {},
      privilegeData: {},
    };
  }

  // ------------------------------
  // Métodos SIN hooks
  // ------------------------------

  openAddModal = () => {
    this.setState({ currentUser: { adscripcion: "Ninguno" }, isModalAddOpen: true });
  };

  openEditModal = (user) => {
    this.setState({ currentUser: user, isModalEditOpen: true });
  };

  handleUserInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      currentUser: { ...prev.currentUser, [name]: value },
    }));
  };

  handlePrivilegeInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      privilegeData: { ...prev.privilegeData, [name]: value },
    }));
  };

  handleAddUser = () => {
    const newUser = {
      ...this.state.currentUser,
      id: Date.now(),
      estatus: "Activo",
    };

    this.setState((prev) => ({
      users: [...prev.users, newUser],
      isModalAddOpen: false,
    }));
  };

  handleEditUser = () => {
    this.setState((prev) => ({
      users: prev.users.map((u) =>
        u.id === prev.currentUser.id ? prev.currentUser : u
      ),
      isModalEditOpen: false,
    }));
  };

  handleStatusChange = (userId, newStatus) => {
    this.setState((prev) => ({
      users: prev.users.map((u) =>
        u.id === userId ? { ...u, estatus: newStatus } : u
      ),
    }));
  };

  handleApplyPrivilege = () => {
    console.log("Privilegio aplicado:", this.state.privilegeData.privilegio);
    this.setState({ isModalPrivilegesOpen: false });
  };

getStatusOptions = (userId) => [
  {
    label: (
      <span>
        <i className="fas fa-check-circle"></i> Activo
      </span>
    ),
    statusClass: "status-active",   // ← VERDE
    onClick: () => this.handleStatusChange(userId, "Activo"),
  },
  {
    label: (
      <span>
        <i className="fas fa-times-circle"></i> Inactivo
      </span>
    ),
    statusClass: "status-inactive", // ← ROJO
    onClick: () => this.handleStatusChange(userId, "Inactivo"),
  },
];


  render() {
    const {
      users,
      searchTerm,
      isModalAddOpen,
      isModalEditOpen,
      isModalPrivilegesOpen,
      currentUser,
      privilegeData,
    } = this.state;

    const columns = [
      "Nombre",
      "Num. Trabajador",
      "Correo Electrónico",
      "Usuario",
      "Adscripción",
      "Estatus",
      "Acciones",
    ];

    const filteredUsers = users.filter((u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableData = filteredUsers.map((user) => ({
      Nombre: { main: user.nombre },
      "Num. Trabajador": { main: user.numTrabajador },
      "Correo Electrónico": { main: user.correo },
      Usuario: { main: user.usuario },
      Adscripción: { main: user.adscripcion },
      Estatus: { main: <EtiquetaEstado estatus={user.estatus} /> },
      Acciones: {
        main: (
          <div className="actions-cell">
            <BotonReutilizable
              className="btn-action edit"
              title="Editar Usuario"
              onClick={() => this.openEditModal(user)}
            >
              Editar
            </BotonReutilizable>

            <BotonDesplegable
              title="Estado"
              options={this.getStatusOptions(user.id)}
            />
          </div>
        ),
      },
    }));

    return (
      <div className="main-content-wrapper">
        <main className="content-area">
          <section className="content-section">
            <div className="table-container">
              <h2 className="card-title">Gestión de Usuarios</h2>

              <div className="management-buttons-container">
                <BotonReutilizable onClick={this.openAddModal}>
                  Agregar Usuario
                </BotonReutilizable>

                <BotonReutilizable
                  onClick={() => this.setState({ isModalPrivilegesOpen: true })}
                  className="btn-privileges-override"
                >
                  Otorgar Privilegios
                </BotonReutilizable>
              </div>

              <div className="search-filter-container">
                <FiltroBusqueda
                  value={searchTerm}
                  onChange={(e) =>
                    this.setState({ searchTerm: e.target.value })
                  }
                  placeholder="Buscar usuario por nombre..."
                />
              </div>

              <TablaReutilizable columns={columns} data={tableData} />
            </div>
          </section>
        </main>

        {/* Modales */}
        <ModalReutilizable
          id="modalInsertarUsuario"
          title="Agregar Usuario"
          isOpen={isModalAddOpen}
          onClose={() => this.setState({ isModalAddOpen: false })}
          onAccept={this.handleAddUser}
        >
          <FormularioUsuario
            userData={currentUser}
            onInputChange={this.handleUserInputChange}
          />
        </ModalReutilizable>

        <ModalReutilizable
          id="modalEditarUsuario"
          title="Editar Usuario"
          isOpen={isModalEditOpen}
          onClose={() => this.setState({ isModalEditOpen: false })}
          onAccept={this.handleEditUser}
          acceptButtonText="Guardar"
        >
          <FormularioUsuario
            userData={currentUser}
            onInputChange={this.handleUserInputChange}
            isEdit={true}
          />
        </ModalReutilizable>

        <ModalReutilizable
          id="modalOtorgarPrivilegios"
          title="Otorgar Privilegios"
          isOpen={isModalPrivilegesOpen}
          onClose={() => this.setState({ isModalPrivilegesOpen: false })}
          onAccept={this.handleApplyPrivilege}
          acceptButtonText="Aplicar"
        >
          <FormularioPrivilegios
            privilegioData={privilegeData}
            onInputChange={this.handlePrivilegeInputChange}
          />
        </ModalReutilizable>
      </div>
    );
  }
}

export default Usuarios;
