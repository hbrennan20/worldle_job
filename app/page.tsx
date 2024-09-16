'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

const LondonRunClub: React.FC = () => {
  const handleAddRunClub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    // Placeholder for future functionality
    console.log('Add Run Club clicked');
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-2 bg-gray-200">
      <nav className="bg-gray-800 text-white p-2 flex justify-between items-center flex-wrap">
        <h1 className="text-white m-2 text-lg md:text-2xl text-center w-full md:w-auto">London Social Run Clubs</h1>
        <button 
          onClick={handleAddRunClub}
          className="bg-blue-500 text-white p-2 rounded border-none font-bold cursor-pointer m-2 w-full md:w-auto"
        >
          🏃‍♂️ Add Run Club
        </button>
      </nav>
      <div className="flex-1 relative p-2 md:p-4 flex flex-col">
        <div className="flex-1 p-2 md:p-4">
          <MapComponent />
        </div>
        <div className="mt-2 p-2 bg-white rounded shadow-md">
          <h2 className="mb-2 text-lg md:text-xl">Notice Board</h2>
          <p className="text-sm md:text-base">Welcome to London Run Clubs! Check the map for run club locations and upcoming events.</p>
        </div>
      </div>
    </div>
  );
};

export default LondonRunClub;
