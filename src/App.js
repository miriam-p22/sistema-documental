import logo from './logo.svg';
import './App.css';
import Navbar from "./components/BarraNavegacion";
import Sidebar from "./components/MenuLateral";
function App() {
  return (
 <Router>
<Navbar />

      <div className="app-layout">
      <Sidebar />
      </div>
      
    </Router>
  );
}

export default App;
