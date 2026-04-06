import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="nav-container">
            <ul className="site-list">
                <li> <Link to="/"> Home </Link> </li>
                <li> <Link to="/menu"> Menu</Link> </li>
                <li> <Link to="/reservations"> Reservations</Link> </li>
                <li> <Link to="/order-online">Order Online</Link> </li>
                <li> <Link to="/login"> Login </Link> </li>
                <li> <Link to="/about"> About Us</Link></li>
            </ul>
        </nav>
    );
};

function Header () {
    return (
        <header className="header-top">
            <img src="./little lemon logo.jpg" alt="logo" className="header-logo"/>
            <Navigation className="Header-navigation"/>
        </header>
    );
}

export default Header;