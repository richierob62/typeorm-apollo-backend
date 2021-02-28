import { Query, Resolver, Arg } from 'type-graphql';

import { Comment } from '../../entity/Comment';

@Resolver()
export class GetAllCommentsByUserIdResolver {
  @Query(() => [Comment])
  async allCommentsByUserId(@Arg('userId') userId: string): Promise<Comment[]> {
    const comments = await Comment.find({
      where: { user_id: userId },
      relations: ['user', 'post', 'votes'],
    });

    return comments;
  }
}
