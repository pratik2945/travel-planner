const request = require('supertest');
const app = require('../server'); // assuming server exports the app

describe('Trip API', () => {
  it('should create a new trip', async () => {
    const res = await request(app)
      .post('/api/trips')
      .send({
        origin: 'Pune',
        destination: 'Nashik',
        avoidTolls: true,
        avoidHighways: false,
        date: '2025-09-16'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all trips', async () => {
    const res = await request(app).get('/api/trips');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});