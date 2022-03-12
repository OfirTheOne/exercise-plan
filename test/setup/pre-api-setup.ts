import path from 'path';
import * as dotenv from 'dotenv';

export {};
require('ts-node/register');
import request from 'supertest';

dotenv.config({ path: path.resolve(__dirname + '../../../config/private.cfg') });
const LISTENING_PORT = process.env.LISTENING_PORT;
const API_GLOBAL_PREFIX = process.env.WEB_API_PREFIX;
const APP_URL = `http://localhost:${LISTENING_PORT}/${API_GLOBAL_PREFIX}`;

async function verifyRunningApp(): Promise<void> {
  try {
    console.log('Start verify running app');
    console.log(`health check to application: ${APP_URL}health`);
    await request(APP_URL).get(`health`).expect(200);
  } catch {
    const err = new Error('The service is down');
    err.stack = undefined;
    throw err;
  }
}

function preventUnhandledRejection(): void{
  if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', (reason) => {
      throw reason;
    });
    // Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = 'true';
  }
}

/*
 * the operation of deleting a container isn't done by the end of the api delete request,
 * it's only mark the container as 'to-be-deleted'.
 * the creation request will be successful after the container was deleted, so we need to repeat the create request.
 */
const setup = async (): Promise<void> => {

  // whatever you need to setup globally
  await verifyRunningApp();

  preventUnhandledRejection();

  // await initDBWithTestData();

};

export default setup;
