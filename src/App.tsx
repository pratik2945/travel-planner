import React, { useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DestinationForm from './components/DestinationForm';
import RouteMap from './components/RouteMap';
import { Destination } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const handleAddDestination = (destination: Destination) => {
    setDestinations([...destinations, destination]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          py: 4,
          minHeight: '100vh'
        }}>
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '0 0 300px' },
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <DestinationForm onAddDestination={handleAddDestination} />
          </Box>
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '1 1 auto' },
            height: { xs: '400px', md: 'calc(100vh - 64px)' },
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <RouteMap destinations={destinations} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 