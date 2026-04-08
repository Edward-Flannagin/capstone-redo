import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { CartContext } from "./context/CartContext";

const Navigation = () => {
    const { cart, getCartTotal } = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [shake, setShake] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartTotal = parseFloat(getCartTotal() || "0");
    const prevCartCount = useRef(cartCount);

    useEffect(() => {
        if (cartCount > prevCartCount.current) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
        prevCartCount.current = cartCount;
    }, [cartCount]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
                setNavOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCheckout = () => {
        if (cart.length > 0) {
            setOpen(false);
            navigate("/order-online");
        }
    };

    return (
        <nav className="nav-container" ref={wrapperRef}>
            <button
                type="button"
                className={`nav-toggle ${navOpen ? "open" : ""}`}
                onClick={() => {
                    setNavOpen((current) => !current);
                    setOpen(false);
                }}
                aria-label="Toggle navigation"
                aria-expanded={navOpen}
            >
                <i className="bi bi-list"></i>
            </button>

            <ul className={`site-list ${navOpen ? "open" : ""}`}>
                <li><Link to="/" onClick={() => setNavOpen(false)}>Home</Link></li>
                <li><Link to="/menu" onClick={() => setNavOpen(false)}>Menu</Link></li>
                <li><Link to="/reservations" onClick={() => setNavOpen(false)}>Reservations</Link></li>
                <li><Link to="/order-online" onClick={() => setNavOpen(false)}>Order Online</Link></li>
                <li><Link to="/login" onClick={() => setNavOpen(false)}>Login</Link></li>
                <li><Link to="/about" onClick={() => setNavOpen(false)}>About Us</Link></li>
            </ul>

            <div className="cart-nav-item">
                <button
                    type="button"
                    className={`cart-nav-button ${shake ? "shake" : ""}`}
                    onClick={() => setOpen((current) => !current)}
                    aria-expanded={open}
                >
                    <i className="bi bi-cart-fill"></i>
                    <span>Cart</span>
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                {open && (
                    <div className="cart-dropdown">
                        <div className="cart-dropdown-header">
                            <div>
                                <h4>Shopping Cart</h4>
                                <p className="cart-dropdown-meta">
                                    {cartCount} item{cartCount === 1 ? "" : "s"}
                                </p>
                            </div>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>

                        {cart.length === 0 ? (
                            <p className="cart-empty">Your cart is empty</p>
                        ) : (
                            <>
                                <div className="cart-dropdown-items">
                                    {cart.map((item) => {
                                        const price = parseFloat(item.price.replace("$", ""));
                                        const itemTotal = (price * item.quantity).toFixed(2);
                                        return (
                                            <div key={item.id} className="cart-dropdown-item">
                                                <div className="cart-dropdown-item-details">
                                                    <p className="cart-dropdown-item-title">{item.title}</p>
                                                    <p className="cart-dropdown-item-meta">
                                                        {item.quantity} × {item.price}
                                                    </p>
                                                </div>
                                                <p className="cart-dropdown-item-price">${itemTotal}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="cart-summary cart-dropdown-summary">
                                    <div className="cart-dropdown-summary-row">
                                        <span>Subtotal:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="cart-dropdown-summary-row">
                                        <span>Tax (10%):</span>
                                        <span>${(cartTotal * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="cart-dropdown-summary-row">
                                        <span>Total:</span>
                                        <span>${(cartTotal * 1.1).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCheckout}
                                    className="checkout-btn cart-dropdown-checkout"
                                    disabled={cart.length === 0}
                                >
                                    Checkout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
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