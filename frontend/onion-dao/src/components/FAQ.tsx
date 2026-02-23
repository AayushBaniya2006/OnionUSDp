import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/CustomIcons';
import './FAQ.css';

interface FAQItem {
  question: string;
  answer: string;
  expanded?: boolean;
}

const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const faqItems: FAQItem[] = [
    {
      question: "What is OnionUSD-P?",
      answer: "OnionUSD-P is a USD-pegged stablecoin that leverages Solana's Token-2022 Confidential Transfer extension for privacy. It enables private stablecoin transactions by hiding amounts on-chain while preserving compliance capabilities and maintaining regulatory visibility.",
    },
    {
      question: "How secure is OnionUSD-P?",
      answer: "OnionUSD-P is built on Solana's proven Token-2022 framework with established cryptography. It uses zero-knowledge proofs for amount privacy and encrypted balances. All smart contracts are auditable and the protocol includes multi-signature controls for enhanced security.",
    },
    {
      question: "Can I use OnionUSD-P for DeFi?",
      answer: "Yes, OnionUSD-P can be used in DeFi applications while keeping transaction amounts private. It integrates with Solana's DeFi ecosystem and works with DEXs, lending protocols, and other applications that support Token-2022 standards.",
    },
    {
      question: "How does OnionUSD-P offer privacy?",
      answer: "OnionUSD-P uses Solana's Confidential Transfer extension which employs zero-knowledge proofs to hide transaction amounts. Only the sender and receiver can see the actual amounts, while the blockchain shows encrypted values. Addresses remain visible for compliance purposes.",
    },
    {
      question: "Is OnionUSD-P decentralized?",
      answer: "OnionUSD-P operates with a hybrid model. The token itself runs on decentralized Solana infrastructure, and governance can be managed through multi-signature wallets or DAOs. However, reserve management and compliance features may require some oversight to meet regulatory requirements.",
    },
  ];

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Common questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about OnionUSD-P
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${expandedItems.has(index) ? 'expanded' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleExpanded(index)}
                  aria-expanded={expandedItems.has(index)}
                >
                  <span className="question-text">{item.question}</span>
                  <ArrowRightIcon
                    className={`expand-icon ${expandedItems.has(index) ? 'expanded' : ''}`}
                    size={16}
                  />
                </button>

                <div className="faq-answer">
                  <div className="answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
