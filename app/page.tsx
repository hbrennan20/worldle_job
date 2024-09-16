'use client';

import React from 'react';
import MapComponent from './components/MapComponent';

const LondonRunClub: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <nav style={{ 
        backgroundColor: '#f5f5f5', 
        color: 'white', 
        padding: '1rem',
      }}>
        <h1 style={{ color: 'black' }}>London Run Clubs</h1>
      </nav>
      <div style={{ flex: 1, position: 'relative', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '1rem' }}>
          <MapComponent />
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#f0f0f0', 
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
