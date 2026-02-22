import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, WalletIcon, CodeIcon, BusinessIcon, CheckCircleIcon } from './icons/CustomIcons';
import './GettingStarted.css';

const GettingStarted: React.FC = () => {
  const navigate = useNavigate();

  const handleTrackAction = (cta: string) => {
    switch (cta) {
      case 'Download Wallet':
        window.open('https://phantom.app', '_blank');
        break;
      case 'View Documentation':
        navigate('/login');
        break;
      case 'Contact Sales':
        window.location.href = 'mailto:thisisaayushbaniya@gmail.com';
        break;
      default:
        navigate('/login');
    }
  };

  const tracks = [
    {
      title: "Users",
      subtitle: "Send private payments",
      description: "Get started with OnionUSD-P in minutes",
      icon: "wallet",
      steps: [
        "Install a compatible wallet",
        "Acquire OnionUSD-P tokens",
        "Enable confidential transfers",
        "Send private payments"
      ],
      cta: "Download Wallet"
    },
    {
      title: "Developers",
      subtitle: "Integrate OnionUSD-P",
      description: "Build privacy into your applications",
      icon: "code",
      steps: [
        "Install OnionUSD-P SDK",
        "Set up testnet environment",
        "Implement confidential transfers",
        "Deploy to production"
      ],
      cta: "View Documentation"
    },
    {
      title: "Businesses",
      subtitle: "Accept payments",
      description: "Enable private payments for your business",
      icon: "business",
      steps: [
        "Sign up for business account",
        "Integrate payment APIs",
        "Configure compliance settings",
        "Start accepting payments"
      ],
      cta: "Contact Sales"
    }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'wallet':
        return <WalletIcon />;
      case 'code':
        return <CodeIcon />;
      case 'business':
        return <BusinessIcon />;
      default:
        return null;
    }
  };

  return (
    <section className="getting-started" id="getting-started">
      <div className="getting-started-container">
        <div className="getting-started-header">
          <h2 className="getting-started-title">Getting started</h2>
          <p className="getting-started-subtitle">
            Choose how you want to use OnionUSD-P
          </p>
        </div>

        <div className="tracks-grid">
          {tracks.map((track, index) => (
            <div key={index} className="track-card">
              <div className="track-header">
                <div className="track-icon">
                  {getIconComponent(track.icon)}
                </div>
                <div className="track-info">
                  <h3 className="track-title">{track.title}</h3>
                  <p className="track-subtitle">{track.subtitle}</p>
                </div>
              </div>

              <p className="track-description">{track.description}</p>

              <div className="track-steps">
                {track.steps.map((step, idx) => (
                  <div key={idx} className="track-step">
                    <div className="step-number">{idx + 1}</div>
                    <span className="step-text">{step}</span>
                  </div>
                ))}
              </div>

              <button className="track-button" onClick={() => handleTrackAction(track.cta)}>
                <span className="button-text">{track.cta}</span>
                <ArrowRightIcon className="button-icon" size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="ecosystem-info">
          <h3 className="ecosystem-title">Built on Solana</h3>
          <p className="ecosystem-description">
            High-performance blockchain with Token-2022 extensions for security and speed
          </p>
          <div className="ecosystem-badges">
            <div className="ecosystem-badge">
              <CheckCircleIcon className="badge-icon" size={20} />
              <span className="badge-text">Fast confirmations</span>
            </div>
            <div className="ecosystem-badge">
              <CheckCircleIcon className="badge-icon" size={20} />
              <span className="badge-text">Low fees</span>
            </div>
            <div className="ecosystem-badge">
              <CheckCircleIcon className="badge-icon" size={20} />
              <span className="badge-text">Proven security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
