import { Resolver, Arg, Query } from 'type-graphql';
import { Post } from '../../entity/Post';

@Resolver()
export class GetPostsForUserIdResolver {
  @Query(() => [Post])
  async allPostsForUserId(@Arg('userId') userId: string): Promise<Post[]> {
    const posts = await Post.find({
      relations: ['user', 'comments', 'comments.votes', 'votes'],
      where: { userId },
    });

    return posts;
  }
}
