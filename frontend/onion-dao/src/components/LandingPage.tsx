import React from 'react';
import Navbar from './navbar'
import Hero from './Hero'
import FAQ from './FAQ'
import Architecture from './Architecture'
import AdvancedFeatures from './AdvancedFeatures'
import UseCases from './UseCases'
import GettingStarted from './GettingStarted'
import Footer from './Footer'

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FAQ />
      <Architecture />
      <AdvancedFeatures />
      <UseCases />
      <GettingStarted />
      <Footer />
    </>
  );
};

export default LandingPage; 