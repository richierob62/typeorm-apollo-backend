import { buildSchema } from 'type-graphql';

const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../../modules/**/*Resolver.ts'],
  });

export default createSchema;
