import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import ServiceCards from './components/ServiceCards';
import LatestArrivals from './components/LatestArrivals';
import AboutUs from './components/AboutUs';
import Insights from './components/Insights';
import Footer from './components/Footer';
export function App() {
  return <div className="w-full bg-dark-900 text-white">
      <Header />
      <Hero />
      <Welcome />
      <ServiceCards />
      <LatestArrivals />
      <AboutUs />
      <Insights />
      <Footer />
    </div>;
}