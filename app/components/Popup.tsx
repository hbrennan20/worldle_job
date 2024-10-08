import React from 'react';
import { Card, CardContent, Typography, Button, Dialog, Link } from '@mui/material';

interface PopupProps {
  info: {
    message: string;
    coordinates: [number, number];
    instagram: string;
    location: string;
    timetable: string;
  };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ info, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="popup-dialog"
      maxWidth="sm"
      fullWidth
    >
      <Card>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Message:</strong><br />
            {info.message}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong><br />
            {info.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Timetable:</strong><br />
            {info.timetable}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Instagram:</strong><br />
            <Link href={info.instagram} target="_blank" rel="noopener noreferrer">
              {info.instagram}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Co-ordinates:</strong><br />
            ({info.coordinates[0]}, {info.coordinates[1]})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            style={{ marginTop: '1rem' }}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default Popup;
