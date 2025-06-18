import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Destination } from '../types';

interface DestinationFormProps {
  onAddDestination: (destination: Destination) => void;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ onAddDestination }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDestination: Destination = {
      id: Date.now().toString(),
      name,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };

    onAddDestination(newDestination);
    
    // Reset form
    setName('');
    setAddress('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Add Destination
      </Typography>
      
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        margin="normal"
        required
        type="number"
        inputProps={{ step: "any" }}
      />
      
      <TextField
        fullWidth
        label="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        margin="normal"
        required
        type="number"
        inputProps={{ step: "any" }}
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Add Destination
      </Button>
    </Box>
  );
};

export default DestinationForm; 