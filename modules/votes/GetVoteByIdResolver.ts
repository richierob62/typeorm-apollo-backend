import { Resolver, Arg, Query } from 'type-graphql';
import { Vote } from '../../entity/Vote';

@Resolver()
export class GetVoteByIdResolver {
  @Query(() => Vote)
  async voteById(@Arg('voteId') voteId: number): Promise<Vote> {
    const vote = await Vote.findOne({
      relations: ['user', 'post', 'comment'],
      where: { id: voteId },
    });

    if (!vote) throw new Error('not found');

    return vote;
  }
}
