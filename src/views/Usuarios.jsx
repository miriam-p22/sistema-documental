import React, { Component } from 'react'; // Importar Component
import BotonReutilizable from '../components/BotonReutilizable';
import FiltroBusqueda from '../components/FiltroBusqueda';  
import TablaReutilizable from '../components/TablaReutilizable';
import ModalReutilizable from '../components/ModalReutilizable';
import FormularioUsuario from '../components/FormularioUsuario';
import FormularioPrivilegios from '../components/FormularioPrivilegios';

// Datos de ejemplo
const initialUsers = [
  { id: 1, nombre: 'Jacob Pérez', numTrabajador: '012', correo: 'jacob@ejemplo.com', usuario: 'Jacob', adscripcion: 'Ley Archivo', estatus: 'Activo' },
  { id: 2, nombre: 'Melissa López', numTrabajador: '003', correo: 'melissa@ejemplo.com', usuario: 'Melissa', adscripcion: 'Oficialía de Partes', estatus: 'Inactivo' },
  { id: 3, nombre: 'John Carreon', numTrabajador: '010', correo: 'john@ejemplo.com', usuario: 'John', adscripcion: 'Turismo y Cultura', estatus: 'Activo' },
  { id: 4, nombre: 'Sofía Martínez', numTrabajador: '125', correo: 'smartinez@ejemplo.com', usuario: 'SMartinez', adscripcion: 'Presidencia municipal', estatus: 'Activo' },
  { id: 5, nombre: 'Carlos Ruiz', numTrabajador: '045', correo: 'cruiz@ejemplo.com', usuario: 'CRuiz', adscripcion: 'Contraloria', estatus: 'Inactivo' },
  { id: 6, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
];

// Reemplazamos 'const Usuarios = () => {...}' por una clase que extiende Component
class Usuarios extends Component {
    
    //Inicialización del estado 
    constructor(props) {
        super(props);
        this.state = {
            users: initialUsers,
            searchTerm: '',
            isModalAddOpen: false,
            isModalEditOpen: false,
            isModalPrivilegesOpen: false,
            currentUser: { adscripcion: 'Ninguno' }, // Inicializar con un valor por defecto
            privilegeData: {},
        };
        
    }
    
    // Métodos de la Clase (reemplazan a los 'handlers' del componente funcional)

    // Handlers de modales y estado
    openAddModal = () => {
        this.setState({
            currentUser: { adscripcion: 'Ninguno' }, 
        });
    };

    openEditModal = (user) => {
        this.setState({
            currentUser: user,
            isModalEditOpen: true,
        });
    };

    handleUserInputChange = (e) => {
        const { name, value } = e.target;
        // Se usa la forma de función de this.setState para acceder al estado previo
        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                [name]: value,
            }
        }));
    };

    handlePrivilegeInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            privilegeData: {
                ...prevState.privilegeData,
                [name]: value,
            }
        }));
    };
    
    // búsqueda
    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    // CRUD simulado
    handleAddUser = () => {
        const { users, currentUser } = this.state;
        const newUser = { 
            ...currentUser, 
            id: Date.now(), 
            estatus: 'Activo'
        };
        this.setState({
            users: [...users, newUser],
            isModalAddOpen: false,
        });
    };

    handleEditUser = () => {
        const { users, currentUser } = this.state;
        this.setState({
            users: users.map(u => u.id === currentUser.id ? currentUser : u),
            isModalEditOpen: false,
        });
    };

    handleStatusChange = (userId, newStatus) => {
        this.setState(prevState => ({
            users: prevState.users.map(u => u.id === userId ? { ...u, estatus: newStatus } : u)
        }));
    };

    handleApplyPrivilege = () => {
        console.log("Privilegio aplicado:", this.state.privilegeData.privilegio);
        this.setState({ isModalPrivilegesOpen: false });
    };

    render() {
        // Desestructurar el estado para facilitar el acceso
        const { 
            users, searchTerm, isModalAddOpen, isModalEditOpen, 
            isModalPrivilegesOpen, currentUser, privilegeData 
        } = this.state;

        // Lógica de filtrado 
        const filteredUsers = users.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const columns = ['Nombre', 'Num. Trabajador', 'Correo Electrónico', 'Usuario', 'Adscripción', 'Estatus', 'Acciones'];

        return (
            <div className="main-content-wrapper">

                <main className="content-area">
                    <section className="content-section">
                        <div className="table-container">
                            <h2 className="card-title">Gestión de Usuarios</h2>

                            {/* BOTONES */}
                            <div className="management-buttons-container">
                                {/* Usar el método de clase */}
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

                            {/* COMPONENTE DE BÚSQUEDA */}
                            <div className="search-filter-container">
                                <FiltroBusqueda
                                    value={searchTerm}
                                    
                                    onChange={this.handleSearchChange}
                                    placeholder="Buscar usuario por nombre..."
                                />
                            </div>

                            {/* TABLA */}
                            <TablaReutilizable 
                                columns={columns} 
                                data={filteredUsers} 
                                onEditUser={this.openEditModal} 
                                onStatusChange={this.handleStatusChange} 
                            />
                        </div>
                    </section>
                </main>

                {/* MODALES */}
                <ModalReutilizable
                    id="modalInsertarUsuario"
                    title="Agregar Usuario"
                    isOpen={isModalAddOpen}
                    // Usar this.setState directamente para cerrar
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