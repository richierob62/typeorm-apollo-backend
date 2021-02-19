import { Query, Resolver } from 'type-graphql';

import { Vote } from '../../entity/Vote';

@Resolver()
export class GetAllVotesResolver {
  @Query(() => [Vote])
  async allVotes(): Promise<Vote[]> {
    const votes = await Vote.find({
      relations: ['user', 'post', 'comment'],
    });

    return votes;
  }
}
