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
                    <p>David</p>
                    <p>Admin</p>
                </div>
            </div>
        </nav>
    );
}

export default VerticalNav;
