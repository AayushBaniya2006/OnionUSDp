import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldIcon,
  QRCodeIcon,
  CheckCircleIcon,
  CodeIcon,
  LockIcon,
  ArrowRightIcon
} from './icons/CustomIcons';
import './AdvancedFeatures.css';

const AdvancedFeatures: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Confidential transfers",
      subtitle: "Hide amounts, preserve privacy",
      description: "Transfer OnionUSD-P without revealing transaction amounts on-chain. Only sender and receiver can see the actual values.",
      icon: "shield",
      details: [
        { label: "Zero-knowledge proofs", value: "Proofs for amount hiding" },
        { label: "Homomorphic encryption", value: "Balance confidentiality" },
        { label: "Privacy levels", value: "Amount-level privacy" },
        { label: "Compliance", value: "Address visibility maintained" }
      ]
    },
    {
      title: "Solana Pay integration",
      subtitle: "Accept private payments instantly",
      description: "Seamlessly integrate with Solana Pay for merchant payments, QR codes, and payment requests with full privacy.",
      icon: "qr",
      details: [
        { label: "QR code payments", value: "Private payment requests" },
        { label: "Settlement speed", value: "Less than 1 second" },
        { label: "Transaction fees", value: "$0.00025 average" },
        { label: "Integration", value: "One-line SDK" }
      ]
    },
    {
      title: "Multisig governance",
      subtitle: "Decentralized control via Squads",
      description: "Token governance managed through established Squads multisig for enhanced security and decentralized decision making.",
      icon: "lock",
      details: [
        { label: "Multisig security", value: "Squads protocol" },
        { label: "Threshold control", value: "Customizable M-of-N" },
        { label: "Governance actions", value: "Mint, freeze, upgrade" },
        { label: "Transparency", value: "On-chain proposals" }
      ]
    },
    {
      title: "Developer APIs",
      subtitle: "Build privacy into your app",
      description: "Comprehensive APIs and SDKs for integrating OnionUSD-P into any application with minimal code changes.",
      icon: "code",
      details: [
        { label: "REST API", value: "Full HTTP interface" },
        { label: "SDK support", value: "TypeScript, Rust, Python" },
        { label: "Documentation", value: "Complete guides & examples" },
        { label: "Sandbox", value: "Free testnet access" }
      ]
    }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <ShieldIcon size={24} />;
      case 'qr':
        return <QRCodeIcon size={24} />;
      case 'lock':
        return <LockIcon size={24} />;
      case 'code':
        return <CodeIcon size={24} />;
      default:
        return null;
    }
  };

  return (
    <section className="advanced-features" id="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">
            Advanced features
          </h2>
          <p className="features-subtitle">
            From confidential transfers to seamless integrations, we've got you covered
          </p>
        </div>

        <div className="features-content">
          <div className="features-tabs">
            {features.map((feature, index) => (
              <button
                key={index}
                className={`feature-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <div className="tab-header">
                  <span className="tab-icon">
                    {getIconComponent(feature.icon)}
                  </span>
                  <div className="tab-content">
                    <h3 className="tab-title">{feature.title}</h3>
                    <p className="tab-subtitle">{feature.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="feature-showcase">
            <div className="showcase-info">
              <div className="showcase-badge">
                <CheckCircleIcon className="badge-icon" size={16} />
                <span className="badge-text">Feature highlight</span>
              </div>

              <h3 className="showcase-title">{features[activeTab].title}</h3>
              <p className="showcase-description">{features[activeTab].description}</p>

              <div className="feature-details">
                {features[activeTab].details.map((detail, index) => (
                  <div key={index} className="detail-row">
                    <span className="detail-label">{detail.label}</span>
                    <span className="detail-value">{detail.value}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary showcase-btn" onClick={() => navigate('/login')}>
                <span>Get started</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
