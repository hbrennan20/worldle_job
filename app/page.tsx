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
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: '#e0e0e0' }}>
      <nav style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' // Added for better wrapping on small screens
      }}>
        <h1 style={{ color: 'white', margin: '0.5rem 0' }}>London Social Runs Clubs</h1>
        <button 
          onClick={handleAddRunClub}
          style={{
            backgroundColor: '#4285F4',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            textDecoration: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '0.5rem 0' // Added margin for better spacing on small screens
          }}
        >
          🏃‍♂️ Add Run Club
        </button>
      </nav>
      <div style={{ flex: 1, position: 'relative', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '1rem 15rem' /* Adjusted padding for better mobile view */ }}>
          <MapComponent />
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#fff', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Notice Board</h2>
          <p>Welcome to London Run Clubs! Check the map for run club locations and upcoming events.</p>
        </div>
      </div>
    </div>
  );
};

export default LondonRunClub;
