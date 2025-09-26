import React, { useState } from 'react';
import { YoutubeIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Subscribing email:', email);
    // Reset form
    setEmail('');
    // Show success message or handle accordingly
  };
  return <footer className="w-full text-dark-900">
      {/* Newsletter Signup Section */}
      <div className="w-full bg-dark-900 py-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-md">
            <h3 className="text-xl tracking-widest mb-3 text-white">
              SIGN UP TO OUR MAILING LIST
            </h3>
            <p className="text-sm text-gray-400">
              Be the first to find out about latest stock, exclusive previews,
              event invitations and special offers.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-auto flex">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address..." className="bg-gray-100 text-dark-900 px-4 py-3 w-full md:w-64 focus:outline-none border border-gray-700" required />
            <button type="submit" className="bg-accent-red text-white px-6 py-3 font-medium tracking-wider hover:bg-accent-red/90 transition-colors duration-300">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      {/* Company Info Section */}
      <div className="w-full bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6 font-serif">
            <div className="text-3xl font-light tracking-wider text-center">
              LAMB <span className="text-accent-red">AUTO</span>
            </div>
          </div>
          {/* Address */}
          <div className="text-sm text-gray-600 mb-6 text-center">
            LAMB AUTO, 3400 SOURCES BLVD, DOLLARD-DES ORMEAUX, QUEBEC H9B 1Z9
          </div>
          {/* Social Icons */}
          <div className="flex space-x-6 mb-6">
            <a href="#" className="text-dark-900 hover:text-accent-red transition-colors">
              <YoutubeIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-dark-900 hover:text-accent-red transition-colors">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-dark-900 hover:text-accent-red transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-dark-900 hover:text-accent-red transition-colors">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-dark-900 hover:text-accent-red transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
          {/* Phone Number */}
          <div className="text-lg text-dark-900">
            <a href="tel:5142610469" className="hover:text-accent-red transition-colors">
              (514) 261-0469
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;