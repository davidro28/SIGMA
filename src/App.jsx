import { Routes, Route } from "react-router-dom";
import MiHome from "./Paginas/Home/Home"; // tu página de inicio
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Ruta de inicio */}
      <Route path="/" element={<MiHome />} />
    </Routes>
  );
}

export default App;
