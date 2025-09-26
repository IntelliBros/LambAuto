import React from 'react';
const Insights = () => {
  return <div className="w-full bg-dark-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl tracking-widest font-light text-white mb-8">
              LAMB <span className="text-accent-red">INSIGHTS</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              As one of the leading supercar dealerships we are able to offer
              unique market insights and expert advice on the specs of the
              latest and rarest performance cars in the world.
            </p>
            <button className="bg-accent-red text-white text-xs tracking-widest py-3 px-6 hover:bg-dark-200 transition-colors self-start">
              VIEW INSIGHTS
            </button>
          </div>
          <div className="relative">
            <div className="relative aspect-w-16 aspect-h-9">
              <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="Showroom tour" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-5xl font-light">
                  <div className="text-white text-5xl font-light tracking-widest">
                    SHOWROOM
                  </div>
                  <div className="text-accent-red text-7xl font-light tracking-widest">
                    TOUR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Insights;