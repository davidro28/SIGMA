import React from "react";
import "./styles.css"
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function HomeResponsable() {
    const menuItems = [
        { to: "/Homeresponsable", label: "General" },
        { to: "/Tickets", label: "Tickets" }
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

export default HomeResponsable;