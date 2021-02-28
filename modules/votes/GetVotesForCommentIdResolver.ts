import { Resolver, Arg, Query } from 'type-graphql';
import { Vote } from '../../entity/Vote';

@Resolver()
export class GetVotesForCommentIdResolver {
  @Query(() => [Vote])
  async allVotesForCommentId(
    @Arg('commentId') commentId: number
  ): Promise<Vote[]> {
    const votes = await Vote.find({
      where: { comment: commentId },
      relations: ['user', 'comment'],
    });

    return votes;
  }
}
