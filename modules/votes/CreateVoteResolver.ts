import { User } from '../../entity/User';
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { VoteInput } from '../../types/type-graphql_types';
import { Vote } from '../../entity/Vote';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';

@Resolver()
export class CreateVoteResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Vote)
  async createVote(
    @Arg('data') data: VoteInput,
    @Ctx() { req }: Context
  ): Promise<Vote> {
    const { type, commentId, postId } = data;

    // const user = await User.findOne({ where: { id: req?.session?.userId } });
    const user = new User();
    console.log(req);

    if (!user) throw new Error('not authorized');

    const vote = Vote.create({
      type,
      user,
    });

    // comment or post?
    if (type === 'comment') {
      const comment = await Comment.findOne({ where: { id: commentId } });
      if (!comment) throw new Error('comment not found');
      vote.comment = comment;
    } else {
      const post = await Post.findOne({ where: { id: postId } });
      if (!post) throw new Error('post not found');
      vote.post = post;
    }

    await vote.save();

    return vote;
  }
}
