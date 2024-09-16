'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import RunClubCards from './components/Cards';

const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

const LondonRunClub: React.FC = () => {


  return (
    <div className="min-h-screen w-full flex flex-col px-4 py-2 bg-gray-200">
      <nav className="bg-gray-800 text-white p-2 flex justify-between items-center flex-wrap">
        <h1 className="text-white m-2 text-lg md:text-2xl text-center w-full md:w-auto">London Social Run Clubs</h1>
        <a 
          href="https://www.google.com"
          target="_blank"
          className="bg-blue-500 text-white p-2 rounded border-none font-bold cursor-pointer m-2 w-full md:w-auto inline-block text-center"
        >
          🏃‍♂️ Add Run Club
        </a>
      </nav>
      <div className="flex-1 relative p-2 md:p-4 flex flex-col">
        <div className="h-[70vh] p-2 md:p-4 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-full w-full">
            <MapComponent />
          </div>
        </div>
        <div className="mt-4 p-2 bg-white rounded shadow-md">
          <h2 className="mb-2 text-lg md:text-xl">Run Club Cards</h2>
          <RunClubCards />
        </div>
      </div>
    </div>
  );
};

export default LondonRunClub;
