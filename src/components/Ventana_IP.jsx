import React, { Component } from "react";
import "../styles/VentanaClaveIP.css";

class Ventana_IP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: ""
    };

    this.handleConfirmar = this.handleConfirmar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ ip: e.target.value });
  }

  handleConfirmar() {
    const { ip } = this.state;
    const { onIpConfirmada } = this.props;

    // Validación básica de IP
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    if (ipRegex.test(ip)) {
      onIpConfirmada(ip); // Se llama a la función del padre para guardar la IP
    } else {
      alert('Por favor, introduce una dirección IP válida (ej: 192.168.1.1).');
    }
  }

  render() {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Configuración Inicial de Red</h2>
          <p>
            Para conectar con el servidor de RH. Introduce la IP de la computadora de control. Esto solo se pedirá una vez.
          </p>
          <input
            type="text"
            className="modal-input"
            value={this.state.ip}
            onChange={this.handleChange}
            placeholder="Ej: 192.168.1.100"
            autoFocus
          />
          <div className="modal-buttons">
            <button className="modal-btn confirmar" onClick={this.handleConfirmar}>
              Guardar IP
            </button>
          </div>
          {/* No hay botón de Cancelar, ya que la IP es obligatoria para el primer inicio */}
        </div>
      </div>
    );
  }
}

export default Ventana_IP;
