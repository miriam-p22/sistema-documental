import React, { Component } from "react";
import Card from "../components/Card";
import CampoFormulario from "../components/CampoFormulario";
import BotonReutilizable from "../components/BotonReutilizable";
import "../styles/Configuracion.css";

class Configuracion extends Component {
  constructor(props) {
    super(props);

    // Estado centralizado SIN hooks
    this.state = {
      // correo
      correoRemitente: "",
      password: "",
      servidorSmtp: "",
      puerto: "",

      // BD
      dominio: "",
      servicio: "",
      basedatos: "",
      usuario: "",
      contrasena: "",
    };
  }

  // Métodos
  enviarCorreo = () => {
    console.log("Configuración correo:", {
      correoRemitente: this.state.correoRemitente,
      password: this.state.password,
      servidorSmtp: this.state.servidorSmtp,
      puerto: this.state.puerto,
    });
  };

  aceptarBaseDatos = () => {
    console.log("Configuración BD:", {
      dominio: this.state.dominio,
      servicio: this.state.servicio,
      basedatos: this.state.basedatos,
      usuario: this.state.usuario,
      contrasena: this.state.contrasena,
    });
  };

  // Helper de actualización de estado
  handleChange = (campo, valor) => {
    this.setState({ [campo]: valor });
  };

  render() {
    return (
      <div className="content-area">
        <div className="container">
          <h2>Configuración de Notificaciones del Sistema Documental</h2>

          <div className="top-grid">
            {/* CARD 1: Envío por correo */}
            <Card className="section">
              <h3>Envío por correo</h3>

              <CampoFormulario
                label="Correo remitente del sistema"
                type="email"
                placeholder="notificaciones@gmail.com"
                value={this.state.correoRemitente}
                onChange={(e) => this.handleChange("correoRemitente", e.target.value)}
              />

              <CampoFormulario
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={this.state.password}
                onChange={(e) => this.handleChange("password", e.target.value)}
              />

              <CampoFormulario
                label="Servidor SMTP"
                placeholder="smtp.gmail.com"
                value={this.state.servidorSmtp}
                onChange={(e) => this.handleChange("servidorSmtp", e.target.value)}
              />

              <CampoFormulario
                label="Puerto"
                placeholder="587"
                value={this.state.puerto}
                onChange={(e) => this.handleChange("puerto", e.target.value)}
              />

              <div className="row">
                <BotonReutilizable onClick={this.enviarCorreo}>
                  Enviar
                </BotonReutilizable>
              </div>
            </Card>

            {/* CARD 2: Conexión a base de datos */}
            <Card className="section">
              <h3>Conexión a Base de Datos</h3>

              <CampoFormulario
                label="Dominio"
                placeholder="midominio.com"
                value={this.state.dominio}
                onChange={(e) => this.handleChange("dominio", e.target.value)}
              />

              <CampoFormulario
                label="Servicio"
                placeholder="MySQL"
                value={this.state.servicio}
                onChange={(e) => this.handleChange("servicio", e.target.value)}
              />

              <CampoFormulario
                label="Base de Datos"
                placeholder="nombre_base_de_datos"
                value={this.state.basedatos}
                onChange={(e) => this.handleChange("basedatos", e.target.value)}
              />

              <CampoFormulario
                label="Usuario"
                placeholder="admin"
                value={this.state.usuario}
                onChange={(e) => this.handleChange("usuario", e.target.value)}
              />

              <CampoFormulario
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={this.state.contrasena}
                onChange={(e) => this.handleChange("contrasena", e.target.value)}
              />

              <div className="row">
                <BotonReutilizable onClick={this.aceptarBaseDatos}>
                  Aceptar
                </BotonReutilizable>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Configuracion;
