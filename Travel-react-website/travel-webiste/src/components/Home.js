import React from 'react';
import './../App.css';
import Cards from './Pages/Cards';  
import HeroSection from './Pages/HeroSection';
import Footer from './Pages/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;