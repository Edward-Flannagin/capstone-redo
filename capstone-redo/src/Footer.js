import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-column">
          <a href="/" className="footer-logo-link">
            <img
              src="/little lemon logo.jpg"
              alt="Little Lemon logo"
              className="footer-logo"
            />
          </a>
          {/* <p className="copyright-text">
            © 2024 Little Lemon. All rights reserved.
          </p> */}
        </div>

        {/* Doormat Navigation */}
        <div className="footer-column">
          <h4 className="footer-heading" onClick={() => toggle("doormat")}>
            Doormat Navigation
          </h4>

          <div className={`collapsible ${open === "doormat" ? "open" : ""}`}>
            <ul className="doormat-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/order-online">Order Online</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4 className="footer-heading" onClick={() => toggle("contact")}>
            Contact
          </h4>

          <div className={`collapsible ${open === "contact" ? "open" : ""}`}>
            <ul className="footer-links">
              <li><i className="bi bi-geo-alt-fill" /> 123 Lemon Street</li>
              <li><i className="bi bi-geo" /> Chicago, IL 60601</li>
              <li><i className="bi bi-telephone-fill" /> 312-555-1234</li>
              <li><i className="bi bi-envelope-fill" /> contact@littlelemon.com</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h4 className="footer-heading" onClick={() => toggle("social")}>
            Social Media
          </h4>

          <div className={`collapsible ${open === "social" ? "open" : ""}`}>
            <ul className="doormat-nav-list">
              {/* facebook */}
              <li>
                <Link to="https://facebook.com">
                  <i className="bi bi-facebook" /> Facebook
                </Link>
              </li>
              {/* instagram */}
              <li>
                <Link to="https://instagram.com">
                  <i className="bi bi-instagram" /> Instagram
                </Link>
              </li>
              {/* twitter/x */}
              <li>
                <Link to="https://twitter.com"><i className="bi bi-twitter-x" /> Twitter (X)
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

