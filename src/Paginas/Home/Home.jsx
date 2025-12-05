import React from 'react';
import SigmaHeader from '../../Components/sigmaHeader';
import VerticalNav from '../../Components/verticalNav';
import CuadroInformativo from '../../Components/cuadroInformacion';
import ActividadReciente from '../../Components/actividadReciente';
import TicketsAbiertos from '../../Components/ticketsAbiertos';
import AccionesRapido from '../../Components/accionesRapidas';
import PanelAlerta from '../../Components/panelAlerta';
import './Home.css';

function MiHome() {
    const menuItems = [
        { to: "/general", label: "General" },
        { to: "/activos", label: "Activos" },
        { to: "/tickets", label: "Tickets" },
        { to: "/mantenimiento", label: "Mantenimiento" }
    ];
    return (
        <div className="home-container">
            <header>
                <SigmaHeader />
            </header>
            <div className="layout">
                <VerticalNav items={menuItems} />
                <main className="content">
                    <section>
                        <p className='parrafo_principal'>Vista principal</p>
                        <div className="cuadros-container">
                            <CuadroInformativo titulo="Total de Activos" valor={1248} estadistica={3423} sugerencia="nada"/>
                            <CuadroInformativo titulo="Presupuesto" valor={1520} estadistica={3423} sugerencia="nada"/>
                            <CuadroInformativo titulo="Total de Tickets" valor={1102} estadistica={3423} sugerencia="nada"/>
                            <CuadroInformativo titulo="Mantenimiento" valor={45} estadistica={3423} sugerencia="nada"/>
                        </div>
                        <div className="rectangulos-container">
                            <ActividadReciente />
                            <PanelAlerta />
                        </div>
                        <div className='informacion-container'>
                            <TicketsAbiertos />
                            <AccionesRapido />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MiHome;
