import { Resolver, Arg, Query } from 'type-graphql';
import { Vote } from '../../entity/Vote';

@Resolver()
export class GetVotesForUserIdResolver {
  @Query(() => [Vote])
  async allVotesForUserId(@Arg('userId') userId: number): Promise<Vote[]> {
    const votes = await Vote.find({
      where: { user: userId },
      relations: ['user', 'post', 'comment'],
    });

    return votes;
  }
}
