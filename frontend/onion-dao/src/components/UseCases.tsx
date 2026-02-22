import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from './icons/CustomIcons';
import './UseCases.css';

const UseCases: React.FC = () => {
  const navigate = useNavigate();

  const useCases = [
    {
      title: "Merchant Payments",
      description: "Accept stablecoin payments without revealing amounts to competitors or the public",
      icon: "store",
      features: ["Private checkout", "Instant settlement", "Low fees", "Regulatory compliant"],
    },
    {
      title: "Payroll & B2B",
      description: "Private business transactions with full compliance and audit capabilities",
      icon: "building",
      features: ["Employee privacy", "Bulk payments", "Audit trails", "Tax compliance"],
    },
    {
      title: "DeFi Integration",
      description: "Bring privacy to decentralized finance while maintaining transparency",
      icon: "graph",
      features: ["Private lending", "Hidden positions", "MEV protection", "Yield farming"],
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'store':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 9l9-7 9 7-11 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 4V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1-2-2zm0 6v2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2-2z"/>
          </svg>
        );
      case 'building':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <path d="M9 22v-2"/>
            <path d="M12 11V4"/>
            <path d="M12 13V4"/>
          </svg>
        );
      case 'graph':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
            <path d="M12 8v8"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="use-cases" id="use-cases">
      <div className="use-cases-container">
        <div className="use-cases-header">
          <h2 className="use-cases-title">Use cases</h2>
          <p className="use-cases-subtitle">
            Privacy across business, DeFi, and payments
          </p>
        </div>

        <div className="use-cases-grid">
          {useCases.map((useCase, index) => (
            <div key={index} className="use-case-card">
              <div className="card-icon">
                {getIconComponent(useCase.icon)}
              </div>
              <h3 className="card-title">{useCase.title}</h3>
              <p className="card-description">{useCase.description}</p>
              <ul className="card-features">
                {useCase.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <CheckCircleIcon size={14} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="card-button" onClick={() => navigate('/login')}>
                <span>Learn more</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
