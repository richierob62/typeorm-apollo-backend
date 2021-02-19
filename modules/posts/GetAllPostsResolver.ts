import { Query, Resolver } from 'type-graphql';

import { Post } from '../../entity/Post'

@Resolver()
export class GetAllPostsResolver {
  @Query(() => [Post])
  async allPosts(
  ): Promise<Post[]> {

    const posts = await Post.find({relations: ['user', 'comments', 'votes']});

    return posts

  }
}
