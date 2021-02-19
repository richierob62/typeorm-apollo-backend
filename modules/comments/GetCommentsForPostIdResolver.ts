import { Resolver, Arg, Query } from 'type-graphql';
import { Comment } from '../../entity/Comment';

@Resolver()
export class GetCommentsForPostIdResolver {
  @Query(() => [Comment])
  async allCommentsForPostId(
    @Arg('postId') postId: number
  ): Promise<Comment[]> {
    const comments = await Comment.find({
      where: { post: postId },
      relations: ['user', 'post', 'votes'],
    });

    return comments;
  }
}
