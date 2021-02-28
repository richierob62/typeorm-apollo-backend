import { Comment } from '../entity/Comment';
import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { getCurrentUser } from '../utils/auth/FirebaseAdmin';

export const isCommentOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  const id = args.data ? args.data.id : args.id;

  const user = await getCurrentUser(context);

  const comment = await Comment.findOne(id, { relations: ['user'] });

  if (!user || !comment || comment.user.id !== user.id)
    throw new Error('not authorized');

  return next();
};
