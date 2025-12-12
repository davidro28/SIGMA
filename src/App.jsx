import { Routes, Route } from "react-router-dom";
import MiHome from "./Paginas/Home/Home.jsx";
import Login from "./Paginas/Login/login.jsx";
import Register from "./Paginas/Registro/registro.jsx";
import ForgotPassword from "./Paginas/recuperar_contraseña/recuperar_contraseña.jsx";
import Activos from "./Paginas/Home/Activos-admin/Activos.jsx"
import NuevoActivo from "./Paginas/Home/Activos-admin/NuevoActivo.jsx";
import DetalleActivo from "./Paginas/Home/Activos-admin/DetalleActivo.jsx"
import Tickets from "./Paginas/Home/Tickets-admin/Tickets.jsx"
import NuevoTicket from "./Paginas/Home/Tickets-admin/NuevoTicket.jsx";
import TicketDetalle from "./Paginas/Home/Tickets-admin/TicketDetalle.jsx"
import Mantenimiento_Admin from "./Paginas/Mantenimiento_Admin/index.jsx";
import HomeResponsable from "./Paginas/Responsable/Home_responsable/index.jsx";
import HomeGestorTickets from "./Paginas/Home/gestortickets/Home_gestortickets/index.jsx";
import HomeTecniMantenimiento from "./Paginas/Home/tecnico_mantenimiento/Home_tecnimantenimineto/index.jsx";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/General" element={<MiHome />} />
      <Route path="/recuperar_contraseña" element={<ForgotPassword />} />
      <Route path="/Activos" element={<Activos />} />
      <Route path="/NuevoActivo" element={<NuevoActivo />} />
      <Route path="/DetalleActivo/:id" element={<DetalleActivo />} />
      <Route path="/Tickets" element={<Tickets />} />
      <Route path="/NuevoTicket" element={<NuevoTicket />} />
      <Route path="/Ticket/:id" element={<TicketDetalle />} />
      <Route path="/Mantenimiento" element={<Mantenimiento_Admin />} />
      <Route path="/Homeresponsable" element={<HomeResponsable />} />
      <Route path="/HomeGestorTickets" element={<HomeGestorTickets />} />
      <Route path="/HomeTecniMantenimiento" element={<HomeTecniMantenimiento />} />


      {/* fallback: si no coincide, ir a login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
