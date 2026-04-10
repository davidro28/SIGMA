import React from 'react';
import SigmaHeader from '../../../Components/sigmaHeader';
import VerticalNav from '../../../Components/verticalNav';
import '../Panel_Admin/styles.css';

function Panel_Admin() {
    const menuItems = [
        { to: "/General", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
        { to: "/Panel_Admin", label: "Panel de control"}
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
                        
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Panel_Admin;
