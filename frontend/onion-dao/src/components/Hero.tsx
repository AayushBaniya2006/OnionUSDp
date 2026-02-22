import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="tag-icon material-icons">shield</span>
              <span className="tag-text">Privacy by default</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line-1">
                Private payments
              </span>
              <span className="title-line-2">
                for teams
              </span>
            </h1>

            <p className="hero-description">
              Send and receive confidential salary payments without exposing transaction amounts.
              Built on Solana with Token-2022 for privacy that actually works.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="hero-btn hero-btn-primary">
                <span className="btn-text">Start using OnionUSD</span>
                <span className="btn-icon material-icons">arrow_forward</span>
              </Link>
              <a href="#getting-started" className="hero-btn hero-btn-secondary">
                <span className="btn-text">How it works</span>
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-icon material-icons">verified</span>
                <span>Auditable on-chain</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon material-icons">lock</span>
                <span>Confidential transfers</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon material-icons">speed</span>
                <span>Fast confirmations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="card-header">
              <span className="card-icon material-icons">account_balance_wallet</span>
              <div className="card-title">Your wallet, encrypted</div>
            </div>
            <div className="card-content">
              <div className="card-stat">
                <span className="stat-label">Transaction amount</span>
                <span className="stat-value encrypted">••••••••</span>
              </div>
              <div className="card-stat">
                <span className="stat-label">From</span>
                <span className="stat-value">7xKp...9mNq</span>
              </div>
              <div className="card-stat">
                <span className="stat-label">To</span>
                <span className="stat-value">3bRt...2wXz</span>
              </div>
              <div className="card-stat">
                <span className="stat-label">Status</span>
                <span className="stat-value confirmed">
                  <span className="status-icon material-icons">check_circle</span>
                  Confirmed
                </span>
              </div>
            </div>
            <div className="card-footer">
              <span className="footer-text">Token-2022</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <div className="stat-number">$0</div>
              <div className="stat-label">Employee fees</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <div className="stat-number">&lt;2s</div>
              <div className="stat-label">Confirm time</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <div className="stat-number">100%</div>
              <div className="stat-label">Private by default</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-gradient-overlay"></div>
    </section>
  );
};

export default Hero;
