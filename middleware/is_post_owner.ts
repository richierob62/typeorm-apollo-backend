import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { Post } from '../entity/Post';
import { getCurrentUser } from '../utils/auth/FirebaseAdmin';

export const isPostOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  const id = args.data ? args.data.id : args.id;

  const user = await getCurrentUser(context);

  const post = await Post.findOne(id, { relations: ['user'] });

  if (!user || !post || post.user.id !== user.id)
    throw new Error('not authorized');

  return next();
};
