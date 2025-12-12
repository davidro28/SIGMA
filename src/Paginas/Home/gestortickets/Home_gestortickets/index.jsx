import React from "react";
import "./styles.css";
import SigmaHeader from "../../../../Components/sigmaHeader";
import VerticalNav from "../../../../Components/verticalNav";

function HomeGestorTickets() {
    const menuItems = [
        { to: "/HomeGestorTickets", label: "General" },
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

export default HomeGestorTickets;