import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { ChevronRightIcon, ChevronLeftIcon, FilterIcon } from 'lucide-react';
const CurrentStock = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [sortOrder, setSortOrder] = useState('Price: High - Low');
  const [perPage, setPerPage] = useState('36');
  const [viewMode, setViewMode] = useState('list');
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000000  // Set high initial max to include all cars
  });
  const [selectedBodyStyles, setSelectedBodyStyles] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // For mobile
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true); // For desktop - start collapsed
  // Car data with additional properties for filtering
  const carsData = [{
    title: 'ASTON MARTIN VALKYRIE',
    year: '2023',
    yearCount: '(23)',
    color: 'Lennox Green',
    mileage: '107',
    price: 'POA',
    numericPrice: 2500000,
    brand: 'Aston Martin',
    bodyStyle: 'Hypercar',
    image: "https://images.unsplash.com/photo-1676548784916-c899cf0e3065?q=80&w=2940&auto=format&fit=crop"
  }, {
    title: 'LAMBORGHINI AVENTADOR SVJ',
    year: '2023',
    yearCount: '(75)',
    color: 'MANUFAKTUR Verde Mantis',
    mileage: '15',
    price: 'POA',
    numericPrice: 800000,
    brand: 'Lamborghini',
    bodyStyle: 'Supercar',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80'
  }, {
    title: 'FERRARI SF90 STRADALE',
    year: '2023',
    yearCount: '(74)',
    color: 'Black Sapphire Metallic',
    mileage: '968',
    price: '£699,950',
    numericPrice: 699950,
    brand: 'Ferrari',
    bodyStyle: 'Supercar',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
  }, {
    title: 'LAMBORGHINI URUS',
    year: '2023',
    yearCount: '(25)',
    color: 'Santorini Black',
    mileage: '499',
    price: '£124,950',
    numericPrice: 124950,
    brand: 'Lamborghini',
    bodyStyle: 'SUV',
    priceSub: 'inc. VAT',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2940&auto=format&fit=crop'
  }];
  // Get unique brands and body styles for filter options
  const brands = [...new Set(carsData.map(car => car.brand))].sort();
  const bodyStyles = [...new Set(carsData.map(car => car.bodyStyle))].sort();
  // Min and max prices for the price filter
  const minPrice = 0;
  const maxPrice = Math.max(...carsData.map(car => car.numericPrice));
  // Filter the cars based on selected filters
  const [filteredCars, setFilteredCars] = useState(carsData);
  // Count active filters
  const activeFilterCount = selectedBrands.length + selectedBodyStyles.length + (priceRange.min > minPrice ? 1 : 0) + (priceRange.max < maxPrice ? 1 : 0);
  useEffect(() => {
    let filtered = carsData;
    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(car => selectedBrands.includes(car.brand));
    }
    // Filter by price range
    filtered = filtered.filter(car => car.numericPrice >= priceRange.min && car.numericPrice <= priceRange.max);
    // Filter by body style
    if (selectedBodyStyles.length > 0) {
      filtered = filtered.filter(car => selectedBodyStyles.includes(car.bodyStyle));
    }
    setFilteredCars(filtered);
  }, [selectedBrands, priceRange, selectedBodyStyles]);
  // Handle brand filter changes
  const handleBrandChange = brand => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  // Handle body style filter changes
  const handleBodyStyleChange = style => {
    if (selectedBodyStyles.includes(style)) {
      setSelectedBodyStyles(selectedBodyStyles.filter(s => s !== style));
    } else {
      setSelectedBodyStyles([...selectedBodyStyles, style]);
    }
  };
  // Handle price range changes
  const handlePriceChange = (type, value) => {
    setPriceRange({
      ...priceRange,
      [type]: parseInt(value)
    });
  };
  // Format price for display
  const formatPrice = price => {
    return price.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    });
  };
  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange({
      min: minPrice,
      max: maxPrice
    });
    setSelectedBodyStyles([]);
  };
  // Toggle filter collapse state
  const toggleFilterCollapse = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };
  return <div className="w-full bg-dark-900 text-white min-h-screen">
      <Header forceBackground={true} />
      <div className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 relative">
            {/* Filter sidebar - Mobile toggle */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <button onClick={() => setShowFilters(!showFilters)} className="bg-dark-300 text-white text-xs tracking-widest py-3 px-6 hover:bg-accent-red transition-colors flex items-center">
                <FilterIcon className="w-4 h-4 mr-2" />
                {showFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}
              </button>
              {activeFilterCount > 0 && <button onClick={resetFilters} className="text-accent-red text-xs tracking-widest py-3 px-6 border border-accent-red hover:bg-accent-red hover:text-white transition-colors">
                  RESET FILTERS
                </button>}
            </div>
            {/* Desktop filter sidebar with collapse functionality */}
            <div className={`
              hidden md:block
              ${isFilterCollapsed ? 'md:w-0 overflow-hidden' : 'md:w-1/4'}
              transition-all duration-300 ease-in-out relative
            `}>
              {/* Filter content with contrasting background */}
              <div className="bg-dark-600 p-6 mb-6 border-r-4 border-accent-red rounded-tr-md rounded-br-md" style={{
              position: 'fixed',
              top: 'calc(50% + 30px)',
              transform: 'translateY(-50%)',
              maxHeight: '70vh',
              overflowY: 'auto',
              width: isFilterCollapsed ? '0' : '280px',
              zIndex: 9,
              left: isFilterCollapsed ? '-300px' : '0',
              transition: 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), width 0.4s ease-in-out, opacity 0.3s ease-in-out, transform 0.4s ease-in-out',
              boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
              opacity: isFilterCollapsed ? 0 : 1,
              transform: isFilterCollapsed ? 'translateY(-50%) translateX(-20px)' : 'translateY(-50%) translateX(0)'
            }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">FILTERS</h3>
                  {activeFilterCount > 0 && <button onClick={resetFilters} className="text-accent-red text-xs hover:underline">
                      Reset All
                    </button>}
                </div>
                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    BRAND
                  </h4>
                  <div className="space-y-2">
                    {brands.map(brand => <div key={brand} className="flex items-center">
                        <input type="checkbox" id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="mr-2 accent-accent-red" />
                        <label htmlFor={`brand-${brand}`} className="text-sm text-gray-300">
                          {brand}
                        </label>
                      </div>)}
                  </div>
                </div>
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    PRICE RANGE
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        MIN PRICE
                      </label>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">£</span>
                        <input type="number" min={minPrice} max={priceRange.max} value={priceRange.min} onChange={e => handlePriceChange('min', e.target.value)} className="bg-dark-700 border border-gray-700 text-white px-2 py-1 w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        MAX PRICE
                      </label>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">£</span>
                        <input type="number" min={priceRange.min} max={maxPrice} value={priceRange.max} onChange={e => handlePriceChange('max', e.target.value)} className="bg-dark-700 border border-gray-700 text-white px-2 py-1 w-full" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Range: {formatPrice(priceRange.min)} -{' '}
                      {formatPrice(priceRange.max)}
                    </div>
                  </div>
                </div>
                {/* Body Style Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    BODY STYLE
                  </h4>
                  <div className="space-y-2">
                    {bodyStyles.map(style => <div key={style} className="flex items-center">
                        <input type="checkbox" id={`style-${style}`} checked={selectedBodyStyles.includes(style)} onChange={() => handleBodyStyleChange(style)} className="mr-2 accent-accent-red" />
                        <label htmlFor={`style-${style}`} className="text-sm text-gray-300">
                          {style}
                        </label>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Collapse/Expand tab for desktop with filter icon */}
            <div className="hidden md:block fixed left-0 top-1/2 transform -translate-y-1/2 z-10" style={{
            left: isFilterCollapsed ? '0' : '280px',
            top: 'calc(50% + 30px)',
            transition: 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
              <button onClick={toggleFilterCollapse} className="bg-accent-red h-24 w-10 flex items-center justify-center rounded-r-md shadow-lg focus:outline-none" aria-label={isFilterCollapsed ? 'Expand filters' : 'Collapse filters'}>
                <FilterIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            {/* Mobile filter panel */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:hidden mb-6`}>
              <div className="bg-dark-600 p-6 mb-6 border-r-4 border-accent-red rounded-tr-md rounded-br-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">FILTERS</h3>
                  {activeFilterCount > 0 && <button onClick={resetFilters} className="text-accent-red text-xs hover:underline">
                      Reset All
                    </button>}
                </div>
                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    BRAND
                  </h4>
                  <div className="space-y-2">
                    {brands.map(brand => <div key={brand} className="flex items-center">
                        <input type="checkbox" id={`mobile-brand-${brand}`} checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="mr-2 accent-accent-red" />
                        <label htmlFor={`mobile-brand-${brand}`} className="text-sm text-gray-300">
                          {brand}
                        </label>
                      </div>)}
                  </div>
                </div>
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    PRICE RANGE
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        MIN PRICE
                      </label>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">£</span>
                        <input type="number" min={minPrice} max={priceRange.max} value={priceRange.min} onChange={e => handlePriceChange('min', e.target.value)} className="bg-dark-700 border border-gray-700 text-white px-2 py-1 w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        MAX PRICE
                      </label>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">£</span>
                        <input type="number" min={priceRange.min} max={maxPrice} value={priceRange.max} onChange={e => handlePriceChange('max', e.target.value)} className="bg-dark-700 border border-gray-700 text-white px-2 py-1 w-full" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Range: {formatPrice(priceRange.min)} -{' '}
                      {formatPrice(priceRange.max)}
                    </div>
                  </div>
                </div>
                {/* Body Style Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-3 border-b border-gray-700 pb-2">
                    BODY STYLE
                  </h4>
                  <div className="space-y-2">
                    {bodyStyles.map(style => <div key={style} className="flex items-center">
                        <input type="checkbox" id={`mobile-style-${style}`} checked={selectedBodyStyles.includes(style)} onChange={() => handleBodyStyleChange(style)} className="mr-2 accent-accent-red" />
                        <label htmlFor={`mobile-style-${style}`} className="text-sm text-gray-300">
                          {style}
                        </label>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Car listings */}
            <div className={`
              ${showFilters ? 'w-full' : 'w-full'} 
              ${isFilterCollapsed ? 'md:w-full' : 'md:w-3/4'}
              transition-all duration-300 ease-in-out
            `}>
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm text-gray-400">
                  Showing {filteredCars.length} of {carsData.length} vehicles
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">ORDER BY</span>
                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="bg-transparent border border-gray-700 text-white px-4 py-2 appearance-none">
                      <option value="Price: High - Low">
                        Price: High - Low
                      </option>
                      <option value="Price: Low - High">
                        Price: Low - High
                      </option>
                      <option value="Latest">Latest</option>
                      <option value="Oldest">Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
              {filteredCars.length === 0 ? <div className="bg-dark-800 p-8 text-center">
                  <p className="text-lg text-gray-300 mb-4">
                    No vehicles match your current filters
                  </p>
                  <button onClick={resetFilters} className="bg-accent-red text-white text-xs tracking-widest py-3 px-6 hover:bg-dark-200 transition-colors">
                    RESET FILTERS
                  </button>
                </div> : viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car, index) => <div key={index} className="flex flex-col bg-white group shadow-md">
                      <div className="mb-4 relative overflow-hidden">
                        <img src={car.image} alt={car.title} className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-0 right-0 bg-accent-red text-white text-xs px-3 py-1">
                          {car.bodyStyle}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium tracking-wider text-dark-900 mb-4">
                          {car.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div className="text-sm text-gray-600">YEAR:</div>
                          <div className="text-sm text-dark-800">
                            {car.year} {car.yearCount}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div className="text-sm text-gray-600">COLOUR:</div>
                          <div className="text-sm text-dark-800">
                            {car.color}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-sm text-gray-600">MILEAGE:</div>
                          <div className="text-sm text-dark-800">
                            {car.mileage}
                          </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mt-auto">
                          <div className="text-right mb-4">
                            <div className="text-lg font-medium text-accent-red">
                              {car.price}
                            </div>
                            {car.priceSub && <div className="text-xs text-gray-600">
                                {car.priceSub}
                              </div>}
                          </div>
                          <button className="w-full bg-dark-300 text-white text-xs tracking-widest py-3 px-6 hover:bg-accent-red transition-colors">
                            VIEW VEHICLE
                          </button>
                        </div>
                      </div>
                    </div>)}
                </div> : <div className="flex flex-col space-y-8">
                  {filteredCars.map((car, index) => <div key={index} className="flex flex-col md:flex-row bg-white group overflow-hidden shadow-md">
                      <div className="relative w-full md:w-1/3 overflow-hidden">
                        <img src={car.image} alt={car.title} className="w-full h-[280px] md:h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-0 right-0 bg-accent-red text-white text-xs px-3 py-1">
                          {car.bodyStyle}
                        </div>
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="w-full md:w-2/3 p-6 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                          <h3 className="text-xl font-medium tracking-wider text-dark-900 mb-2 md:mb-0">
                            {car.title}
                          </h3>
                          <div className="text-right">
                            <div className="text-xl font-medium text-accent-red">
                              {car.price}
                            </div>
                            {car.priceSub && <div className="text-xs text-gray-600">
                                {car.priceSub}
                              </div>}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-600 mb-1">
                              YEAR:
                            </div>
                            <div className="text-sm text-dark-800">
                              {car.year} {car.yearCount}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-600 mb-1">
                              COLOUR:
                            </div>
                            <div className="text-sm text-dark-800">
                              {car.color}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-600 mb-1">
                              MILEAGE:
                            </div>
                            <div className="text-sm text-dark-800">
                              {car.mileage}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-600 mb-1">
                              BODY STYLE:
                            </div>
                            <div className="text-sm text-dark-800">
                              {car.bodyStyle}
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button className="bg-dark-300 text-white text-xs tracking-widest py-3 px-8 hover:bg-accent-red transition-colors">
                            VIEW VEHICLE
                          </button>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CurrentStock;