import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Home
        </Link>

        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: January 2025</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              OnionUSD-P ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information
              when you use our privacy-preserving payment platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>We collect minimal information necessary to provide our services:</p>
            <ul>
              <li><strong>Wallet Addresses:</strong> Public Solana wallet addresses for transaction processing</li>
              <li><strong>Transaction Data:</strong> On-chain transaction records (amounts are encrypted via confidential transfers)</li>
              <li><strong>Account Information:</strong> Email address for authentication purposes</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul>
              <li>Process confidential transactions on the Solana blockchain</li>
              <li>Provide customer support and account management</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Privacy by Design</h2>
            <p>
              OnionUSD-P leverages Solana's Token-2022 confidential transfer extensions to ensure
              transaction amounts remain private. While wallet addresses are visible on-chain,
              the amounts transferred are encrypted and only visible to transaction participants.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul>
              <li>End-to-end encryption for sensitive communications</li>
              <li>Secure authentication via Firebase</li>
              <li>Regular security audits and monitoring</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Solana Blockchain:</strong> For transaction processing</li>
              <li><strong>Firebase:</strong> For authentication and data storage</li>
              <li><strong>Vercel:</strong> For hosting services</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Contact Us</h2>
            <p>
              For privacy-related inquiries, please contact us at:{' '}
              <a href="mailto:thisisaayushbaniya@gmail.com">thisisaayushbaniya@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
