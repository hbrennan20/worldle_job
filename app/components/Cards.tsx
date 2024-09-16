import React, { useState } from 'react';
import { Card, CardContent, Typography, Link, Dialog } from '@mui/material';
import geojson from '../markers.json';

interface RunClub {
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

const RunClubCards: React.FC = () => {
  const runClubs = geojson.features as RunClub[];
  const [selectedClub, setSelectedClub] = useState<RunClub | null>(null);

  const handleCardClick = (club: RunClub) => {
    setSelectedClub(club);
  };

  const handleClose = () => {
    setSelectedClub(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {runClubs.map((club, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(club)}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {club.properties.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {club.properties.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={!!selectedClub} onClose={handleClose}>
        {selectedClub && (
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {selectedClub.properties.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedClub.properties.message}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Timetable:</strong> {selectedClub.properties.timetable}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Instagram:</strong>{' '}
                <Link href={selectedClub.properties.instagram} target="_blank" rel="noopener noreferrer">
                  {selectedClub.properties.instagram}
                </Link>
              </Typography>
              <Typography variant="body2">
                <strong>Coordinates:</strong> {selectedClub.geometry.coordinates[0]}, {selectedClub.geometry.coordinates[1]}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Dialog>
    </>
  );
};

export default RunClubCards;
