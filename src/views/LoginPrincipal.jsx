import React, { Component } from "react";
import { Navigate } from "react-router-dom"; // Para navegación en clase
import "../styles/LoginPrincipal.css";

import CampoInicioSesion from "../components/CampoInicioSesion";
import VentanaClaveModal from "../components/VentanaClaveModal";
import RegistroUsuario from "../components/RegistroUsuario";

class LoginPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      password: "",
      mantenerSesion: false,
      modalClaveOpen: false,
      clave: "",
      mensajeClave: "",
      registroVisible: false,
      redirectTo: null, // ruta a redirigir después del login
    };

    // Datos simulados
    this.usuariosSimulados = [
      { usuario: "admin", password: "123", ruta: "/usuarios" },
      { usuario: "user", password: "123", ruta: "/dashboard" },
    ];

    // Bind
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleMantenerSesion = this.toggleMantenerSesion.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.confirmarClave = this.confirmarClave.bind(this);
    this.openModalClave = this.openModalClave.bind(this);
    this.closeModalClave = this.closeModalClave.bind(this);
    this.closeRegistro = this.closeRegistro.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  toggleMantenerSesion() {
    this.setState((prevState) => ({ mantenerSesion: !prevState.mantenerSesion }));
  }

  onLogin(e) {
    e.preventDefault();
    const { usuario, password } = this.state;
    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    const encontrado = this.usuariosSimulados.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (!encontrado) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // Redirigir usando estado
    this.setState({ redirectTo: encontrado.ruta });
  }

  openModalClave() {
    this.setState({ modalClaveOpen: true });
  }

  closeModalClave() {
    this.setState({ modalClaveOpen: false });
  }

  confirmarClave() {
    if (this.state.clave !== "12345") {
      this.setState({ mensajeClave: "Clave incorrecta" });
      return;
    }
    this.setState({ mensajeClave: "", modalClaveOpen: false, registroVisible: true });
  }

  closeRegistro() {
    this.setState({ registroVisible: false });
  }

  render() {
    // Redirigir si redirectTo tiene valor
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} replace />;
    }

    return (
      <div
        className="login-principal"
        style={{
          backgroundImage: "url(/imagenes/fondoInicioSesion.jpg)",
        }}
      >
        <div className="login-card">
          <div className="logo-button" onClick={this.openModalClave}>
            <img src="/imagenes/logo_tlahuapan.png" alt="Logo" className="logo" />
          </div>

          <form onSubmit={this.onLogin}>
            <CampoInicioSesion
              type="text"
              name="usuario"
              value={this.state.usuario}
              onChange={this.handleInputChange}
              placeholder="Usuario"
            />
            <CampoInicioSesion
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Contraseña"
            />

            <button className="btn-login" type="submit">
              INICIAR SESIÓN
            </button>

            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={this.state.mantenerSesion}
                onChange={this.toggleMantenerSesion}
              />
              <label>Mantener sesión iniciada</label>
            </div>
          </form>
        </div>

        {/* Modal de clave */}
        <VentanaClaveModal
          isOpen={this.state.modalClaveOpen}
          onClose={this.closeModalClave}
          clave={this.state.clave}
          setClave={(value) => this.setState({ clave: value })}
          onConfirm={this.confirmarClave}
          mensaje={this.state.mensajeClave}
        />

        {/* RegistroUsuario solo si la clave es correcta */}
        <RegistroUsuario
          isOpen={this.state.registroVisible}
          onClose={this.closeRegistro}
          onRegister={(data) => {
            console.log("Usuario registrado:", data);
            this.closeRegistro();
          }}
        />
      </div>
    );
  }
}

export default LoginPrincipal;
