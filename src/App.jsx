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
import Mantenimiento_Admin from "./Paginas/Mantenimiento_Admin/index.jsx"
import Home_gestortickets from "./Paginas/gestortickets/Home_gestortickets/Home_gestortickets.jsx"
import MantenimientoGestor from "./Paginas/gestortickets/MantenimientoGestor/MantenimientoGestor.jsx"
import NuevoTicketGestor from "./Paginas/gestortickets/Home_gestortickets/NuevoTicketGestor.jsx";
import DetalleGestor from "./Paginas/gestortickets/Home_gestortickets/DetalleGestor.jsx";
import Activos_responsable from "./Paginas/Responsable/Activos_responsable/Activos_responsable.jsx";
import MisTickets from "./Paginas/Responsable/Tickets_responsable/MisTickets.jsx";
import NuevoMisTickets from "./Paginas/Responsable/Tickets_responsable/NuevoMisTickets.jsx";
import DetalleMisTickets from "./Paginas/Responsable/Tickets_responsable/DetalleMisTickets.jsx";
import HomeTecniMantenimiento from "./Paginas/tecnico_mantenimiento/Home_tecnimantenimineto/index.jsx"
import Home_responsable from "./Paginas/Responsable/Home_responsable/index.jsx"
import MantenimientosTecniMantenimiento from './Paginas/tecnico_mantenimiento/Mantenimientos_Tecnimantenimiento/index.jsx'
import Activos_mantenimiento from "./Paginas/tecnico_mantenimiento/Activos_mantenimiento/Activos_mantenimiento.jsx"
import Detalles_mantenimiento from "./Paginas/tecnico_mantenimiento/Activos_mantenimiento/Detalles_mantenimiento.jsx";
import Tickets_mantenimiento from "./Paginas/tecnico_mantenimiento/Tickets_mantenimiento/Tickets_mantenimiento.jsx"
import DetallesTickets_mantenimiento from "./Paginas/tecnico_mantenimiento/Tickets_mantenimiento/DetallesTickets_mantenimiento.jsx";
import Panel_Admin from "./Paginas/Home/Panel_Admin/index.jsx";
import { AuthProvider } from "./Hooks/AuthContext.jsx";


function App() {
  return (
    <AuthProvider>
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
      <Route path="/Mantenimiento_Admin" element={<Mantenimiento_Admin />} />
      <Route path="/Home_gestortickets" element={<Home_gestortickets />} />
      <Route path="/MantenimientoGestor" element={<MantenimientoGestor />} />
      <Route path="/NuevoTicketGestor" element={<NuevoTicketGestor />} />
      <Route path="/DetalleGestor/:id" element={<DetalleGestor />} />
      <Route path="/Activos_responsable" element={<Activos_responsable />} />
      <Route path="/MisTickets" element={<MisTickets />} />
      <Route path="/NuevoMisTickets" element={<NuevoMisTickets />} />
      <Route path="/DetalleMisTickets/:id" element={<DetalleMisTickets />} />
      <Route path="/HomeTecniMantenimiento" element={<HomeTecniMantenimiento />} />
      <Route path="/Home_responsable" element={<Home_responsable />} />
      <Route path="/MantenimientosTecniMantenimiento" element={<MantenimientosTecniMantenimiento />} />
      <Route path="/Activos_mantenimiento" element={<Activos_mantenimiento />} />
      <Route path="/Detalles_mantenimiento" element={<Detalles_mantenimiento />} />
      <Route path="/Tickets_mantenimiento" element={<Tickets_mantenimiento />} />
      <Route path="/DetallesTickets_mantenimiento" element={<DetallesTickets_mantenimiento />} />
      <Route path="/Panel_Admin" element={<Panel_Admin />} />

      {/* fallback: si no coincide, ir a login */}
      <Route path="*" element={<Login />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
