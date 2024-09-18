'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import geojson from '../markers.json';
import Popup from './Popup';

interface Marker {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    iconSize: [number, number];
    imageId: number;
    name: string;
    description: string;
    location: string;
    timetable: string;
    message: string;
    instagram: string; // Add this line
  };
}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGIyMDAwIiwiYSI6ImNtMGU3cmI5YjBpMnoya3I0ZHZwYXM5MG4ifQ.AnJMH_l3Hg_W2loQDdM-MQ';

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/hb2000/cm184hssc029201qu3fc1eogd',
      center: [-0.1575, 51.5074],
      zoom: 12,
      maxZoom: 15,
      minZoom: 10,
      pitchWithRotate: false,
      dragRotate: false,
      // Add these lines:
      bearing: 0,
      pitch: 0,
    });

    map.current = newMap;

    newMap.on('load', () => {
      (geojson.features as unknown as Marker[]).forEach((marker) => {
        const el = document.createElement('div');        
        const width = marker.properties.iconSize[0] * 0.7;
        const height = marker.properties.iconSize[1] * 0.7;
        el.className = 'marker';
        el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${Math.round(width)}/${Math.round(height)})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        el.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent the click from reaching the map
          handleMarkerSelect(marker);
        });

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(newMap);
      });
    });

    // Add this new event listener
    newMap.on('click', () => {
      setIsSidebarOpen(false);
    });

    // Add this line after map initialization
    newMap.dragRotate.disable();
    newMap.touchZoomRotate.disableRotation();

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current && selectedMarker) {
      map.current.flyTo({
        center: selectedMarker.geometry.coordinates,
        zoom: 14.5,
        duration: 1000
      });
    }
  }, [selectedMarker]);

  const handleMarkerSelect = (marker: Marker) => {
    setSelectedMarker(marker);
    setIsSidebarOpen(true);
    
    // Delay scrolling to ensure sidebar is open and rendered
    setTimeout(() => {
      const cardElement = document.getElementById(`card-${marker.properties.imageId}`);
      if (cardElement && sidebarRef.current) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 300);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <button 
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black'  // Added this line to make the icon black
        }}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>
      <Sidebar 
        ref={sidebarRef}
        selectedMarker={selectedMarker} 
        onMarkerSelect={handleMarkerSelect} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

const Sidebar = React.forwardRef<HTMLDivElement, { 
  selectedMarker: Marker | null, 
  onMarkerSelect: (marker: Marker) => void,
  isOpen: boolean,
  onClose: () => void
}>(({ selectedMarker, onMarkerSelect, isOpen, onClose }, ref) => {
  return (
    <div ref={ref} style={{
      position: 'absolute',
      top: 0,
      left: isOpen ? 0 : '-100%',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      padding: '20px',
      overflowY: 'auto',
      color: 'black',
      transition: 'left 0.3s ease-in-out',
      zIndex: 1000,
      maxWidth: '260px', // Reduced from 300px to 280px
    }}>
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer'
        }}
      >
        &times;
      </button>
      <h2 style={{ color: 'black' }}>London Run Clubs</h2>
      <p style={{ color: 'black' }}>Discover running communities in London.</p>
      <input type="text" placeholder="Search run clubs" style={{ width: '100%', padding: '10px', marginBottom: '20px', color: 'black' }} />
      
      {(geojson.features as unknown as Marker[]).map((club) => (
        <div 
          key={club.properties.imageId} 
          id={`card-${club.properties.imageId}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: selectedMarker === club ? '#f0f0f0' : 'white',
            cursor: 'pointer'
          }}
          onClick={() => onMarkerSelect(club)}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundImage: `url(https://picsum.photos/id/${club.properties.imageId}/40/40)`,
              backgroundSize: 'cover',
              marginRight: '10px',
              flexShrink: 0
            }}
          />
          <div>
            <p style={{ color: 'black', fontSize: '12px', margin: '2px 0 0 0' }}>Name: {club.properties.name}</p>

            <p style={{ color: 'black', fontSize: '12px', margin: '5px 0 0 0' }}>Location: {club.properties.location}</p>

            <p style={{ color: 'black', fontSize: '12px', margin: '2px 0 0 0' }}>Meeting Time:</p>

            <p style={{ color: 'black', fontSize: '12px', margin: '2px 0 0 0' }}>
              {club.properties.timetable}
            </p>

            <p style={{ color: 'black', fontSize: '12px', margin: '2px 0 0 0' }}>
              {club.properties.message}
            </p>

            <a 
              href={club.properties.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#E1306C', 
                fontSize: '12px', 
                margin: '5px 0 0 0', 
                display: 'block',
                textDecoration: 'none'
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      ))}
    </div>
  );
});

export default MapComponent;