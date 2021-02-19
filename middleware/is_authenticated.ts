// import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';

export const isAuthenticated: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  console.log(context);

  // change to check firebase
  // if (!context.req.session?.userId)
  //   throw new AuthenticationError('not authorized');

  return next();
};
