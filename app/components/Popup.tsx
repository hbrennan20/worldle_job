import React from 'react';
import { Card, CardContent, Typography, Button, Dialog } from '@mui/material';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
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
            {message}
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
