import React from 'react';
import SigmaHeader from '../../Components/sigmaHeader';
import VerticalNav from '../../Components/verticalNav';
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
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MiHome;