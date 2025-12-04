import React from 'react';
import SigmaHeader from '../../Components/sigmaHeader';
import VerticalNav from '../../Components/verticalNav';
import CuadroInformativo from '../../Components/cuadroInformacion';
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
                            <CuadroInformativo titulo="Total de Activos" valor={1248} />
                            <CuadroInformativo titulo="Presupuesto" valor={1520} />
                            <CuadroInformativo titulo="Total de Tickets" valor={1102} />
                            <CuadroInformativo titulo="Mantenimiento" valor={45} />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MiHome;
