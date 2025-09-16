const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'trips.json');

app.use(bodyParser.json());

// Helper functions
const readTrips = () => {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  return JSON.parse(fs.readFileSync(filePath));
};

const writeTrips = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all trips
app.get('/api/trips', (req, res) => {
  const trips = readTrips();
  res.json(trips);
});

// GET single trip
app.get('/api/trips/:id', (req, res) => {
  const trips = readTrips();
  const trip = trips.find(t => t.id === parseInt(req.params.id));
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
});

// POST new trip
app.post('/api/trips', (req, res) => {
  const trips = readTrips();
  const newTrip = { id: Date.now(), ...req.body };
  trips.push(newTrip);
  writeTrips(trips);
  res.status(201).json(newTrip);
});

// PUT update trip
app.put('/api/trips/:id', (req, res) => {
  const trips = readTrips();
  const tripId = parseInt(req.params.id);
  const index = trips.findIndex(t => t.id === tripId);

  if (index === -1) return res.status(404).json({ error: 'Trip not found' });

  trips[index] = { ...trips[index], ...req.body };
  writeTrips(trips);
  res.json(trips[index]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});