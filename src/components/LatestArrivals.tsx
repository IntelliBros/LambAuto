import React from 'react';
const LatestArrivals = () => {
  const cars = [{
    title: 'LAMBORGHINI AVENTADOR SVJ',
    year: '2023',
    yearCount: '(75)',
    color: 'MANUFAKTUR Verde Mantis',
    mileage: '15',
    price: 'UNDER OFFER',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80'
  }, {
    title: 'FERRARI SF90 STRADALE',
    year: '2023',
    yearCount: '(74)',
    color: 'Black Sapphire Metallic',
    mileage: '968',
    price: '£699,950',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }, {
    title: 'LAMBORGHINI URUS',
    year: '2023',
    yearCount: '(25)',
    color: 'Santorini Black',
    mileage: '499',
    price: '£124,950',
    priceSub: 'inc. VAT',
    image: 'https://images.unsplash.com/photo-1619019187211-adf2f6119afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }, {
    title: 'LAMBORGHINI HURACAN STO',
    year: '2021',
    yearCount: '(71)',
    color: 'MANUFAKTUR Olive Metallic',
    mileage: '26,759',
    price: 'UNDER OFFER',
    image: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }];
  return <div className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl tracking-widest font-light text-center text-dark-900 mb-12">
          LATEST ARRIVALS
          <div className="w-16 h-px bg-accent-red mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car, index) => <div key={index} className="flex flex-col">
              <h3 className="text-sm font-medium tracking-wider text-dark-900 mb-4">
                {car.title}
              </h3>
              <div className="mb-4 relative overflow-hidden">
                <img src={car.image} alt={car.title} className="w-full h-[220px] object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-xs text-gray-500">YEAR:</div>
                <div className="text-xs text-dark-800">
                  {car.year} {car.yearCount}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-xs text-gray-500">COLOUR:</div>
                <div className="text-xs text-dark-800">{car.color}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-xs text-gray-500">MILEAGE:</div>
                <div className="text-xs text-dark-800">{car.mileage}</div>
              </div>
              <div className="mt-auto">
                <div className="text-right mb-4">
                  <div className="text-sm font-medium text-accent-red">
                    {car.price}
                  </div>
                  {car.priceSub && <div className="text-xs text-gray-500">{car.priceSub}</div>}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-8">
                  <button className="w-full bg-dark-900 text-white text-xs tracking-widest py-3 px-6 hover:bg-accent-red transition-colors">
                    VIEW VEHICLE
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default LatestArrivals;