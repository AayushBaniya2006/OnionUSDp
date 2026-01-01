import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
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
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Security</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4 className="column-title">Developers</h4>
              <ul className="link-list">
                <li><a href="#docs" className="footer-link">Documentation</a></li>
                <li><a href="#api" className="footer-link">API Reference</a></li>
                <li><a href="#" className="footer-link">SDK</a></li>
                <li><a href="#" className="footer-link">Examples</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4 className="column-title">Resources</h4>
              <ul className="link-list">
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Whitepaper</a></li>
                <li><a href="#" className="footer-link">Community</a></li>
                <li><a href="#" className="footer-link">Support</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4 className="column-title">Company</h4>
              <ul className="link-list">
                <li><a href="#" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
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