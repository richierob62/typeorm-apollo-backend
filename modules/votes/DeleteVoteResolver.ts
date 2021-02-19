import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { Vote } from '../../entity/Vote';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { isVoteOwner } from '../../middleware/is_vote_owner';

@Resolver()
export class DeleteVoteResolver {
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isVoteOwner)
  @Mutation(() => Boolean)
  async deleteVote(@Arg('id') id: number): Promise<boolean> {
    await Vote.delete({ id });

    return true;
  }
}
