import { Link } from "react-router-dom";
import "./styles.css";

function VerticalNav({ items }) {
    return (
        <nav className="vertical-nav">
            <ul>
                {items.map((item, index) => (
                <li key={index}>
                <Link to={item.to}>{item.label}</Link>
                </li>
                ))}
            </ul>
            <div className="user-info">
                <img src="https://via.placeholder.com/40" />
                <div>
                    <p className="user-name">David</p>
                    <p className="user-role">Admin</p>
                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default VerticalNav;
