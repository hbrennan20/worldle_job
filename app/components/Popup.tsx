import React from 'react';
import { Card, CardContent, Typography, Button, Dialog } from '@mui/material';

interface PopupProps {
  info: {
    message: string;
    coordinates: [number, number];
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
