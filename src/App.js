import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/BarraNavegacion";
import Sidebar from "./components/MenuLateral";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <h1>Bienvenido al sistema</h1>
            <p>Selecciona una opción del menú lateral.</p>
          </main>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
