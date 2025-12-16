import React from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function MantenimientosTecniMantenimiento() {
    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
    ];
    return (
        <div>
            <header>
                <SigmaHeader />
            </header>
            <div>
                <VerticalNav items={menuItems} />
            </div>
        </div>
    )
}

export default MantenimientosTecniMantenimiento;