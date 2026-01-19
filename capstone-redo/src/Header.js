const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/reservations">Reservations</a></li>
                <li><a href="/order-online">Order Online</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
};

function Header () {
    return (
        <header>
            <img src="./little lemon logo.jpg" alt="logo" />
            <Navigation />
        </header>
    );
}

export default Header;