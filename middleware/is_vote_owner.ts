import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
// import { Vote } from '../entity/Vote';

export const isVoteOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  console.log({ args, context });

  // const id = args.data ? args.data.id : args.id;

  // const userId = context.req.session?.userId;

  // const vote = await Vote.findOne(id, { relations: ['user'] });

  // if (!vote || vote.user.id !== userId) throw new Error('not authorized');

  return next();
};
