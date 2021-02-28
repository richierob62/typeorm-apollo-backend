import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { CommentInput } from '../../types/type-graphql_types';
import { Comment } from '../../entity/Comment';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { Post } from '../../entity/Post';
import { getCurrentUser } from '../../utils/auth/FirebaseAdmin';

@Resolver()
export class CreateCommentResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Comment)
  async createComment(
    @Arg('data') data: CommentInput,
    @Ctx() ctx: Context
  ): Promise<Comment> {
    const user = await getCurrentUser(ctx);

    if (!user) throw new Error('not authorized');

    const post = await Post.findOne({
      where: { id: data.postId },
      relations: ['user', 'comments', 'votes'],
    });

    if (!post) throw new Error('post not found');

    const comment = Comment.create(data);
    comment.user = user;
    comment.post = post;

    await comment.save();

    return comment;
  }
}
