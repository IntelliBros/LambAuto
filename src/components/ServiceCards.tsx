import React from 'react';
import { Link } from 'react-router-dom';
const ServiceCards = () => {
  const services = [{
    title: 'CURRENT STOCK',
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    link: '/current-stock'
  }, {
    title: 'SELL YOUR CAR',
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    link: '#'
  }, {
    title: 'NEWS & EVENTS',
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    link: '#'
  }];
  return <div className="w-full bg-dark-900 pt-16 pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => <Link key={index} to={service.link} className="relative overflow-hidden group cursor-pointer block bg-gradient-to-b from-gray-900 to-black shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.9)] transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02]">
              <div className="relative h-[650px] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:rotate-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right delay-100" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-12 transform transition-all duration-700 group-hover:translate-y-[-12px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      <div className="w-1 h-8 bg-red-600 transform transition-all duration-500 group-hover:h-10"></div>
                      <div className="w-1 h-6 bg-red-600/70 transform transition-all duration-500 delay-75 group-hover:h-8"></div>
                      <div className="w-1 h-4 bg-red-600/40 transform transition-all duration-500 delay-150 group-hover:h-6"></div>
                    </div>
                    <h3 className="text-white text-2xl tracking-[0.3em] font-thin uppercase transition-all duration-500 group-hover:text-red-400 group-hover:tracking-[0.35em]">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <div className="w-20 h-[1px] bg-gradient-to-r from-red-600 to-transparent"></div>
                    <span className="text-white/80 text-xs tracking-[0.2em] uppercase">View Collection</span>
                    <svg className="w-4 h-4 text-red-500 transform transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>)}
        </div>
      </div>
    </div>;
};
export default ServiceCards;