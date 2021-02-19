import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'boilerplate_test',
    synchronize: drop,
    dropSchema: drop,
    entities: ['entity/**/*.ts'],
    logging: false,
    migrations: ['migration/**/*.ts'],
    subscribers: ['subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'entity',
      migrationsDir: 'migration',
      subscribersDir: 'subscriber',
    },
  });
};
