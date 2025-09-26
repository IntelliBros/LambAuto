import React from 'react';
const Welcome = () => {
  return <div className="w-full bg-dark-800 py-20">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-sm tracking-widest text-accent-red mb-2">
          WELCOME TO
        </h2>
        <h1 className="text-4xl tracking-widest font-light text-white mb-8">
          LAMB AUTO
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          We are a family run business, an independent luxury car dealership
          established in 1994 with a curated selection of the latest supercars,
          luxury SUVs and modern performance cars for sale.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We pride ourselves on preparing and presenting them to the very
          highest standards whilst our long-serving staff are dedicated to
          building relationships and ensuring the experience of buying or
          selling supercars is always an enjoyable, seamless and secure process.
        </p>
      </div>
    </div>;
};
export default Welcome;