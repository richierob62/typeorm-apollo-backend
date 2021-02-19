require('dotenv').config({ path: '../.env' });

import 'reflect-metadata';

import startServer from './utils/server/start_server';

startServer(process.env.PORT || '3001');
