import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Usuarios from "./views/Usuarios";
import Dispersion from "./views/Dispersion";
import Organigrama from "./views/Organigrama";
import "./App.css";

function App() {
  return (
     <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Usuarios />} />
          <Route path="Usuarios" element={<Usuarios />} />
         <Route path="Dispersion" element={<Dispersion />} />
          <Route path="organigrama" element={<Organigrama />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;