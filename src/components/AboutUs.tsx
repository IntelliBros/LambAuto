import React from 'react';
const AboutUs = () => {
  const aboutItems = [{
    title: 'WHY CHOOSE LAMB?',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }, {
    title: 'MEET THE TEAM',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }, {
    title: 'THE HISTORY OF LAMB',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }];
  return <div className="w-full bg-dark-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl tracking-widest font-light text-center text-white mb-12">
          ABOUT US
          <div className="w-16 h-px bg-accent-red mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutItems.map((item, index) => <div key={index} className="relative overflow-hidden group cursor-pointer">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img src={item.image} alt={item.title} className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
                <h3 className="text-white text-xl tracking-widest font-light text-center px-4 group-hover:text-accent-red transition-colors">
                  {item.title}
                </h3>
                <div className="w-16 h-px bg-accent-red my-4"></div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default AboutUs;