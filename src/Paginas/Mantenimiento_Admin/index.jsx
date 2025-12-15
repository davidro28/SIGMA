import React, { useState } from 'react';
import SigmaHeader from '../../Components/sigmaHeader';
import VerticalNav from '../../Components/verticalNav';
import CuadroInformativo from '../../Components/cuadroInformacion';
import BuscadorMantenimiento from '../../Components/buscadorMantenimiento';
import NuevaOrden from "../../Components/nuevaOrden";
import OrdenesMantenimiento from '../../Components/ordenesMantenimiento';
import FiltrarEstado from '../../Components/filtrarEstado';
import FiltrarPrioridad from '../../Components/filtrarPrioridad';
import './styles.css';

function Mantenimiento_Admin() {
    const menuItems = [
        { to: "/General", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/Mantenimiento_Admin", label: "Mantenimiento" }
    ];

    const [ordenes, setOrdenes] = useState([
        {
            id: "OT-334",
            fecha: "12/03 · 08:15",
            tipo: "Correctivo",
            activo: "Línea de montaje A",
            activoInfo: "ID-0981 · Planta Norte",
            tecnico: "J. Sánchez",
            estado: "En curso",
            prioridad: "Alta",
            ventana: "Hoy 10:00 - 14:00",
            ventanaSub: "2h retraso estimado",
            origen: "Incidencia",
            origenId: "#129"
        },
        {
            id: "OT-334",
            fecha: "12/03 · 08:15",
            tipo: "Correctivo",
            activo: "Línea de montaje A",
            activoInfo: "ID-0981 · Planta Norte",
            tecnico: "David Rojas",
            estado: "En curso",
            prioridad: "Alta",
            ventana: "Hoy 10:00 - 14:00",
            ventanaSub: "2h retraso estimado",
            origen: "Incidencia",
            origenId: "#129"
        }
    ]);

    const [busqueda, setBusqueda] = useState("");

    // Función para agregar nueva orden
    const agregarOrden = (nuevaOrden) => {
        setOrdenes([nuevaOrden, ...ordenes]);
    };

    // Filtrar órdenes según buscador
    const ordenesFiltradas = ordenes.filter((o) => {
        const texto = busqueda.toLowerCase();
        return (
            o.id.toLowerCase().includes(texto) ||
            o.activo.toLowerCase().includes(texto) ||
            o.tecnico.toLowerCase().includes(texto)
        );
    });

    return (
        <div className="home-container">
            <header>
                <SigmaHeader />
            </header>
            <div className='layout'>
                <VerticalNav items={menuItems}/>
                <main className='content'>
                    <section>
                        <div className='parte-principal'>
                            <p className='parrafo_principal'>Mantenimiento</p>
                            <div className='grupo-derecha'>
                                <BuscadorMantenimiento busqueda={busqueda} setBusqueda={setBusqueda} />
                                <NuevaOrden agregarOrden={agregarOrden} />
                            </div>
                        </div>
                        <div className='cuadros-container'>
                            <CuadroInformativo titulo="Ordenes Abiertas" valor={ordenes.length} estadistica="Incluye correctivo y preventivo" sugerencia="12 vencen esta semana" width="380px" />
                            <CuadroInformativo titulo="Presupuesto" valor={1520} estadistica={3423} sugerencia="nada"/>
                            <CuadroInformativo titulo="Total de Tickets" valor={1102} estadistica={3423} sugerencia="nada"/>
                        </div>
                        <div className='container-grande'>
                            <div className='container-filtros'>
                                <FiltrarEstado />
                                <FiltrarPrioridad />
                            </div>
                            <div className='container-ordenes'>
                                <OrdenesMantenimiento ordenes={ordenesFiltradas}/>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Mantenimiento_Admin;
