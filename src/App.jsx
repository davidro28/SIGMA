import { Routes, Route } from "react-router-dom";
import MiHome from "./Paginas/Home/Home.jsx";
import Login from "./Paginas/Login/login.jsx";
import Register from "./Paginas/Registro/registro.jsx";
import ForgotPassword from "./Paginas/recuperar_contraseña/recuperar_contraseña.jsx";
import Activos from "./Paginas/Home/Activos-admin/Activos.jsx"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<MiHome />} />
      <Route path="/recuperar_contraseña" element={<ForgotPassword />} />
      <Route path="/Activos" element={<Activos />} />

      {/* fallback: si no coincide, ir a login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
