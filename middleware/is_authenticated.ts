import { AuthenticationError } from 'apollo-server-express';
// import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { getCurrentUser } from '../utils/auth/FirebaseAdmin';

export const isAuthenticated: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const user = await getCurrentUser(context);
  if (!user) throw new AuthenticationError('not authorized');

  return next();
};
