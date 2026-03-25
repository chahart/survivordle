export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-left">
          <span className="footer-logo">SURV🔥VORDLE</span>
          <span className="footer-copy">© {year} Survivordle. Not affiliated with CBS or Survivor.</span>
        </div>
        <div className="footer-right">
          <a href="mailto:survivordlegame@gmail.com" className="footer-link" title="Email">
            ✉️ Contact
          </a>
          <a href="https://x.com/Survivordle" target="_blank" rel="noopener noreferrer" className="footer-link" title="X / Twitter">
            𝕏 Twitter
          </a>
          <a href="https://www.buymeacoffee.com/chahart" target="_blank" rel="noopener noreferrer" className="footer-link footer-bmc" title="Buy me a beer">
            🍺 Support
          </a>
        </div>
      </div>
    </footer>
  );
}
