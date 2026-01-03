import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Home
        </Link>

        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: January 2025</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using OnionUSD-P, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              OnionUSD-P is a privacy-preserving stablecoin platform built on the Solana blockchain.
              Our service enables confidential transfers where transaction amounts are encrypted
              while maintaining regulatory compliance.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Eligibility</h2>
            <p>To use OnionUSD-P, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding agreements</li>
              <li>Not be prohibited from using the service under applicable laws</li>
              <li>Comply with all applicable regulations in your jurisdiction</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Maintain the security of your wallet and credentials</li>
              <li>Not use the service for illegal activities</li>
              <li>Provide accurate information when required</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Prohibited Activities</h2>
            <p>You may not use OnionUSD-P for:</p>
            <ul>
              <li>Money laundering or terrorist financing</li>
              <li>Fraud or deceptive practices</li>
              <li>Circumventing sanctions or export controls</li>
              <li>Any activity that violates applicable laws</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Fees and Transactions</h2>
            <p>
              Transaction fees are minimal and paid in SOL for network costs.
              All transactions are final once confirmed on the Solana blockchain.
              We are not responsible for transactions sent to incorrect addresses.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Disclaimer of Warranties</h2>
            <p>
              OnionUSD-P is provided "as is" without warranties of any kind.
              We do not guarantee uninterrupted service or that the platform will be error-free.
              Cryptocurrency investments carry inherent risks.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, OnionUSD-P shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use
              of the service.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:thisisaayushbaniya@gmail.com">thisisaayushbaniya@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
