// import { Comment } from '../entity/Comment';
import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';

export const isCommentOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  // const id = args.data ? args.data.id : args.id;

  // get user with firebase
  console.log(args);
  console.log(context);

  // const userId = context.req.session?.userId;

  // const comment = await Comment.findOne(id, { relations: ['user'] });

  // if (!comment || comment.user.id !== userId) throw new Error('not authorized');

  return next();
};
