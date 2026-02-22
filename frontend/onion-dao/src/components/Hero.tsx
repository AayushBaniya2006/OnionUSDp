import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldIcon,
  ArrowRightIcon,
  WalletIcon,
  VerifiedIcon,
  CheckCircleIcon
} from './icons/CustomIcons';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <div className="hero-tag">
              <ShieldIcon className="tag-icon" size={18} />
              <span className="tag-text">Private payments</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line-1">
                Pay teams
              </span>
              <span className="title-line-2">
                privately
              </span>
            </h1>

            <p className="hero-description">
              Send confidential salary payments on Solana without exposing amounts.
              Privacy that works, compliance that's maintained.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="hero-btn hero-btn-primary">
                <span className="btn-text">Get started</span>
                <ArrowRightIcon className="btn-icon" size={20} />
              </Link>
              <a href="#getting-started" className="hero-btn hero-btn-secondary">
                <span className="btn-text">How it works</span>
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <VerifiedIcon className="trust-icon" size={20} />
                <span>On-chain auditable</span>
              </div>
              <div className="trust-item">
                <WalletIcon className="trust-icon" size={20} />
                <span>Confidential transfers</span>
              </div>
              <div className="trust-item">
                <CheckCircleIcon className="trust-icon" size={20} />
                <span>Fast confirmations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="card-header">
              <WalletIcon className="card-icon" size={28} />
              <div className="card-title">Your wallet, encrypted</div>
            </div>
            <div className="card-content">
              <div className="card-stat">
                <span className="stat-label">Amount</span>
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
                  <CheckCircleIcon className="status-icon" size={16} />
                  <span>Confirmed</span>
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
              <div className="stat-label">Private</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
