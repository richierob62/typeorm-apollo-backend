import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { Comment } from '../../entity/Comment';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { isCommentOwner } from '../../middleware/is_comment_owner';

@Resolver()
export class DeleteCommentResolver {
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isCommentOwner)
  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') id: number): Promise<boolean> {
    await Comment.delete({ id });

    return true;
  }
}
