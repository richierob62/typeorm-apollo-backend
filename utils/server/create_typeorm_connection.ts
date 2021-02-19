import { createConnection, getConnectionOptions } from 'typeorm';

const createTypeormConnection = async () => {
  const connectOptions = await getConnectionOptions(process.env.NODE_ENV);

  return await createConnection({ ...connectOptions, name: 'default' });
};

export default createTypeormConnection;
