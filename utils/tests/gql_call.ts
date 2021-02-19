import { GraphQLSchema, graphql } from 'graphql';

import { Maybe } from 'graphql/jsutils/Maybe';
import createSchema from '../server/create_schema';
import redis from '../redis/redis';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

const gqlCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: () => {},
      },
      redis,
    },
  });
};

export default gqlCall;
