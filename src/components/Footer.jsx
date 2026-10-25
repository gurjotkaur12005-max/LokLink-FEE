import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="logo footer-logo"><span className="logo-mark" aria-hidden="true">L</span> Lok<span className="logo-accent">Link</span></p>
          <p className="footer-tagline">Your locality. Your voice. Your government.</p>
        </div>
        <nav aria-label="Footer">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/explore">Localities</Link></li>
            <li><Link to="/schemes">Schemes</Link></li>
            <li><Link to="/complaints">Complaints</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </nav>
        <div>
          <h4>About this project</h4>
          <p className="footer-note">
            LokLink is a university demo. All data is sample data, complaints are simulated and
            nothing is sent to real officials. For real services, use official government portals.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">Made for Front End Engineering-II · Chitkara University</div>
    </footer>
  );
}

export default Footer;
