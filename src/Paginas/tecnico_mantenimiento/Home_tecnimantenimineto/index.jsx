import React from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function HomeTecniMantenimiento() {
    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/Mantenimiento", label: "Mantenimiento" }
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

export default HomeTecniMantenimiento;