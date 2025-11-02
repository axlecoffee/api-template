import 'reflect-metadata';
import { beforeAll, afterAll } from 'vitest';
import { createServer } from 'http';
import app from '../src/app';

let server: any;

/**
 * Setup before all tests.
 */
beforeAll(() => {
  server = createServer(app);
  server.listen(3001);
});

/**
 * Cleanup after all tests.
 */
afterAll(() => {
  server.close();
});