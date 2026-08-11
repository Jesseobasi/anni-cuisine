import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Hours</h3>
          <p>Saturday &amp; Sunday</p>
        </div>
        <div>
          <h3>Service Areas</h3>
          <p>Towson, MD · New Jersey</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>@Therealannelle</p>
          <p>@anniiscuisine</p>
          <a href="mailto:Anniiscuisine@gmail.com">Anniiscuisine@gmail.com</a>
          <Link to="/admin" style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
