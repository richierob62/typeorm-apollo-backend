import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import createSchema from './create_schema';
import createTypeormConnection from './create_typeorm_connection';
import express from 'express';

const startServer = async (port: string) => {
  const app = express();

  // request body creation
  // -----------------------------------------------------------------------
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // cors
  // -----------------------------------------------------------------------
  // const corsOptions = {
  //   credentials: true,
  //   origin: process.env.TESTING ? '*' : process.env.FRONT_END_DOMAIN,
  // };
  app.set('trust proxy', true);
  app.use(cors());

  // graphql server
  // -----------------------------------------------------------------------
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await createTypeormConnection();

  server.applyMiddleware({ app, cors: false });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`);
    console.log('========================================');
  });
};

export default startServer;
