// src/views/Usuarios.jsx
import React, { Component } from 'react';
import '../styles/Usuarios.css'
import BotonReutilizable from '../components/BotonReutilizable';
import FiltroBusqueda from '../components/FiltroBusqueda';
import TablaReutilizable from '../components/TablaReutilizable';
import ModalReutilizable from '../components/ModalReutilizable';
import FormularioUsuario from '../components/FormularioUsuario';
import FormularioPrivilegios from '../components/FormularioPrivilegios';
import EtiquetaEstado from '../components/EtiquetaEstado';
import BotonDesplegable from '../components/BotonDesplegable';

const initialUsers = [
  { id: 1, nombre: 'Jacob Pérez', numTrabajador: '012', correo: 'jacob@ejemplo.com', usuario: 'Jacob', adscripcion: 'Ley Archivo', estatus: 'Activo' },
  { id: 2, nombre: 'Melissa López', numTrabajador: '003', correo: 'melissa@ejemplo.com', usuario: 'Melissa', adscripcion: 'Oficialía de Partes', estatus: 'Inactivo' },
  { id: 3, nombre: 'John Carreon', numTrabajador: '010', correo: 'john@ejemplo.com', usuario: 'John', adscripcion: 'Turismo y Cultura', estatus: 'Activo' },
  { id: 4, nombre: 'Sofía Martínez', numTrabajador: '125', correo: 'smartinez@ejemplo.com', usuario: 'SMartinez', adscripcion: 'Presidencia municipal', estatus: 'Activo' },
  { id: 5, nombre: 'Carlos Ruiz', numTrabajador: '045', correo: 'cruiz@ejemplo.com', usuario: 'CRuiz', adscripcion: 'Contraloria', estatus: 'Inactivo' },
  { id: 6, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
   { id: 7, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
    { id: 8, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
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
      selectedUserId: null
    };

    // bind de métodos
    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.handlePrivilegeInputChange = this.handlePrivilegeInputChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  // -------------------
  // HANDLERS PRINCIPALES
  // -------------------

  openAddModal = () => {
    this.setState({
      currentUser: { adscripcion: 'Ninguno' },
      isModalAddOpen: true
    });
  };

  openEditModal = (user) => {
    this.setState({
      currentUser: user,
      isModalEditOpen: true
    });
  };

  handleUserInputChange(e) {
    const { name, value } = e.target;
    this.setState(prev => ({
      currentUser: { ...prev.currentUser, [name]: value }
    }));
  }

  handlePrivilegeInputChange(e) {
    const { name, value } = e.target;
    this.setState(prev => ({
      privilegeData: { ...prev.privilegeData, [name]: value }
    }));
  }

  handleAddUser = () => {
    const newUser = {
      ...this.state.currentUser,
      id: Date.now(),
      estatus: "Activo"
    };

    this.setState(prev => ({
      users: [...prev.users, newUser],
      isModalAddOpen: false
    }));
  };

  handleEditUser = () => {
    this.setState(prev => ({
      users: prev.users.map(u =>
        u.id === prev.currentUser.id ? prev.currentUser : u
      ),
      isModalEditOpen: false
    }));
  };

  handleStatusChange(userId, newStatus) {
    this.setState(prev => ({
      users: prev.users.map(u =>
        u.id === userId ? { ...u, estatus: newStatus } : u
      )
    }));
  }

  handleApplyPrivilege = () => {
    console.log("Privilegio aplicado:", this.state.privilegeData.privilegio);
    this.setState({ isModalPrivilegesOpen: false });
  };

  // Opciones de estado
  getStatusOptions = (userId) => [
    {
      label: "Activo",
      statusClass: "status-active",
      onClick: () => this.handleStatusChange(userId, "Activo"),
    },
    {
      label: "Inactivo",
      statusClass: "status-inactive",
      onClick: () => this.handleStatusChange(userId, "Inactivo"),
    },
  ];

  render() {
    const { users, searchTerm, selectedUserId } = this.state;

    // FILTRO
    const filteredUsers = users.filter(user =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = ['Nombre', 'Num. Trabajador', 'Correo Electrónico', 'Usuario', 'Adscripción', 'Estatus', 'Acciones'];

    const tableData = filteredUsers.map(user => ({
      _id: user.id,
      Nombre: { main: user.nombre },
      'Num. Trabajador': { main: user.numTrabajador },
      'Correo Electrónico': { main: user.correo },
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

            <BotonDesplegable title="Estado" options={this.getStatusOptions(user.id)} />
          </div>
        )
      }
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
                  onClick={() => {
                    if (!this.state.selectedUserId) {
                      alert("Seleccione un usuario antes de otorgar privilegios.");
                      return;
                    }
                    this.setState({ isModalPrivilegesOpen: true });
                  }}
                  className="btn-privileges-override"
                >
                  Otorgar Privilegios
                </BotonReutilizable>
              </div>

              <div className="search-filter-container">
                <FiltroBusqueda
                  value={this.state.searchTerm}
                  onChange={(e) => this.setState({ searchTerm: e.target.value })}
                  placeholder="Buscar usuario por nombre..."
                />
              </div>

              {/* TABLA */}
              <TablaReutilizable
                columns={columns}
                data={tableData}
                renderRow={(row, index) => {
                  const isSelected = row._id === selectedUserId;

                  return (
                    <tr
                      key={index}
                      className={isSelected ? "selected-row" : ""}
                      onClick={() => this.setState({ selectedUserId: row._id })}
                      style={{ cursor: "pointer" }}
                    >
                      {columns.map((col, i) => (
                        <td key={i}>
                          {row[col]?.main}
                        </td>
                      ))}
                    </tr>
                  );
                }}
              />
            </div>
          </section>
        </main>

        {/* MODAL AGREGAR */}
        <ModalReutilizable
          title="Agregar Usuario"
          isOpen={this.state.isModalAddOpen}
          onClose={() => this.setState({ isModalAddOpen: false })}
          onAccept={this.handleAddUser}
        >
          <FormularioUsuario
            userData={this.state.currentUser}
            onInputChange={this.handleUserInputChange}
          />
        </ModalReutilizable>

        {/* MODAL EDITAR */}
        <ModalReutilizable
          title="Editar Usuario"
          isOpen={this.state.isModalEditOpen}
          onClose={() => this.setState({ isModalEditOpen: false })}
          onAccept={this.handleEditUser}
          acceptButtonText="Guardar"
        >
          <FormularioUsuario
            userData={this.state.currentUser}
            onInputChange={this.handleUserInputChange}
            isEdit={true}
          />
        </ModalReutilizable>

        {/* MODAL PRIVILEGIOS */}
        <ModalReutilizable
          title="Otorgar Privilegios"
          isOpen={this.state.isModalPrivilegesOpen}
          onClose={() => this.setState({ isModalPrivilegesOpen: false })}
          onAccept={this.handleApplyPrivilege}
          acceptButtonText="Aplicar"
        >
          <FormularioPrivilegios
            privilegioData={this.state.privilegeData}
            onInputChange={this.handlePrivilegeInputChange}
          />
        </ModalReutilizable>

      </div>
    );
  }
}

export default Usuarios;
