import { Resolver, Arg, Query } from 'type-graphql';
import { Comment } from '../../entity/Comment';

@Resolver()
export class GetCommentByIdResolver {
  @Query(() => Comment)
  async commentById(@Arg('commentId') commentId: number): Promise<Comment> {
    const comment = await Comment.findOne({
      relations: ['user', 'post', 'votes'],
      where: { id: commentId },
    });

    if (!comment) throw new Error('not found');

    return comment;
  }
}
