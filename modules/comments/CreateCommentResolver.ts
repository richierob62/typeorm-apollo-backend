import { User } from '../../entity/User';
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { CommentInput } from '../../types/type-graphql_types';
import { Comment } from '../../entity/Comment';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { Post } from '../../entity/Post';

@Resolver()
export class CreateCommentResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Comment)
  async createComment(
    @Arg('data') data: CommentInput,
    @Ctx() { req }: Context
  ): Promise<Comment> {
    // const user = await User.findOne({ where: { id: req?.session?.userId } });

    console.log(req);

    // get user with firebase
    const user = new User();

    if (!user) throw new Error('not authorized');

    const post = await Post.findOne({ where: { id: data.postId } });

    if (!post) throw new Error('post not found');

    const comment = Comment.create(data);
    comment.user = user;
    comment.post = post;

    await comment.save();

    return comment;
  }
}
