import React, { useEffect, useState } from 'react';
import { PhoneIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const Header = ({
  forceBackground = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Get the height of the hero section (approximate screen height)
      const heroHeight = window.innerHeight;
      // Check if we've scrolled past the hero section
      if (window.scrollY > heroHeight - 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <header className={`w-full py-11 fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled || forceBackground ? 'bg-dark-900 text-white shadow-md' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <nav className="flex items-center space-x-8">
          <Link to="/" className={`text-sm tracking-widest hover:text-accent-red transition-colors`}>
            HOME
          </Link>
          <Link to="/current-stock" className={`text-sm tracking-widest hover:text-accent-red transition-colors`}>
            CURRENT STOCK
          </Link>
          <a href="#" className={`text-sm tracking-widest hover:text-accent-red transition-colors`}>
            SELL YOUR CAR
          </a>
        </nav>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="font-serif">
            <div className="text-2xl font-light tracking-wider text-center">
              LAMB <span className="text-accent-red">AUTO</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          <a href="#" className={`text-sm tracking-widest hover:text-accent-red transition-colors`}>
            INSIGHTS
          </a>
          <a href="#" className={`text-sm tracking-widest hover:text-accent-red transition-colors flex items-center`}>
            ABOUT US
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </a>
          <a href="#" className={`text-sm tracking-widest hover:text-accent-red transition-colors`}>
            CONTACT US
          </a>
          <a href="tel:" className={`text-sm text-accent-red hover:opacity-80 transition-opacity`}>
            <PhoneIcon className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>;
};
export default Header;