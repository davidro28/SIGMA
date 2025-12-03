import { Link } from "react-router-dom";
import "./styles.css";

function VerticalNav() {
    return (
        <nav className="vertical-nav">
        <ul>
            <li><Link to="/general">General</Link></li>
            <li><Link to="/activos">Activos</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/mantenimiento">Mantenimiento</Link></li>
        </ul>
        </nav>
    );
}

export default VerticalNav;
