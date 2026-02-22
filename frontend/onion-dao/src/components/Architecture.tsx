import React from 'react';
import { CheckCircleIcon, ShieldIcon, WalletIcon, LockIcon } from './icons/CustomIcons';
import './Architecture.css';

const Architecture: React.FC = () => {
  return (
    <section className="architecture" id="architecture">
      <div className="architecture-container">
        <div className="architecture-header">
          <h2 className="architecture-title">How it works</h2>
          <p className="architecture-subtitle">
            Privacy that works, compliance that's maintained
          </p>
        </div>

        <div className="architecture-content">
          <div className="architecture-panel">
            <div className="panel-header">
              <h3 className="panel-title">Privacy technology</h3>
            </div>
            <div className="panel-content">
              <p className="panel-description">
                OnionUSD-P uses Solana's Token-2022 Confidential Transfer extension to hide transaction amounts using zero-knowledge proofs and encrypted balances.
              </p>

              <div className="tech-visualization">
                <div className="tech-flow">
                  <div className="tech-step">
                    <div className="step-icon">
                      <ShieldIcon size={24} />
                    </div>
                    <span className="step-label">Confidential Transfer</span>
                  </div>
                  <div className="tech-step">
                    <div className="step-icon">
                      <WalletIcon size={24} />
                    </div>
                    <span className="step-label">Wallet Integration</span>
                  </div>
                  <div className="tech-step">
                    <div className="step-icon">
                      <CheckCircleIcon size={24} />
                    </div>
                    <span className="step-label">Zero-Knowledge Proof</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="architecture-panel">
            <div className="panel-header">
              <h3 className="panel-title">Compliance ready</h3>
            </div>
            <div className="panel-content">
              <p className="panel-description">
                The OnionUSD-P protocol is fully non-custodial, secured by proven Solana infrastructure for managing private keys across blockchains. With built-in compliance features and optional auditor access for regulatory oversight.
              </p>

              <div className="compliance-features">
                <div className="compliance-item">
                  <div className="compliance-icon">
                    <LockIcon size={20} />
                  </div>
                  <div className="compliance-label">
                    <span className="label-text">Secure</span>
                    <p className="label-description">Multi-signature protection</p>
                  </div>
                </div>
                <div className="compliance-item">
                  <div className="compliance-icon">
                    <CheckCircleIcon size={20} />
                  </div>
                  <div className="compliance-label">
                    <span className="label-text">Auditable</span>
                    <p className="label-description">Full chain transparency</p>
                  </div>
                </div>
              </div>

              <div className="user-access">
                <div className="user-icon">
                  <CheckCircleIcon size={20} />
                </div>
                <div className="user-label">User-controlled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
