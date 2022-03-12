import  request from 'supertest';

const LISTENING_PORT = process.env.LISTENING_PORT;
const API_GLOBAL_PREFIX = process.env.WEB_API_PREFIX;
const APP_URL = `http://localhost:${LISTENING_PORT}/${API_GLOBAL_PREFIX}`;

describe('Base maps API test', () => {
  describe('GET all basemaps request',  () => {
    xit('It should return 200', () => {
      request(APP_URL)
        .get('basemaps')
        .set({authorization: 'a_valid_value_goes_here'})
        .expect(200);
    });

    xit('It should return 403 when there is no auth token provided', () => {
      request(APP_URL)
        .get('basemaps')
        .expect(403);
    });
  });});

