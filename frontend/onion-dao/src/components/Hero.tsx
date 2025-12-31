import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🔒</span>
            <span className="badge-text">Privacy-Preserving Stablecoin</span>
          </div>

          <h1 className="hero-title">
            <span className="title-main">OnionUSD-P</span>
            <span className="title-subtitle">Every payment is private</span>
          </h1>

          <p className="hero-description">
            The first USD-pegged stablecoin with confidential transfers on Solana.
            Built with Token-2022 extensions for complete payment privacy with regulatory compliance.
          </p>

          <div className="hero-actions">
            <a href="/login" className="btn btn-primary btn-large">
              Try Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </a>
            <a href="#architecture" className="btn btn-secondary btn-large">
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="demo-card">
            <div className="card-header">
              <span className="card-icon">💸</span>
              <div className="card-title">Private Transfer</div>
              <div className="card-badge">Encrypted</div>
            </div>
            <div className="card-body">
              <div className="transfer-row">
                <span className="label">Amount</span>
                <span className="value encrypted">••••••••</span>
              </div>
              <div className="transfer-row">
                <span className="label">From</span>
                <span className="value mono">7xKp...9mNq</span>
              </div>
              <div className="transfer-row">
                <span className="label">To</span>
                <span className="value mono">3bRt...2wXz</span>
              </div>
              <div className="transfer-row">
                <span className="label">Status</span>
                <span className="value success">✓ Confirmed</span>
              </div>
            </div>
            <div className="card-footer">
              <span className="footer-text">Powered by Token-2022</span>
              <span className="footer-icon">⚡</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-value">$0.00</div>
          <div className="stat-label">Transaction Fees</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-value">&lt;1s</div>
          <div className="stat-label">Settlement Time</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-value">100%</div>
          <div className="stat-label">Private by Default</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
