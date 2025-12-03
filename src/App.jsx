import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import MiHome from "./Paginas/Home/Home"; // tu página de inicio
import "./App.css";
=======
import Login from "./Paginas/Login/login.jsx";
import Register from "./Paginas/Registro/registro.jsx";
>>>>>>> login

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      {/* Ruta de inicio */}
      <Route path="/" element={<MiHome />} />
=======
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} /> {/* fallback */}
>>>>>>> login
    </Routes>
  );
}

export default App;
