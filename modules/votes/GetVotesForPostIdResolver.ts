import { Resolver, Arg, Query } from 'type-graphql';
import { Vote } from '../../entity/Vote';

@Resolver()
export class GetVotesForPostIdResolver {
  @Query(() => [Vote])
  async allVotesForPostId(@Arg('postId') postId: number): Promise<Vote[]> {
    const votes = await Vote.find({
      where: { post: postId },
      relations: ['user', 'post', 'comment'],
    });

    return votes;
  }
}
