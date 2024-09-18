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
    message: string;
    instagram: string;
    location: string;
    timetable: string;
  };
}

interface PopupInfo {
  message: string;
  coordinates: [number, number];
  instagram: string;
  location: string;
  timetable: string;
}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGIyMDAwIiwiYSI6ImNtMGU3cmI5YjBpMnoya3I0ZHZwYXM5MG4ifQ.AnJMH_l3Hg_W2loQDdM-MQ';

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.1575, 51.5074],
      zoom: 12,
      maxZoom: 13,
      minZoom: 10, // Added minZoom for better control
      pitchWithRotate: false,
      dragRotate: false,
    });

    map.current = newMap;

    // Ensure max zoom is respected
    newMap.on('zoom', () => {
      if (newMap.getZoom() > 13) {
        newMap.setZoom(13);
      }
    });

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

        el.addEventListener('click', () => {
          setPopupInfo({
            message: marker.properties.message,
            coordinates: marker.geometry.coordinates,
            instagram: marker.properties.instagram,
            location: marker.properties.location,
            timetable: marker.properties.timetable
          });
        });

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(newMap);
      });
    });

    return () => {
      newMap.remove();
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {popupInfo && (
        <Popup
          info={popupInfo}
          onClose={() => {
            console.log('Closing popup');
            setPopupInfo(null);
          }}
        />
      )}
    </div>
  );
};

export default MapComponent;