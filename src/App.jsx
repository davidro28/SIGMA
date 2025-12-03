import { Routes, Route } from "react-router-dom";
import Login from "./Paginas/Login/login.jsx";
import Register from "./Paginas/Registro/registro.jsx";
import ForgotPassword from "./Paginas/recuperar_contraseña/recuperar_contraseña.jsx"; 


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recuperar_contraseña" element={<ForgotPassword />} />
      <Route path="*" element={<Login />} /> {/* fallback */}
    </Routes>
  );
}

export default App;
