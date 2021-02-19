import { Resolver, Arg, Query } from 'type-graphql';
import { Post } from '../../entity/Post'

@Resolver()
export class GetPostByIdResolver {
  @Query(() => Post)
  async postById(
    @Arg('postId') postId: number
  ): Promise<Post> {

    const post = await Post.findOne({relations: ['user', 'comments', 'votes'], where: {id: postId}});

    if(!post) throw new Error('not found')

    return post

  }
}
