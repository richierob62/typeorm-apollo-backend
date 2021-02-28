import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { Vote } from '../entity/Vote';
import { getCurrentUser } from '../utils/auth/FirebaseAdmin';

export const isVoteOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  const id = args.data ? args.data.id : args.id;

  const user = await getCurrentUser(context);

  const vote = await Vote.findOne(id, { relations: ['user'] });

  if (!user || !vote || vote.user.id !== user.id)
    throw new Error('not authorized');

  return next();
};
