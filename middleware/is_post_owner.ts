import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
// import { Post } from '../entity/Post'

export const isPostOwner: MiddlewareFn<Context> = async (
  { args, context },
  next
) => {
  console.log(args);
  console.log(context);

  // const id = args.data ? args.data.id : args.id

  // const userId = context.req.session?.userId

  // const post = await Post.findOne(id, {relations: ['user']});

  // if (!post || post.user.id !== userId)
  //   throw new Error('not authorized');

  return next();
};
