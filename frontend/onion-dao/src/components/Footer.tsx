import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">🧅</div>
              <span className="brand-text">OnionUSD-P</span>
            </div>
            <p className="footer-description">
              Privacy-preserving stablecoin built on Solana with Token-2022 Confidential Transfers.
              Hide amounts, not compliance.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4 className="column-title">Product</h4>
              <ul className="link-list">
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#architecture" className="footer-link">Architecture</a></li>
                <li><button onClick={() => scrollToSection('faq')} className="footer-link footer-link-btn">Pricing</button></li>
                <li><button onClick={() => scrollToSection('architecture')} className="footer-link footer-link-btn">Security</button></li>
              </ul>
            </div>

            <div className="link-column">
              <h4 className="column-title">Developers</h4>
              <ul className="link-list">
                <li><a href="#getting-started" className="footer-link">Documentation</a></li>
                <li><a href="#features" className="footer-link">API Reference</a></li>
              </ul>
            </div>

            <div className="link-column">
              <h4 className="column-title">Company</h4>
              <ul className="link-list">
                <li><button onClick={() => scrollToSection('hero')} className="footer-link footer-link-btn">About</button></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                <li><a href="mailto:thisisaayushbaniya@gmail.com" className="footer-link">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} OnionDAO. All rights reserved.
            </p>
            <div className="compliance-badges">
              <div className="compliance-badge">
                <span className="badge-text">GENIUS Act Ready</span>
              </div>
              <div className="compliance-badge">
                <span className="badge-text">MiCA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 