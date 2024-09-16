'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import geojson from '../markers.json';

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
  };
}

const LondonRunClub: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGIyMDAwIiwiYSI6ImNtMGU3cmI5YjBpMnoya3I0ZHZwYXM5MG4ifQ.AnJMH_l3Hg_W2loQDdM-MQ';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.1575, 51.5074],
      zoom: 11
    });

    mapRef.current = map;

    map.on('load', () => {
      (geojson.features as unknown as Marker[]).forEach((marker) => {
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        el.addEventListener('click', () => {
          window.alert(marker.properties.message);
        });

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default LondonRunClub;
