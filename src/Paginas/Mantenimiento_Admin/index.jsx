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
        { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
        { to: "/Panel_Admin", label: "Panel de control"}
    ];

    const [ordenes, setOrdenes] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    // Función para agregar nueva orden
    const onOrdenCreada = (nuevaOrden) => {
        setOrdenes(prev => [nuevaOrden, ...prev]);
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
                                <NuevaOrden onOrdenCreada={onOrdenCreada} />
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
