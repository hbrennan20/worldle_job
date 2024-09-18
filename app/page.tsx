'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import RunClubCards from './components/Cards';

const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

const LondonRunClub: React.FC = () => {


  return (
    <div className="min-h-screen w-full flex flex-col py-2 bg-gray-50">
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
      <div className="flex-1 relative py-2 md:py-4 flex flex-col">
        <div className="h-[70vh] py-2 md:py-4 bg-white rounded-lg shadow-md overflow-y-auto overflow-x-visible">
          <div className="h-full w-full">
            <MapComponent />
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-black">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-start space-x-4">
              <img src="/images/long-run.jpg" alt="Weekend Long Run" className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-semibold text-black">Weekend Long Run</h3>
                <p className="text-black">Date: Saturday, June 10th, 2023</p>
                <p className="text-black">Time: 8:00 AM</p>
                <p className="text-black">Location: Hyde Park</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex items-start space-x-4">
              <img src="/images/speed-session.jpg" alt="Midweek Speed Session" className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-semibold text-black">Midweek Speed Session</h3>
                <p className="text-black">Date: Wednesday, June 14th, 2023</p>
                <p className="text-black">Time: 6:30 PM</p>
                <p className="text-black">Location: Regent's Park Track</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex items-start space-x-4">
              <img src="/images/charity-run.jpg" alt="Charity Fun Run" className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-semibold text-black">Charity Fun Run</h3>
                <p className="text-black">Date: Sunday, June 18th, 2023</p>
                <p className="text-black">Time: 10:00 AM</p>
                <p className="text-black">Location: Victoria Park</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LondonRunClub;
