import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { VoteInput } from '../../types/type-graphql_types';
import { Vote } from '../../entity/Vote';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { getCurrentUser } from '../../utils/auth/FirebaseAdmin';
import { Post } from '../../entity/Post';
import { Comment } from '../../entity/Comment';

@Resolver()
export class CreateVoteResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Vote)
  async createVote(
    @Arg('data') data: VoteInput,
    @Ctx() ctx: Context
  ): Promise<Vote> {
    const user = await getCurrentUser(ctx);

    if (!user) throw new Error('not authorized');

    const { type, postId, commentId } = data;

    let newVote = new Vote();

    if (type === 'post' && postId) {
      const post = await Post.findOne({
        where: { id: postId },
        relations: ['user', 'comments', 'votes'],
      });

      if (!post) throw new Error('post not found');

      const existingVote = await Vote.findOne({
        where: { user: user, post: postId },
      });

      if (existingVote) throw new Error('duplicate vote');

      newVote.type = 'post';
      newVote.post = post;
      newVote.user = user;
      newVote = await newVote.save();
      const v = await Vote.findOne({
        where: { id: newVote.id },
        relations: ['user', 'post'],
      });

      return v!;
    }

    if (type === 'comment' && commentId) {
      const comment = await Comment.findOne({
        where: { id: commentId },
        relations: ['user'],
      });

      if (!comment) throw new Error('comment not found');

      const existingVote = await Vote.findOne({
        where: { user: user, comment: commentId },
      });

      if (existingVote) throw new Error('duplicate vote');

      newVote.type = 'comment';
      newVote.comment = comment;
      newVote.user = user;
      newVote = await newVote.save();

      const v = await Vote.findOne({
        where: { id: newVote.id },
        relations: ['comment', 'user'],
      });

      return v!;
    }

    throw new Error('type or id is missing');
  }
}
