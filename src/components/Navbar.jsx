import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { getItemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const count = getItemCount();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-script">Anniis</span>
          <span className="logo-caps">Cuisine</span>
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/orders">Orders</NavLink></li>
          <li><NavLink to="/inquiry">Inquiry</NavLink></li>
          <li><NavLink to="/policy">Policy</NavLink></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="cart-btn" onClick={() => navigate('/cart')}>
            <span className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </span>
            CART
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMobileOpen(false)}>Home</NavLink>
        <NavLink to="/menu" onClick={() => setMobileOpen(false)}>Menu</NavLink>
        <NavLink to="/orders" onClick={() => setMobileOpen(false)}>Orders</NavLink>
        <NavLink to="/inquiry" onClick={() => setMobileOpen(false)}>Inquiry</NavLink>
        <NavLink to="/policy" onClick={() => setMobileOpen(false)}>Policy</NavLink>
      </div>
    </>
  );
}
