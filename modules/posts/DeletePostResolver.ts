import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { Post } from '../../entity/Post';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { isPostOwner } from '../../middleware/is_post_owner';

@Resolver()
export class DeletePostResolver {
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isPostOwner)
  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    await Post.delete({ id });

    return true;
  }
}
